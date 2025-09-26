"use client";

import { useEffect, useRef, useState, useCallback } from 'react';

// Extend the global Window interface to include turnstile
declare global {
  interface Window {
    turnstile?: {
      render: (container: string | HTMLElement, options: TurnstileOptions) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId: string) => void;
      getResponse: (widgetId: string) => string;
      isExpired: (widgetId: string) => boolean;
    };
  }
}

interface TurnstileOptions {
  sitekey: string;
  callback?: (token: string) => void;
  'error-callback'?: (error?: string) => void;
  'expired-callback'?: () => void;
  'timeout-callback'?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact' | 'flexible';
  action?: string;
  cdata?: string;
  appearance?: 'always' | 'execute' | 'interaction-only';
  execution?: 'render' | 'execute';
  'response-field'?: boolean;
  'response-field-name'?: string;
  retry?: 'auto' | 'never';
  'retry-interval'?: number;
  'refresh-expired'?: 'auto' | 'manual' | 'never';
  language?: string;
}

interface TurnstileProps {
  siteKey: string;
  onSuccess: (token: string) => void;
  onError?: (error?: string) => void;
  onExpired?: () => void;
  onTimeout?: () => void;
  theme?: 'light' | 'dark' | 'auto';
  size?: 'normal' | 'compact' | 'flexible';
  action?: string;
  className?: string;
  id?: string;
}

export default function Turnstile({
  siteKey,
  onSuccess,
  onError,
  onExpired,
  onTimeout,
  theme = 'auto',
  size = 'normal',
  action,
  className = '',
  id = 'turnstile-widget'
}: TurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Check if Turnstile script is loaded
  const checkTurnstileLoaded = useCallback(() => {
    return typeof window !== 'undefined' && window.turnstile;
  }, []);

  // Render the widget
  const renderWidget = useCallback(() => {
    if (!containerRef.current || !checkTurnstileLoaded() || !siteKey) {
      return;
    }

    try {
      // Remove existing widget if it exists
      if (widgetIdRef.current) {
        window.turnstile!.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }

      // Clear any previous error
      setError(null);

      // Render new widget
      const widgetId = window.turnstile!.render(containerRef.current, {
        sitekey: siteKey,
        callback: (token: string) => {
          setError(null);
          onSuccess(token);
        },
        'error-callback': (error?: string) => {
          const errorMessage = error || 'Verification failed';
          setError(errorMessage);
          onError?.(errorMessage);
        },
        'expired-callback': () => {
          setError('Verification expired');
          onExpired?.();
        },
        'timeout-callback': () => {
          setError('Verification timed out');
          onTimeout?.();
        },
        theme,
        size,
        action,
        appearance: 'always',
        execution: 'render',
        'retry': 'auto',
        'refresh-expired': 'auto'
      });

      widgetIdRef.current = widgetId;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to load verification';
      setError(errorMessage);
      onError?.(errorMessage);
    }
  }, [siteKey, theme, size, action, onSuccess, onError, onExpired, onTimeout, checkTurnstileLoaded]);





  useEffect(() => {
    // Function to check and render when Turnstile is ready
    const initializeTurnstile = () => {
      if (checkTurnstileLoaded()) {
        renderWidget();
      } else {
        // Wait for Turnstile to load
        const checkInterval = setInterval(() => {
          if (checkTurnstileLoaded()) {
            clearInterval(checkInterval);
            renderWidget();
          }
        }, 100);

        // Cleanup interval after 10 seconds if still not loaded
        setTimeout(() => {
          clearInterval(checkInterval);
          if (!checkTurnstileLoaded()) {
            setError('Failed to load verification service');
            onError?.('Failed to load verification service');
          }
        }, 10000);
      }
    };

    initializeTurnstile();

    // Cleanup function
    return () => {
      if (widgetIdRef.current && checkTurnstileLoaded()) {
        try {
          window.turnstile!.remove(widgetIdRef.current);
        } catch (err) {
          console.error('Failed to cleanup Turnstile widget:', err);
        }
      }
    };
  }, [renderWidget, checkTurnstileLoaded, onError]); // Re-render when dependencies change

  // Don't render anything server-side
  if (typeof window === 'undefined') {
    return (
      <div className={`turnstile-placeholder min-h-[65px] ${className}`}>
        <div className="flex items-center justify-center h-16 bg-gray-100 dark:bg-gray-800 rounded border-2 border-dashed border-gray-300 dark:border-gray-600">
          <span className="text-sm text-gray-500 dark:text-gray-400">Loading verification...</span>
        </div>
      </div>
    );
  }

  return (
    <div className={`turnstile-container ${className}`}>
      <div
        ref={containerRef}
        id={id}
        className="turnstile-widget"
      />
      {error && (
        <div className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
}

// Export the reset function type for external components
export type TurnstileRef = {
  reset: () => void;
};