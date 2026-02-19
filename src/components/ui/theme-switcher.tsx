import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { useTheme, THEMES } from '@/hooks/use-theme'
import { cn } from '@/lib/utils'

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const current = THEMES.find(t => t.id === theme) ?? THEMES[0]

  return (
    <div className="relative">
      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border hover:border-primary/50 hover:bg-primary/5 transition-colors duration-300 text-sm font-medium"
        aria-label="Switch theme"
      >
        <span>{current.emoji}</span>
        <span className="hidden sm:inline">{current.label}</span>
        <span className="text-[9px] opacity-50">{open ? '▲' : '▼'}</span>
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-[calc(100%+8px)] bg-card border border-border rounded-2xl list-none m-0 p-1.5 min-w-36 shadow-xl z-50"
          >
            {THEMES.map(t => (
              <li
                key={t.id}
                onClick={() => { setTheme(t.id); setOpen(false) }}
                className={cn(
                  'flex items-center gap-2.5 px-3 py-2 rounded-xl cursor-pointer text-sm transition-colors duration-150',
                  t.id === theme
                    ? 'text-primary font-semibold bg-primary/10'
                    : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                )}
              >
                <span>{t.emoji}</span>
                <span>{t.label}</span>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
