"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  description: string;
}

interface FormStatus {
  type: 'idle' | 'loading' | 'success' | 'error';
  message: string;
}

interface FieldErrors {
  name?: string;
  email?: string;
  phone?: string;
  description?: string;
}

interface ValidationResult {
  isValid: boolean;
  error?: string;
}

// InputField component moved to module level to prevent recreation on every render
interface InputFieldProps {
  label: string;
  name: keyof ContactFormData;
  type?: string;
  placeholder: string;
  required?: boolean;
  rows?: number;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onBlur: () => void;
  hasError: boolean;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  label, 
  name, 
  type = "text", 
  placeholder, 
  required = false, 
  rows,
  value,
  onChange,
  onBlur,
  hasError,
  errorMessage
}) => {
  const isTextarea = type === "textarea";
  
  const inputClasses = `w-full px-4 py-3 rounded-lg border transition-all focus:outline-none focus:ring-2 focus:ring-offset-0 ${
    hasError 
      ? 'border-red-500 focus:ring-red-500 bg-red-50 dark:bg-red-900/10' 
      : 'border-border bg-background focus:ring-blue-500 focus:border-transparent'
  } ${isTextarea ? 'resize-vertical' : ''}`;

  return (
    <div className="space-y-2">
      <label 
        htmlFor={name} 
        className="text-sm font-medium text-foreground"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      
      {isTextarea ? (
        <textarea
          id={name}
          name={name}
          rows={rows || 5}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={inputClasses}
          placeholder={placeholder}
          required={required}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />
      ) : (
        <input
          type={type}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          className={inputClasses}
          placeholder={placeholder}
          required={required}
          aria-invalid={hasError ? 'true' : 'false'}
          aria-describedby={hasError ? `${name}-error` : undefined}
        />
      )}
      
      {hasError && errorMessage && (
        <motion.p
          id={`${name}-error`}
          role="alert"
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
        >
          <AlertCircle className="w-3 h-3 flex-shrink-0" />
          {errorMessage}
        </motion.p>
      )}
    </div>
  );
};

// Validation functions following best practices
const validateName = (name: string): ValidationResult => {
  const trimmed = name.trim();
  
  if (!trimmed) {
    return { isValid: false, error: "Name is required" };
  }
  
  if (trimmed.length < 2) {
    return { isValid: false, error: "Name must be at least 2 characters long" };
  }
  
  if (trimmed.length > 50) {
    return { isValid: false, error: "Name cannot exceed 50 characters" };
  }
  
  // Allow letters, spaces, hyphens, apostrophes for international names
  const nameRegex = /^[a-zA-ZÀ-ÿ\u0100-\u017F\u0180-\u024F\u1E00-\u1EFF\s'-]+$/;
  if (!nameRegex.test(trimmed)) {
    return { isValid: false, error: "Name can only contain letters, spaces, hyphens, and apostrophes" };
  }
  
  return { isValid: true };
};

const validateEmail = (email: string): ValidationResult => {
  const trimmed = email.trim();
  
  if (!trimmed) {
    return { isValid: false, error: "Email is required" };
  }
  
  if (trimmed.length > 254) {
    return { isValid: false, error: "Email address is too long" };
  }
  
  // RFC 5322 compliant email regex - balanced approach
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: "Please enter a valid email address (e.g., name@example.com)" };
  }
  
  return { isValid: true };
};

const validatePhone = (phone: string): ValidationResult => {
  const trimmed = phone.trim();
  
  // Phone is optional, so empty is valid
  if (!trimmed) {
    return { isValid: true };
  }
  
  // Remove all non-digit characters for validation
  const digitsOnly = trimmed.replace(/\D/g, '');
  
  if (digitsOnly.length < 10) {
    return { isValid: false, error: "Phone number must be at least 10 digits" };
  }
  
  if (digitsOnly.length > 15) {
    return { isValid: false, error: "Phone number cannot exceed 15 digits" };
  }
  
  // Allow common phone formats: +1 (555) 123-4567, 555-123-4567, 5551234567, etc.
  const phoneRegex = /^[\+]?[\s\-\(\)]?[\d\s\-\(\)]{10,}$/;
  if (!phoneRegex.test(trimmed)) {
    return { isValid: false, error: "Please enter a valid phone number" };
  }
  
  return { isValid: true };
};

