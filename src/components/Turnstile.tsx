"use client";

import { useEffect, useRef, useCallback } from "react";

// Extend the global Window interface to include turnstile
declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: TurnstileOptions) => string;
      remove: (widgetId: string) => void;
      reset: (widgetId: string) => void;
      getResponse: (widgetId: string) => string;
    };
  }
}

interface TurnstileOptions {
  sitekey: string;
  callback?: (token: string) => void;
  'error-callback'?: () => void;
  'expired-callback'?: () => void;
  'timeout-callback'?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
  tabindex?: number;
  'response-field'?: boolean;
  'response-field-name'?: string;
  retry?: 'auto' | 'never';
  'retry-interval'?: number;
  'refresh-expired'?: 'auto' | 'manual' | 'never';
  language?: string;
  appearance?: 'always' | 'execute' | 'interaction-only';
  execution?: 'render' | 'execute';
}

interface TurnstileProps {
  siteKey: string;
  onVerify: (token: string) => void;
  onError?: () => void;
  onExpire?: () => void;
  onTimeout?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact';
  className?: string;
  tabIndex?: number;
  retry?: 'auto' | 'never';
}

const Turnstile: React.FC<TurnstileProps> = ({
  siteKey,
  onVerify,
  onError,
  onExpire,
  onTimeout,
  theme = 'auto',
  size = 'normal',
  className = '',
  tabIndex,
  retry = 'auto'
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const isLoadingRef = useRef(false);

  const renderTurnstile = useCallback(() => {
    if (!containerRef.current || !window.turnstile || isLoadingRef.current) {
      return;
    }

    // Clean up existing widget only if it exists
    if (widgetIdRef.current) {
      try {
        // Check if the widget ID is valid before attempting to remove
        const response = window.turnstile.getResponse(widgetIdRef.current);
        if (response !== undefined) {
          window.turnstile.remove(widgetIdRef.current);
        }
      } catch (error) {
        // Widget likely doesn't exist, no need to warn
        console.debug('Turnstile widget not found for removal:', error);
      }
      widgetIdRef.current = null;
    }

    isLoadingRef.current = true;

    try {
      const widgetId = window.turnstile.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          isLoadingRef.current = false;
          onVerify(token);
        },
        'error-callback': () => {
          isLoadingRef.current = false;
          onError?.();
        },
        'expired-callback': () => {
          isLoadingRef.current = false;
          onExpire?.();
        },
        'timeout-callback': () => {
          isLoadingRef.current = false;
          onTimeout?.();
        },
        theme,
        size,
        tabindex: tabIndex,
        retry,
        'refresh-expired': 'auto'
      });

      widgetIdRef.current = widgetId;
    } catch (error) {
      console.error('Failed to render Turnstile widget:', error);
      isLoadingRef.current = false;
      onError?.();
    }
  }, [siteKey, onVerify, onError, onExpire, onTimeout, theme, size, tabIndex, retry]);

  // Reset the widget
  const reset = useCallback(() => {
    if (widgetIdRef.current && window.turnstile) {
      try {
        // Check if widget exists before resetting
        const response = window.turnstile.getResponse(widgetIdRef.current);
        if (response !== undefined) {
          window.turnstile.reset(widgetIdRef.current);
        }
      } catch (error) {
        console.debug('Turnstile widget not found for reset:', error);
      }
    }
  }, []);

  // Get the current response token
  const getResponse = useCallback((): string => {
    if (widgetIdRef.current && window.turnstile) {
      try {
        return window.turnstile.getResponse(widgetIdRef.current);
      } catch (error) {
        console.warn('Failed to get Turnstile response:', error);
      }
    }
    return '';
  }, []);

  // Expose methods to parent component
  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      (container as HTMLDivElement & { _turnstileReset?: () => void; _turnstileGetResponse?: () => string })._turnstileReset = reset;
      (container as HTMLDivElement & { _turnstileReset?: () => void; _turnstileGetResponse?: () => string })._turnstileGetResponse = getResponse;
    }
  }, [reset, getResponse]);

  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 20; // Wait up to 10 seconds (20 * 500ms)
    
    const loadTurnstileScript = () => {
      // Check if script is already loaded
      if (window.turnstile) {
        renderTurnstile();
        return;
      }

      // Check if script tag already exists
      const existingScript = document.querySelector('script[src*="turnstile"]');
      if (existingScript) {
        checkTurnstileReady();
        return;
      }

      // Load the script dynamically
      const script = document.createElement('script');
      script.src = 'https://challenges.cloudflare.com/turnstile/v0/api.js';
      script.async = true;
      script.defer = true;
      script.onload = () => checkTurnstileReady();
      script.onerror = () => {
        console.error('Failed to load Turnstile script');
        onError?.();
      };
      document.head.appendChild(script);
    };

    const checkTurnstileReady = () => {
      if (window.turnstile) {
        renderTurnstile();
      } else if (attempts < maxAttempts) {
        attempts++;
        setTimeout(checkTurnstileReady, 500);
      } else {
        console.error('Turnstile API failed to load after 10 seconds');
        onError?.();
      }
    };

    loadTurnstileScript();

    // Cleanup on unmount
    return () => {
      if (widgetIdRef.current && window.turnstile) {
        try {
          // Check if widget exists before cleaning up
          const response = window.turnstile.getResponse(widgetIdRef.current);
          if (response !== undefined) {
            window.turnstile.remove(widgetIdRef.current);
          }
        } catch (error) {
          console.debug('Turnstile widget already cleaned up:', error);
        }
        widgetIdRef.current = null;
      }
    };
  }, [renderTurnstile, onError]);

  return (
    <div 
      ref={containerRef} 
      className={`turnstile-container ${className}`}
      aria-label="Captcha verification"
    />
  );
};

export default Turnstile;