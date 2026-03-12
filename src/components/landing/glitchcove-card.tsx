import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import { itemVariants } from './constants'

const GLITCH_CHARS = '!@#$%^&*()_+-=[]{}|;:,.<>?~`'

function useGlitchText(text: string, active: boolean) {
  const [display, setDisplay] = useState(text)

  useEffect(() => {
    if (!active) {
      setDisplay(text)
      return
    }
    const interval = setInterval(() => {
      setDisplay(
        text
          .split('')
          .map(c =>
            Math.random() > 0.7
              ? GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
              : c
          )
          .join('')
      )
    }, 50)
    return () => clearInterval(interval)
  }, [text, active])

  return display
}

export function GlitchCoveCard() {
  const [hovered, setHovered] = useState(false)
  const glitchedName = useGlitchText('GlitchCove', hovered)

  return (
    <motion.div
      variants={itemVariants}
      className="col-span-2 transition-all duration-200 relative overflow-hidden group"
      style={{ borderWidth: 1, borderColor: 'color-mix(in srgb, var(--magenta) 30%, transparent)' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
        style={{
          background: 'repeating-linear-gradient(0deg, transparent, transparent 1px, color-mix(in srgb, var(--magenta) 5%, transparent) 1px, color-mix(in srgb, var(--magenta) 5%, transparent) 2px)',
        }}
      />

      <div
        className="px-3 py-1 flex items-center justify-between bg-[var(--title-bar)] relative z-10"
        style={{ borderBottomWidth: 1, borderColor: 'color-mix(in srgb, var(--magenta) 30%, transparent)' }}
      >
        <span className="text-[10px]" style={{ color: 'var(--magenta)' }}>
          Netko-Labs/glitchcove
        </span>
        <div className="flex items-center gap-2">
          <motion.span
            className="text-[9px] font-bold text-glow-magenta"
            style={{ color: 'var(--magenta)' }}
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            &#9608; WIP
          </motion.span>
          <span className="text-[9px] font-bold text-glow-danger" style={{ color: 'var(--danger)' }}>CLOSED</span>
        </div>
      </div>

      <div className="px-4 py-3 relative z-10">
        <div className="flex items-start gap-2">
          <span className="text-glow-magenta shrink-0 text-[10px] mt-0.5" style={{ color: 'var(--magenta)' }}>&gt;</span>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <h2
                className="font-bold text-sm text-glow-magenta"
                style={{ color: 'var(--magenta)' }}
              >
                {glitchedName}
              </h2>
              <span className="text-[9px] text-muted-foreground">// classified</span>
            </div>
            <p className="text-muted-foreground text-[11px] mt-1 leading-relaxed">
              A video game brewed with chaos and passion. Coming soon...
            </p>
            <div className="mt-2 flex items-center gap-2">
              <span className="text-[9px]" style={{ color: 'var(--magenta-muted)' }}>#game</span>
              <span className="text-[9px]" style={{ color: 'var(--magenta-muted)' }}>#indie</span>
              <span className="text-[9px]" style={{ color: 'var(--magenta-muted)' }}>#&#9608;&#9608;&#9608;&#9608;</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
