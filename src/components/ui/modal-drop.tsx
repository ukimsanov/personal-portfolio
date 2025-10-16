"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { X } from "@phosphor-icons/react"
import { AnimatePresence, motion, type Variants } from "framer-motion"
import { createPortal } from "react-dom"

import { cn } from "@/lib/utils"

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  allowEasyClose?: boolean
  title?: string
  subtitle?: string
  type?: "blur" | "overlay" | "none"
  showCloseButton?: boolean
  showEscText?: boolean
  borderBottom?: boolean
  className?: string
  /**
   * Choose between the default drop-in animation or a scale-from-center animation.
   * @default 'drop'
   */
  animationType?: "drop" | "scale"
  /**
   * Adjust the vertical position of the modal.
   * Positive values move it up, negative values move it down.
   * @default 0
   */
  position?: number
  /**
   * Disable default padding of the modal content.
   * @default false
   */
  disablePadding?: boolean
}

const backdropVariants: Variants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1,
    transition: { duration: 0.2, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.15, ease: "easeIn" }
  },
}

// Default drop-in from bottom
const dropVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    transition: {
      duration: 0.22,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 32,
      mass: 0.7,
      opacity: { duration: 0.32, ease: [0.4, 0, 0.2, 1] },
    },
  },
  exit: {
    opacity: 0,
    y: 24,
    transition: {
      duration: 0.18,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

// Scale from center animation
const scaleVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 500,
      damping: 30,
      mass: 0.5,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: {
      duration: 0.15,
      ease: [0.4, 0, 0.2, 1],
    },
  },
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  allowEasyClose = true,
  title,
  subtitle,
  type = "overlay",
  showCloseButton = true,
  showEscText = true,
  borderBottom = true,
  className,
  animationType = "scale",
  position = 0,
  disablePadding = false,
}) => {
  const [mounted, setMounted] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Detect mobile for bottom sheet
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640) // sm breakpoint
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // ESC key handler
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen && allowEasyClose) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEscKey)
    }

    return () => {
      document.removeEventListener("keydown", handleEscKey)
    }
  }, [isOpen, allowEasyClose, onClose])

  useEffect(() => {
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth
    if (isOpen) {
      const currentPaddingRight =
        Number.parseInt(getComputedStyle(document.body).paddingRight) || 0
      document.body.style.paddingRight = `${currentPaddingRight + scrollbarWidth}px`
      document.body.classList.add("overflow-hidden")
    } else {
      document.body.style.paddingRight = ""
      document.body.classList.remove("overflow-hidden")
    }
    return () => {
      document.body.style.paddingRight = ""
      document.body.classList.remove("overflow-hidden")
    }
  }, [isOpen])

  const handleOverlayClick = () => {
    if (allowEasyClose) onClose()
  }

  const getModalClasses = () => {
    // Mobile: centered modal (slightly smaller, all borders)
    // Desktop: centered modal (auto width, all rounded corners)
    if (isMobile) {
      return "w-[92%] bg-background border border-border text-card-foreground max-h-[70vh] rounded-2xl shadow-lg relative flex flex-col"
    }
    const base = "w-auto bg-background border border-border text-card-foreground max-w-full sm:max-w-2xl lg:max-w-4xl max-h-[85vh] rounded-2xl shadow-lg m-4 relative flex flex-col"
    return type === "overlay" ? base : `${base} border border-border`
  }

  if (!mounted) return null

  // Choose the appropriate animation variants
  // Use scale or drop animation for all devices
  const variants = animationType === "scale" ? scaleVariants : dropVariants

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center">
          {/* Stable blur layer - disabled on mobile for performance */}
          {type === "blur" && (
            <div
              className="absolute inset-0 sm:backdrop-blur-xs z-[101]"
              style={{
                WebkitBackdropFilter: "blur(8px)",
                transform: "translateZ(0)",
              }}
            />
          )}

          {/* Animated overlay layer */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className={`absolute inset-0 z-[102] ${type === "blur" ? "bg-black/70 sm:bg-black/40" : type === "overlay" ? "bg-black/70 sm:bg-black/50" : ""}`}
            onClick={handleOverlayClick}
            style={{
              transform: "translateZ(0)",
              willChange: "transform",
            }}
          />

          {/* Modal container */}
          <div
            className={cn(
              "relative z-[103] flex w-full h-full pointer-events-none items-center justify-center"
            )}
            style={{
              alignItems: position !== 0 ? "flex-start" : undefined,
              paddingTop: position !== 0 ? `calc(50vh - ${position}px)` : 0,
            }}
          >
            <motion.div
              variants={variants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className={cn(getModalClasses(), "overflow-hidden", className)}
              onClick={(e) => e.stopPropagation()}
              style={{ pointerEvents: "auto" }}
            >
            {title ? (
              <div
                className={cn(
                  "flex justify-between p-6 pb-4",
                  borderBottom && "border-b border-border",
                  subtitle ? "flex-col items-start gap-1" : "items-center"
                )}
              >
                <div>
                  <h2 className="text-xl font-semibold">{title}</h2>
                  {subtitle && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {subtitle}
                    </p>
                  )}
                </div>
                {showCloseButton && (
                  <div
                    className={cn(
                      "flex items-center gap-2",
                      subtitle && "absolute top-6 right-6"
                    )}
                  >
                    {showEscText && (
                      <span className="hidden lg:inline px-2 py-1 text-[11px] font-medium bg-muted text-muted-foreground rounded">
                        ESC
                      </span>
                    )}
                    <button
                      className="p-2 sm:p-1 rounded-md hover:bg-muted active:bg-muted transition-colors min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center relative z-10 touch-manipulation"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onClose();
                      }}
                      type="button"
                      aria-label="Close modal"
                    >
                      <X size={24} weight="bold" className="sm:w-5 sm:h-5" />
                    </button>
                  </div>
                )}
              </div>
            ) : (
              showCloseButton && (
                <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex items-center gap-2 z-10">
                  {showEscText && (
                    <span className="hidden lg:inline px-2 py-1 text-xs font-medium bg-muted text-muted-foreground rounded">
                      ESC
                    </span>
                  )}
                  <button
                    className="p-2 sm:p-1 rounded-md hover:bg-muted active:bg-muted transition-colors min-w-[44px] min-h-[44px] sm:min-w-0 sm:min-h-0 flex items-center justify-center relative z-10 touch-manipulation"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      onClose();
                    }}
                    type="button"
                    aria-label="Close modal"
                  >
                    <X size={24} weight="bold" className="sm:w-5 sm:h-5" />
                  </button>
                </div>
              )
            )}

            <div
              className={cn(!disablePadding && (!title ? "p-4 pt-14 sm:p-6 sm:pt-12" : "p-4 sm:p-6"))}
            >
              {children}
            </div>
          </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  )

  return createPortal(modalContent, document.body)
}

export default Modal;
