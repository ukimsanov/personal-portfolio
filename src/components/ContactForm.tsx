"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useState, useRef } from "react";
import { Send, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import Turnstile from "@/components/Turnstile";

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  description: string;
  turnstileToken: string;
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
  turnstile?: string;
  turnstileToken?: string;
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
  
  const inputClasses = `w-full px-3 py-3 sm:px-4 sm:py-3 rounded-lg border transition-colors duration-200 focus:outline-none text-base leading-normal ${
    hasError 
      ? 'border-red-500 focus:border-red-600 bg-red-50 dark:bg-red-900/10' 
      : 'border-border bg-background focus:border-blue-500'
  } ${isTextarea ? 'resize-vertical leading-relaxed' : ''}`;

  return (
    <div className="space-y-1.5 sm:space-y-2">
      <label 
        htmlFor={name} 
        className="text-sm font-medium text-foreground block"
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
const validateName = (name: string, hasTyped: boolean = true): ValidationResult => {
  const trimmed = name.trim();
  
  if (!trimmed) {
    return { isValid: false }; // No error message for empty fields
  }
  
  if (trimmed.length < 2 && hasTyped) {
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

const validateEmail = (email: string, hasTyped: boolean = true): ValidationResult => {
  const trimmed = email.trim();
  
  if (!trimmed) {
    return { isValid: false }; // No error message for empty fields
  }
  
  if (trimmed.length > 254) {
    return { isValid: false, error: "Email address is too long" };
  }
  
  // RFC 5322 compliant email regex - balanced approach
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(trimmed) && hasTyped) {
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

const validateDescription = (description: string, hasTyped: boolean = true): ValidationResult => {
  const trimmed = description.trim();
  
  if (!trimmed) {
    return { isValid: false }; // No error message for empty fields
  }
  
  if (trimmed.length < 2 && hasTyped) {
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
    description: '',
    turnstileToken: ''
  });

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [touchedFields, setTouchedFields] = useState<Set<string>>(new Set());
  const [typedFields, setTypedFields] = useState<Set<string>>(new Set());
  const [showTurnstile, setShowTurnstile] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const [status, setStatus] = useState<FormStatus>({
    type: 'idle',
    message: ''
  });

  const turnstileRef = useRef<HTMLDivElement>(null);
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
  const hasRenderedTurnstile = useRef(false);

  // Turnstile handlers
  const handleTurnstileVerify = (token: string) => {
    setFormData(prev => ({
      ...prev,
      turnstileToken: token
    }));
    
    // Clear turnstile error if present
    if (fieldErrors.turnstile) {
      setFieldErrors(prev => ({
        ...prev,
        turnstile: undefined
      }));
    }
  };

  const handleTurnstileError = () => {
    setFormData(prev => ({
      ...prev,
      turnstileToken: ''
    }));
    setFieldErrors(prev => ({
      ...prev,
      turnstile: 'Captcha verification failed. Please try again.'
    }));
  };

  const handleTurnstileExpire = () => {
    setFormData(prev => ({
      ...prev,
      turnstileToken: ''
    }));
    setFieldErrors(prev => ({
      ...prev,
      turnstile: 'Captcha verification expired. Please try again.'
    }));
  };

  const resetTurnstile = () => {
    const container = turnstileRef.current;
    if (container) {
      const turnstileContainer = container as HTMLDivElement & { _turnstileReset?: () => void };
      if (turnstileContainer._turnstileReset) {
        turnstileContainer._turnstileReset();
      }
    }
    setFormData(prev => ({
      ...prev,
      turnstileToken: ''
    }));
  };

  // Validate a single field
  const validateField = (fieldName: keyof ContactFormData, value: string, hasTyped: boolean = true): string | undefined => {
    switch (fieldName) {
      case 'name':
        const nameResult = validateName(value, hasTyped);
        return nameResult.isValid ? undefined : nameResult.error;
      case 'email':
        const emailResult = validateEmail(value, hasTyped);
        return emailResult.isValid ? undefined : emailResult.error;
      case 'phone':
        const phoneResult = validatePhone(value);
        return phoneResult.isValid ? undefined : phoneResult.error;
      case 'description':
        const descResult = validateDescription(value, hasTyped);
        return descResult.isValid ? undefined : descResult.error;
      case 'turnstileToken':
        return value ? undefined : 'Please complete the captcha verification';
      default:
        return undefined;
    }
  };

  // Check if all required fields are valid
  const checkFormValidity = (data: ContactFormData = formData, errors: FieldErrors = fieldErrors) => {
    const nameValid = data.name.trim().length >= 2 && !errors.name;
    const emailValid = data.email.trim().length > 0 && !errors.email;
    const descriptionValid = data.description.trim().length >= 2 && !errors.description;
    const phoneValid = !errors.phone; // Phone is optional

    return nameValid && emailValid && descriptionValid && phoneValid;
  };

  // Handle field blur - validate and show errors
  const handleFieldBlur = (fieldName: keyof ContactFormData) => {
    setTouchedFields(prev => new Set(prev).add(fieldName));

    // Only show specific validation errors if user has typed in this field
    const hasTyped = typedFields.has(fieldName);
    const error = validateField(fieldName, formData[fieldName], hasTyped);
    const newErrors = {
      ...fieldErrors,
      [fieldName]: error
    };
    setFieldErrors(newErrors);

    // Check if we should show Turnstile
    const updatedTouchedFields = new Set(touchedFields).add(fieldName);
    const requiredFieldsTouched = updatedTouchedFields.has('name') &&
                                   updatedTouchedFields.has('email') &&
                                   updatedTouchedFields.has('description');

    if (requiredFieldsTouched && checkFormValidity(formData, newErrors)) {
      setShowTurnstile(true);
      hasRenderedTurnstile.current = true;
    }

    // Update form validity
    setIsFormValid(checkFormValidity(formData, newErrors));
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    const fieldName = name as keyof ContactFormData;
    
    // Track that user has typed in this field
    if (value.trim().length > 0) {
      setTypedFields(prev => new Set(prev).add(fieldName));
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Only clear errors if field becomes valid (but don't show new errors while typing)
    if (touchedFields.has(fieldName) && fieldErrors[fieldName]) {
      const hasTyped = typedFields.has(fieldName) || value.trim().length > 0;
      const error = validateField(fieldName, value, hasTyped);
      
      // Only clear the error if field becomes valid, don't add new errors while typing
      if (!error) {
        const newErrors = {
          ...fieldErrors,
          [fieldName]: undefined
        };
        setFieldErrors(newErrors);
      }
    }

    // Update form validity and check if we should show Turnstile
    const newFormData = { ...formData, [name]: value };
    const formValid = checkFormValidity(newFormData, fieldErrors);
    setIsFormValid(formValid);

    // Show Turnstile if all required fields are touched and valid
    const requiredFieldsTouched = touchedFields.has('name') &&
                                   touchedFields.has('email') &&
                                   touchedFields.has('description');

    if (requiredFieldsTouched && formValid && !hasRenderedTurnstile.current) {
      setShowTurnstile(true);
      hasRenderedTurnstile.current = true;
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
      // For form submission, we need to validate all fields as if they were typed
      // This ensures required field validation happens on submit
      const error = validateField(field, formData[field], true);
      if (error) {
        // Type assertion is safe here as we know field is a key of ContactFormData
        (errors as Record<string, string>)[field] = error;
        hasErrors = true;
      }
    });

    // Also check for empty required fields
    if (!formData.name.trim()) {
      errors.name = "Name is required";
      hasErrors = true;
    }
    if (!formData.email.trim()) {
      errors.email = "Email is required";
      hasErrors = true;
    }
    if (!formData.description.trim()) {
      errors.description = "Message is required";
      hasErrors = true;
    }

    setFieldErrors(errors);
    setTouchedFields(new Set(Object.keys(formData)));
    setTypedFields(new Set(Object.keys(formData))); // Mark all as typed for error display
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
        description: '',
        turnstileToken: ''
      });
      setFieldErrors({});
      setTouchedFields(new Set());
      setTypedFields(new Set());
      setShowTurnstile(false);
      setIsFormValid(false);
      hasRenderedTurnstile.current = false;
      resetTurnstile();

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

  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.section
      id="contact-form"
      initial={{ 
        opacity: 0, 
        y: shouldReduceMotion ? 20 : 50 
      }}
      whileInView={{ 
        opacity: 1, 
        y: 0 
      }}
      transition={{ 
        duration: shouldReduceMotion ? 0.3 : 0.6,
        ease: [0.25, 0.1, 0.25, 1] as const
      }}
      viewport={{ once: true, amount: 0.2 }}
      className="py-8 sm:py-12 w-full flex flex-col items-center"
    >
      <motion.h2 
        initial={{ 
          opacity: 0, 
          y: shouldReduceMotion ? 10 : 30 
        }}
        whileInView={{ 
          opacity: 1, 
          y: 0 
        }}
        transition={{ 
          duration: shouldReduceMotion ? 0.2 : 0.5,
          delay: shouldReduceMotion ? 0.05 : 0.1,
          ease: [0.25, 0.1, 0.25, 1] as const
        }}
        viewport={{ once: true }}
        className="text-2xl font-bold mb-4 sm:mb-6 text-center"
      >
        Get In Touch
      </motion.h2>
      
      <motion.p 
        initial={{ 
          opacity: 0, 
          y: shouldReduceMotion ? 10 : 20 
        }}
        whileInView={{ 
          opacity: 1, 
          y: 0 
        }}
        transition={{ 
          duration: shouldReduceMotion ? 0.2 : 0.5,
          delay: shouldReduceMotion ? 0.1 : 0.2,
          ease: [0.25, 0.1, 0.25, 1] as const
        }}
        viewport={{ once: true }}
        className="mb-6 sm:mb-8 leading-relaxed max-w-xl text-center text-muted-foreground"
      >
        I&apos;m always interested in new opportunities and exciting projects. 
        Whether you have a question, want to collaborate, or just want to say hello, 
        feel free to reach out!
      </motion.p>
      
      <motion.div
        initial={{ 
          opacity: 0, 
          y: shouldReduceMotion ? 10 : 30 
        }}
        whileInView={{ 
          opacity: 1, 
          y: 0 
        }}
        transition={{ 
          duration: shouldReduceMotion ? 0.2 : 0.5,
          delay: shouldReduceMotion ? 0.15 : 0.3,
          ease: [0.25, 0.1, 0.25, 1] as const
        }}
        viewport={{ once: true }}
        className="w-full max-w-2xl mx-auto"
      >
        <Card className="w-full">
        <div className="p-4 sm:p-5 lg:p-6">
          <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
            {/* Name and Email Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
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

            {/* Turnstile Captcha - Only show when form is valid */}
            {siteKey && showTurnstile && (
              <div className="space-y-1.5 sm:space-y-2">
                <label className="text-sm font-medium text-foreground block">
                  Captcha Verification <span className="text-red-500">*</span>
                </label>
                <div ref={turnstileRef}>
                  <Turnstile
                    siteKey={siteKey}
                    onVerify={handleTurnstileVerify}
                    onError={handleTurnstileError}
                    onExpire={handleTurnstileExpire}
                    onTimeout={handleTurnstileError}
                    theme="auto"
                    size="normal"
                    className="w-full"
                  />
                </div>
                {fieldErrors.turnstile && (
                  <motion.p
                    role="alert"
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm text-red-600 dark:text-red-400 flex items-center gap-1"
                  >
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    {fieldErrors.turnstile}
                  </motion.p>
                )}
              </div>
            )}

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
              disabled={status.type === 'loading' || !isFormValid || (showTurnstile && !formData.turnstileToken)}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 sm:px-6 sm:py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-base min-h-[48px]"
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
      </motion.div>
    </motion.section>
  );
};

export default ContactForm;