import type { AsciiBootScreenProps } from '@/types'
import { AsciiFlipbook } from './primitives'

const BOOT_FRAMES = [
  `   /\\_/\\
  ( -.- )  zzz
   > ^ <
[##......] mount /dev/coffee`,
  `   /\\_/\\      (
  ( o.o )       )
   > ^ <      c[_]
[####....] source sidequests/*`,
  `   /\\_/\\     ( (
  ( o.o )      ) )
   > ^ <     c[_]
[######..] wake contributor cats`,
  `   /\\_/\\     ~ ~
  ( ^.^ )     c[_]
   > ^ <
[########] ready :: OSS for fun`,
] as const

export function AsciiBootScreen({ phase }: AsciiBootScreenProps) {
  return (
    <div
      aria-label="Starting the Netko Labs terminal"
      aria-live="polite"
      className="ascii-boot-screen"
      data-state={phase}
      role="status"
    >
      <div className="ascii-boot-terminal">
        <div aria-hidden="true" className="ascii-boot-terminal__rule">
          +--------------------------------------------------+
        </div>

        <div className="ascii-boot-terminal__body">
          <p className="ascii-boot-terminal__prompt">
            <span>guest@netko:~$</span> ./boot --after-hours
            <span aria-hidden="true" className="ascii-boot-terminal__cursor">
              _
            </span>
          </p>

          <div className="ascii-boot-terminal__grid">
            <AsciiFlipbook
              className="ascii-boot-terminal__art"
              frames={BOOT_FRAMES}
              label="A terminal cat waking up and preparing coffee"
            />

            <div aria-hidden="true" className="ascii-boot-terminal__log">
              <p>
                <span>[ok]</span> true black mounted
              </p>
              <p>
                <span>[ok]</span> weird ideas linked
              </p>
              <p>
                <span>[ok]</span> sidequest daemon warm
              </p>
              <p>
                <span>[go]</span> cursor handed to human
              </p>
            </div>
          </div>

          <p className="ascii-boot-terminal__status">
            boot.sequence :: coffee first / usefulness maybe
          </p>
        </div>

        <div aria-hidden="true" className="ascii-boot-terminal__rule">
          +--------------------------------------------------+
        </div>
      </div>
    </div>
  )
}
