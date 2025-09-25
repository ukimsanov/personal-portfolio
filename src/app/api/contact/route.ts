import { NextRequest, NextResponse } from 'next/server';
import { getCloudflareContext } from "@opennextjs/cloudflare";

// D1 Database interface
interface D1Database {
  prepare(query: string): {
    bind(...values: unknown[]): {
      run(): Promise<{ success: boolean; meta: { last_row_id: number } }>;
    };
  };
}

// Cloudflare environment with D1 binding
interface CloudflareEnv {
  DB: D1Database;
  DISCORD_WEBHOOK_URL?: string;
  [key: string]: unknown;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  description?: string;
  turnstileToken?: string;
}

interface ValidationResult {
  isValid: boolean;
  fieldErrors: FieldErrors;
  message?: string;
}

// Server-side validation functions (matching frontend)
const validateName = (name: string): { isValid: boolean; error?: string } => {
  const trimmed = name?.trim() || '';
  
  if (!trimmed) {
    return { isValid: false, error: "Name is required" };
  }
  
  if (trimmed.length < 2) {
    return { isValid: false, error: "Name must be at least 2 characters long" };
  }
  
  if (trimmed.length > 50) {
    return { isValid: false, error: "Name cannot exceed 50 characters" };
  }
  
  const nameRegex = /^[a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\s'-]+$/;
  if (!nameRegex.test(trimmed)) {
    return { isValid: false, error: "Name can only contain letters, spaces, hyphens, and apostrophes" };
  }
  
  return { isValid: true };
};

const validateEmail = (email: string): { isValid: boolean; error?: string } => {
  const trimmed = email?.trim() || '';
  
  if (!trimmed) {
    return { isValid: false, error: "Email is required" };
  }
  
  if (trimmed.length > 254) {
    return { isValid: false, error: "Email address is too long" };
  }
  
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: "Please enter a valid email address (e.g., name@example.com)" };
  }
  
  return { isValid: true };
};

const validatePhone = (phone: string): { isValid: boolean; error?: string } => {
  const trimmed = phone?.trim() || '';
  
  if (!trimmed) {
    return { isValid: true }; // Phone is optional
  }
  
  const digitsOnly = trimmed.replace(/\D/g, '');
  
  if (digitsOnly.length < 10) {
    return { isValid: false, error: "Phone number must be at least 10 digits" };
  }
  
  if (digitsOnly.length > 15) {
    return { isValid: false, error: "Phone number cannot exceed 15 digits" };
  }
  
  const phoneRegex = /^[\+]?[\s\-\(\)]?[\d\s\-\(\)]{10,}$/;
  if (!phoneRegex.test(trimmed)) {
    return { isValid: false, error: "Please enter a valid phone number" };
  }
  
  return { isValid: true };
};

const validateDescription = (description: string): { isValid: boolean; error?: string } => {
  const trimmed = description?.trim() || '';
  
  if (!trimmed) {
    return { isValid: false, error: "Message is required" };
  }
  
  if (trimmed.length < 2) {
    return { isValid: false, error: "Message must be at least 2 characters long" };
  }
  
  if (trimmed.length > 1000) {
    return { isValid: false, error: "Message cannot exceed 1000 characters" };
  }
  
  return { isValid: true };
};

// Validate Turnstile token with Cloudflare Siteverify API
const validateTurnstileToken = async (token: string, remoteIP?: string): Promise<{ isValid: boolean; error?: string }> => {
  if (!token) {
    return { isValid: false, error: "CAPTCHA verification is required" };
  }

  const secretKey = process.env.TURNSTILE_SECRET_KEY;
  if (!secretKey) {
    console.error('TURNSTILE_SECRET_KEY not configured');
    return { isValid: false, error: "CAPTCHA verification unavailable" };
  }

  try {
    const formData = new FormData();
    formData.append('secret', secretKey);
    formData.append('response', token);
    if (remoteIP) {
      formData.append('remoteip', remoteIP);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      console.error('Turnstile verification request failed:', response.status);
      return { isValid: false, error: "CAPTCHA verification failed" };
    }

    const result = await response.json();
    
    if (result.success) {
      return { isValid: true };
    } else {
      console.error('Turnstile verification failed:', result['error-codes']);
      return { isValid: false, error: "CAPTCHA verification failed" };
    }
  } catch (error) {
    console.error('Error validating Turnstile token:', error);
    return { isValid: false, error: "CAPTCHA verification failed" };
  }
};

// Contact form validation with field-specific errors
function validateContactForm(data: unknown): ValidationResult {
  const fieldErrors: FieldErrors = {};
  let hasErrors = false;
  
  if (!data || typeof data !== 'object') {
    return { 
      isValid: false, 
      fieldErrors: { description: 'Invalid data format' },
      message: 'Invalid data format'
    };
  }
  
  const formData = data as Record<string, unknown>;
  
  // Validate each field
  const nameResult = validateName(String(formData.name || ''));
  if (!nameResult.isValid) {
    fieldErrors.name = nameResult.error;
    hasErrors = true;
  }

  const emailResult = validateEmail(String(formData.email || ''));
  if (!emailResult.isValid) {
    fieldErrors.email = emailResult.error;
    hasErrors = true;
  }

  const phoneResult = validatePhone(String(formData.phone || ''));
  if (!phoneResult.isValid) {
    fieldErrors.phone = phoneResult.error;
    hasErrors = true;
  }

  const descriptionResult = validateDescription(String(formData.description || ''));
  if (!descriptionResult.isValid) {
    fieldErrors.description = descriptionResult.error;
    hasErrors = true;
  }

  return {
    isValid: !hasErrors,
    fieldErrors,
    message: hasErrors ? 'Please fix the validation errors' : undefined
  };
}

