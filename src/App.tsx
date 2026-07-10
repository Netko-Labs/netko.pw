import { useEffect, useState } from 'react'
import { LandingPage } from '@/components/landing-page'
import { AsciiBootScreen } from '@/components/landing/ascii/boot-screen'
import type { AsciiBootPhase } from '@/types'

const BOOT_MINIMUM_MS = 1_350
const FONT_WAIT_LIMIT_MS = 900
const BOOT_EXIT_MS = 480

export function App() {
  const [bootPhase, setBootPhase] = useState<AsciiBootPhase>('loading')
  const [showBoot, setShowBoot] = useState(true)

  useEffect(() => {
    const root = document.documentElement
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const minimumMs = reducedMotion ? 80 : BOOT_MINIMUM_MS
    const exitMs = reducedMotion ? 20 : BOOT_EXIT_MS
    let cancelled = false
    let minimumTimer = 0
    let fontTimer = 0
    let removeTimer = 0

    root.dataset.booting = 'true'

    const minimumReady = new Promise<void>((resolve) => {
      minimumTimer = window.setTimeout(resolve, minimumMs)
    })
    const fontTimeout = new Promise<void>((resolve) => {
      fontTimer = window.setTimeout(resolve, FONT_WAIT_LIMIT_MS)
    })
    const fontsReady = document.fonts?.ready.then(() => undefined) ?? Promise.resolve()

    void Promise.all([minimumReady, Promise.race([fontsReady, fontTimeout])]).then(() => {
      if (cancelled) return

      setBootPhase('exiting')
      removeTimer = window.setTimeout(() => {
        setShowBoot(false)
        delete root.dataset.booting
      }, exitMs)
    })

    return () => {
      cancelled = true
      window.clearTimeout(minimumTimer)
      window.clearTimeout(fontTimer)
      window.clearTimeout(removeTimer)
      delete root.dataset.booting
    }
  }, [])

  return (
    <>
      <div
        aria-hidden={showBoot}
        className="app-content"
        data-boot-phase={showBoot ? bootPhase : 'ready'}
        inert={showBoot}
      >
        <LandingPage />
      </div>
      {showBoot ? <AsciiBootScreen phase={bootPhase} /> : null}
    </>
  )
}

export default App
