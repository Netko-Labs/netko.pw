import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { bootMessages, labsLogo } from './constants'

interface BootSequenceProps {
  onComplete: () => void
}

export function BootSequence({ onComplete }: BootSequenceProps) {
  const [visibleLines, setVisibleLines] = useState(0)
  const [showLogo, setShowLogo] = useState(false)
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    // Show logo first
    const logoTimer = setTimeout(() => setShowLogo(true), 100)
    return () => clearTimeout(logoTimer)
  }, [])

  useEffect(() => {
    if (!showLogo) return

    if (visibleLines < bootMessages.length) {
      const msg = bootMessages[visibleLines]
      const timer = setTimeout(() => {
        setVisibleLines(v => v + 1)
      }, msg.delay ? msg.delay - (bootMessages[visibleLines - 1]?.delay ?? 0) : 200)
      return () => clearTimeout(timer)
    }

    // All messages shown, wait then exit
    const exitTimer = setTimeout(() => {
      setExiting(true)
      setTimeout(onComplete, 500)
    }, 600)
    return () => clearTimeout(exitTimer)
  }, [showLogo, visibleLines, onComplete])

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-background flex items-center justify-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="max-w-2xl w-full px-6">
            {showLogo && (
              <motion.pre
                className="text-foreground text-glow text-[6px] sm:text-[8px] md:text-[10px] leading-tight mb-6 select-none whitespace-pre"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {labsLogo}
              </motion.pre>
            )}

            <div className="border-t border-border pt-3 space-y-0.5">
              {bootMessages.slice(0, visibleLines).map((msg, i) => (
                <motion.div
                  key={i}
                  className="text-[10px] sm:text-xs leading-relaxed"
                  style={{ color: msg.color }}
                  initial={{ opacity: 0, x: -4 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  {msg.text || '\u00A0'}
                </motion.div>
              ))}
              {visibleLines < bootMessages.length && (
                <span className="text-foreground cursor-blink text-xs">█</span>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