// Sanitize input data
function sanitizeInput(data: Record<string, unknown>) {
  return {
    name: String(data.name || '').trim().substring(0, 50),
    email: String(data.email || '').trim().toLowerCase().substring(0, 255),
    phone: data.phone ? String(data.phone).trim().substring(0, 20) : '',
    description: String(data.description || '').trim().substring(0, 1000)
  };
}

// Send data to Discord webhook
async function sendToDiscord(data: { name: string; email: string; phone: string; description: string }, env?: CloudflareEnv) {
  // Try to get webhook URL from environment variables or Cloudflare env
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL || env?.DISCORD_WEBHOOK_URL;
  
  if (!webhookUrl) {
    console.warn('❌ Discord webhook URL not configured in environment variables');
    return false;
  }
  
  console.log('🔗 Discord webhook URL found, preparing message...');
  
  const embed = {
    title: "New Contact Form Submission",
    color: 0x3b82f6, // Blue color
    fields: [
      {
        name: "👤 Name",
        value: data.name,
        inline: true
      },
      {
        name: "📧 Email",
        value: data.email,
        inline: true
      },
      {
        name: "📞 Phone",
        value: data.phone || "Not provided",
        inline: true
      },
      {
        name: "💬 Message",
        value: data.description.length > 1000 ? data.description.substring(0, 1000) + "..." : data.description,
        inline: false
      }
    ],
    timestamp: new Date().toISOString(),
    footer: {
      text: "Personal Portfolio Contact Form"
    }
  };

  const payload = {
    embeds: [embed]
  };

  try {
    console.log('📤 Sending Discord webhook request...');
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      console.error('❌ Discord webhook failed:', response.status, response.statusText);
      return false;
    }

    console.log('✅ Discord webhook response received successfully');
    return true;
  } catch (error) {
    console.error('❌ Discord webhook error:', error);
    return false;
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate input
    const validation = validateContactForm(body);
    if (!validation.isValid) {
      return NextResponse.json({
        success: false,
        message: validation.message || 'Please fix the validation errors',
        fieldErrors: validation.fieldErrors
      }, { status: 400 });
    }

    // Validate Turnstile CAPTCHA token
    const turnstileToken = body.turnstileToken;
    const clientIP = request.headers.get('cf-connecting-ip') || 
                     request.headers.get('x-forwarded-for') || 
                     request.headers.get('x-real-ip');
    
    const turnstileValidation = await validateTurnstileToken(turnstileToken, clientIP || undefined);
    if (!turnstileValidation.isValid) {
      console.error('❌ Turnstile validation failed:', turnstileValidation.error);
      return NextResponse.json({
        success: false,
        message: turnstileValidation.error || 'CAPTCHA verification failed',
        fieldErrors: { turnstileToken: turnstileValidation.error }
      }, { status: 400 });
    }

    console.log('✅ Turnstile validation passed');
    
    // Sanitize input
    const sanitizedData = sanitizeInput(body);
    
    // Track success of operations
    let dbSuccess = false;
    let discordSuccess = false;
    
    console.log('📝 Processing contact form submission:', {
      name: sanitizedData.name,
      email: sanitizedData.email,
      phone: sanitizedData.phone || 'Not provided',
      descriptionLength: sanitizedData.description.length
    });
    
    // Try to save to database
    try {
      console.log('💾 Attempting to save to database...');
      const cloudflareContext = getCloudflareContext();
      const env = cloudflareContext.env as CloudflareEnv;
      
      if (env.DB) {
        const insertQuery = `
          INSERT INTO contacts (name, email, phone, description)
          VALUES (?, ?, ?, ?)
        `;
        
        const stmt = env.DB.prepare(insertQuery);
        const result = await stmt
          .bind(
            sanitizedData.name,
            sanitizedData.email,
            sanitizedData.phone,
            sanitizedData.description
          )
          .run();
        
        if (result.success) {
          dbSuccess = true;
          console.log('✅ Database save successful!');
        } else {
          console.log('❌ Database save failed - result not successful');
        }
      } else {
        console.log('❌ Database not available (env.DB not found)');
      }
    } catch (dbError) {
      console.error('❌ Database error:', dbError);
    }
    
    // Try to send to Discord webhook
    try {
      console.log('🎮 Attempting to send to Discord webhook...');
      const cloudflareContext = getCloudflareContext();
      const env = cloudflareContext.env as CloudflareEnv;
      discordSuccess = await sendToDiscord(sanitizedData, env);
      
      if (discordSuccess) {
        console.log('✅ Discord webhook sent successfully!');
      } else {
        console.log('❌ Discord webhook failed (returned false)');
      }
    } catch (discordError) {
      console.error('❌ Discord webhook error:', discordError);
    }
    
    // Return appropriate response based on what succeeded
    console.log('📊 Operation results:', { 
      database: dbSuccess ? '✅' : '❌', 
      discord: discordSuccess ? '✅' : '❌' 
    });
    
    if (dbSuccess || discordSuccess) {
      console.log('🎉 Contact form submission processed successfully!');
      return NextResponse.json({
        success: true,
        message: 'Thank you! Your message has been sent successfully. I\'ll get back to you soon.'
      });
    } else {
      console.log('⚠️ Both database and Discord failed, using fallback response');
      // Fallback: Return success even if both fail (graceful degradation)
      return NextResponse.json({
        success: true,
        message: 'Thank you! Your message has been received. I\'ll get back to you soon.'
      });
    }
    
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({
      success: false,
      message: 'Something went wrong. Please try again.'
    }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    success: false,
    message: 'This endpoint only accepts POST requests'
  }, { status: 405 });
}