const validateDescription = (description: string): ValidationResult => {
  const trimmed = description.trim();
  
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

const ContactForm = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    description: ''
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  // Validate a single field
  const validateField = (fieldName: keyof ContactFormData, value: string): string | undefined => {
    switch (fieldName) {
      case 'name':
        const nameResult = validateName(value);
        return nameResult.isValid ? undefined : nameResult.error;
      case 'email':
        const emailResult = validateEmail(value);
        return emailResult.isValid ? undefined : emailResult.error;
      case 'phone':
        const phoneResult = validatePhone(value);
        return phoneResult.isValid ? undefined : phoneResult.error;
      case 'description':
        const descResult = validateDescription(value);
        return descResult.isValid ? undefined : descResult.error;
      default:
        return undefined;
    }
  };

  // Handle field blur - validate and show errors
  const handleFieldBlur = (fieldName: keyof ContactFormData) => {
    setTouchedFields(prev => new Set(prev).add(fieldName));
    
    const error = validateField(fieldName, formData[fieldName]);
    setFieldErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormData;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear error immediately if field becomes valid (real-time feedback)
    if (touchedFields.has(fieldName)) {
      const error = validateField(fieldName, value);
      setFieldErrors(prev => ({
        ...prev,
        [fieldName]: error
      }));
    }

    // Clear general status when user starts typing
    if (status.type === 'error') {
      setStatus({ type: 'idle', message: '' });
    }
  };

  // Validate all fields before submission
  const validateAllFields = (): boolean => {
    const errors: FieldErrors = {};
    let hasErrors = false;

    (Object.keys(formData) as Array<keyof ContactFormData>).forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) {
        errors[field] = error;
        hasErrors = true;
      }
    });

    setFieldErrors(errors);
    setTouchedFields(new Set(Object.keys(formData)));
    return !hasErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    if (!validateAllFields()) {
      setStatus({
        type: 'error',
        message: 'Please fix the errors above before submitting.'
      });
      
      // Focus first invalid field
      const firstErrorField = Object.keys(fieldErrors)[0];
      if (firstErrorField) {
        const element = document.getElementById(firstErrorField);
        element?.focus();
      }
      return;
    }

    setStatus({ type: 'loading', message: 'Sending message...' });

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        
        // Handle field-specific errors from server
        if (errorData.fieldErrors) {
          setFieldErrors(errorData.fieldErrors);
          setStatus({
            type: 'error',
            message: 'Please fix the errors above.'
          });
          return;
        }
        
        throw new Error(errorData.message || 'Failed to send message');
      }

      setStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent successfully.'
      });

      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        description: ''
      });
      setFieldErrors({});
      setTouchedFields(new Set());

    } catch (error) {
      setStatus({
        type: 'error',
        message: error instanceof Error ? error.message : 'Sorry, there was an error sending your message. Please try again.'
      });
    }
  };

  const getStatusIcon = () => {
    switch (status.type) {
      case 'loading':
        return <Loader2 className="w-4 h-4 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'error':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      default:
        return null;
    }
  };

  return (
    <motion.section
      id="contact-form"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="py-14 w-full"
    >
      <h2 className="text-2xl font-bold mb-12">Get In Touch</h2>
      
      <Card className="w-full max-w-2xl">
        <div className="p-8">
          <p className="text-muted-foreground mb-8 leading-relaxed">
            I&apos;m always interested in new opportunities and exciting projects. 
            Whether you have a question, want to collaborate, or just want to say hello, 
            feel free to reach out!
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField
                label="Name"
                name="name"
                placeholder="Your name"
                required
                value={formData.name}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur('name')}
                hasError={touchedFields.has('name') && !!fieldErrors.name}
                errorMessage={fieldErrors.name}
              />
              
              <InputField
                label="Email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                required
                value={formData.email}
                onChange={handleInputChange}
                onBlur={() => handleFieldBlur('email')}
                hasError={touchedFields.has('email') && !!fieldErrors.email}
                errorMessage={fieldErrors.email}
              />
            </div>

            {/* Phone */}
            <InputField
              label="Phone"
              name="phone"
              type="tel"
              placeholder="+1 (555) 123-4567"
              value={formData.phone}
              onChange={handleInputChange}
              onBlur={() => handleFieldBlur('phone')}
              hasError={touchedFields.has('phone') && !!fieldErrors.phone}
              errorMessage={fieldErrors.phone}
            />

            {/* Message */}
            <InputField
              label="Message"
              name="description"
              type="textarea"
              placeholder="Tell me about your project or just say hello..."
              rows={5}
              required
              value={formData.description}
              onChange={handleInputChange}
              onBlur={() => handleFieldBlur('description')}
              hasError={touchedFields.has('description') && !!fieldErrors.description}
              errorMessage={fieldErrors.description}
            />

            {/* Status Message */}
            {status.message && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex items-center gap-2 p-4 rounded-lg text-sm ${
                  status.type === 'success' 
                    ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400' 
                    : status.type === 'error'
                    ? 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                    : 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                }`}
              >
                {getStatusIcon()}
                {status.message}
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={status.type === 'loading'}
              className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              {status.type === 'loading' ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Send Message
                </>
              )}
            </button>
          </form>
        </div>
      </Card>
    </motion.section>
  );
};

export default ContactForm;