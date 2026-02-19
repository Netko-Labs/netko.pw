import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { DESIGNS, type DesignId } from '@/designs'

interface Props {
  current: DesignId
  onChange: (id: DesignId) => void
}

export function DesignSwitcher({ current, onChange }: Props) {
  const [open, setOpen] = useState(false)
  const currentDef = DESIGNS.find(d => d.id === current) ?? DESIGNS[0]

  return (
    <div style={{ position: 'fixed', bottom: '20px', right: '20px', zIndex: 99999, fontFamily: 'system-ui, sans-serif' }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.94 }}
            transition={{ duration: 0.18 }}
            style={{
              position: 'absolute',
              bottom: 'calc(100% + 10px)',
              right: 0,
              background: '#0a0a0a',
              border: '1px solid rgba(255,255,255,0.15)',
              borderRadius: '16px',
              padding: '8px',
              minWidth: '200px',
              boxShadow: '0 16px 48px rgba(0,0,0,0.5)',
            }}
          >
            <div style={{ padding: '8px 12px 6px', fontSize: '10px', letterSpacing: '0.15em', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase' }}>
              Design Style
            </div>
            {DESIGNS.map(d => (
              <button
                key={d.id}
                onClick={() => { onChange(d.id); setOpen(false) }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: 'none',
                  cursor: 'pointer',
                  background: d.id === current ? 'rgba(255,255,255,0.1)' : 'transparent',
                  color: d.id === current ? '#fff' : 'rgba(255,255,255,0.6)',
                  textAlign: 'left',
                  fontSize: '13px',
                  transition: 'background 0.15s',
                }}
                onMouseEnter={e => { if (d.id !== current) (e.target as HTMLElement).style.background = 'rgba(255,255,255,0.06)' }}
                onMouseLeave={e => { if (d.id !== current) (e.target as HTMLElement).style.background = 'transparent' }}
              >
                <span style={{ fontSize: '16px', lineHeight: 1 }}>{d.emoji}</span>
                <div>
                  <div style={{ fontWeight: d.id === current ? 600 : 400 }}>{d.label}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)' }}>{d.description}</div>
                </div>
                {d.id === current && <span style={{ marginLeft: 'auto', color: '#fff', fontSize: '10px' }}>✓</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => setOpen(o => !o)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.2)',
          color: '#fff',
          padding: '10px 16px',
          borderRadius: '50px',
          cursor: 'pointer',
          fontSize: '13px',
          fontFamily: 'system-ui, sans-serif',
          boxShadow: '0 4px 16px rgba(0,0,0,0.4)',
        }}
      >
        <span>{currentDef.emoji}</span>
        <span>{currentDef.label}</span>
        <span style={{ opacity: 0.4, fontSize: '9px' }}>{open ? '▲' : '▼'}</span>
      </motion.button>
    </div>
  )
}
