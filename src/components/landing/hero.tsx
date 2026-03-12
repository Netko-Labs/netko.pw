import { motion } from 'motion/react'
import { useState, useEffect, useCallback } from 'react'
import { itemVariants, catAscii, catBlinkAscii } from './constants'

const TAGLINE = 'We ship cool stuff.'
const SUBTITLE = 'A bunch of devs making tools we actually want to use. No corporate vibes, just good software.'

export function Hero() {
  const [typedTag, setTypedTag] = useState('')
  const [typedSub, setTypedSub] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [phase, setPhase] = useState<'tag' | 'sub' | 'done'>('tag')
  const [catBlink, setCatBlink] = useState(false)

  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setCatBlink(true)
      setTimeout(() => setCatBlink(false), 150)
    }, 3000 + Math.random() * 2000)
    return () => clearInterval(blinkInterval)
  }, [])

  const tick = useCallback(() => {
    if (phase === 'tag') {
      if (typedTag.length < TAGLINE.length) {
        setTypedTag(TAGLINE.slice(0, typedTag.length + 1))
      } else {
        setTimeout(() => setPhase('sub'), 350)
      }
    } else if (phase === 'sub') {
      if (typedSub.length < SUBTITLE.length) {
        setTypedSub(SUBTITLE.slice(0, typedSub.length + 1))
      } else {
        setPhase('done')
      }
    }
  }, [phase, typedTag, typedSub])

  useEffect(() => {
    if (phase === 'done') return
    const speed = phase === 'tag' ? 55 + Math.random() * 35 : 18 + Math.random() * 12
    const timer = setTimeout(tick, speed)
    return () => clearTimeout(timer)
  }, [tick, phase])

  useEffect(() => {
    const interval = setInterval(() => setShowCursor(c => !c), 530)
    return () => clearInterval(interval)
  }, [])

  const cursor = showCursor ? '█' : ' '

  return (
    <motion.div
      variants={itemVariants}
      className="col-span-2 row-span-2 border border-border border-glow relative overflow-hidden scan-line"
    >
      <div className="border-b border-border px-3 py-1 flex items-center justify-between bg-[var(--title-bar)]">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-muted-foreground">~/netko-labs/init.sh</span>
          <span className="text-[10px] text-muted-foreground">PID:1337</span>
        </div>
        <div className="flex items-center gap-3">
          <motion.span
            className="text-[10px] text-foreground"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            ● LIVE
          </motion.span>
          <div className="flex gap-1">
            <span className="w-2 h-2 border" style={{ borderColor: 'var(--danger)', backgroundColor: 'color-mix(in srgb, var(--danger) 20%, transparent)' }} />
            <span className="w-2 h-2 border" style={{ borderColor: 'var(--soft)', backgroundColor: 'color-mix(in srgb, var(--soft) 20%, transparent)' }} />
            <span className="w-2 h-2 border" style={{ borderColor: 'var(--highlight)', backgroundColor: 'color-mix(in srgb, var(--highlight) 20%, transparent)' }} />
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col gap-3">
        <pre
          className="text-foreground text-glow text-[9px] sm:text-[11px] leading-tight select-none whitespace-pre"
          aria-hidden="true"
        >
          {catBlink ? catBlinkAscii : catAscii}
        </pre>

        <div className="space-y-2">
          <div className="flex items-start gap-2">
            <span className="text-accent text-glow-accent shrink-0 font-bold">$</span>
            <h1 className="text-base sm:text-lg font-bold text-foreground text-glow leading-tight">
              {typedTag}
              {phase === 'tag' && <span className="text-accent">{cursor}</span>}
            </h1>
          </div>

          {(phase === 'sub' || phase === 'done') && (
            <div className="flex items-start gap-2">
              <span className="text-muted-foreground shrink-0 text-[10px]">&gt;</span>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {typedSub}
                <span className="text-foreground">{cursor}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
