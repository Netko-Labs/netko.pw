import { trackEvent } from '@/hooks/use-umami'
import type { AsciiContributorsBoothProps } from '@/types'
import { AsciiBadge, AsciiFlipbook, AsciiFrame } from './primitives'

const PAIRING_FRAMES = [
  `   .      /\\_/\\      ( (      /\\_/\\      *
         ( o.o )     ) )     ( o.o )
   *      > ^ <     c[_]      > ^ <      .
      [ @PEJEDEV ]--git--[ @VISHKUIT ]
           pair.service :: ready`,
  `   *      /\\_/\\       )      /\\_/\\      .
         ( o.o )     (      ( o.o )
   .      > ^ <     c[_]      > ^ <      +
      [ @PEJEDEV ]--push-[ @VISHKUIT ]
           pair.service :: syncing`,
  `   .      /\\_/\\      ~ ~      /\\_/\\      *
         ( -.- )     )      ( o.o )
   +      > ^ <   --c[_]-->  > ^ <      .
      [ @PEJEDEV ]--pull-[ @VISHKUIT ]
           coffee.bus :: passing`,
  `   *      /\\_/\\      ( (      /\\_/\\      +
         ( o.o )     ) )     ( -.- )
   .      > ^ <     c[_]      > ^ <      *
      [ @PEJEDEV ]--done-[ @VISHKUIT ]
           sidequest :: shipped`,
] as const

export function AsciiContributorsBooth({ contributor }: AsciiContributorsBoothProps) {
  const contributors = [
    {
      login: contributor.login,
      name: contributor.name,
      role: 'software / games / odd little tools',
      status: 'building',
      url: contributor.url,
    },
    {
      login: 'VishKuit',
      name: 'VishKuit',
      role: 'systems / security / cryptography',
      status: 'researching',
      url: 'https://github.com/VishKuit',
    },
  ] as const

  return (
    <AsciiFrame
      className="ascii-night-contributors"
      meta="2 humans / patches welcome"
      title="CONTRIBUTORS BOOTH"
    >
      <div className="ascii-night-contributors__layout">
        <div className="ascii-night-contributors__scene">
          <AsciiFlipbook
            frames={PAIRING_FRAMES}
            label="PejeDev and VishKuit pairing as two cats over coffee"
          />
          <p>pairing.service :: caffeinated</p>
          <p className="ascii-night-contributors__invite">
            <span aria-hidden="true">$ </span>
            got a patch or a weird idea? pull up a chair.
          </p>
        </div>

        <div className="ascii-night-contributors__roster">
          {contributors.map((person, index) => (
            <a
              className="ascii-contributor-card"
              href={person.url}
              key={person.login}
              onClick={() =>
                trackEvent('contributor-click', {
                  name: person.login,
                  placement: 'ascii-after-hours',
                })
              }
              rel="noreferrer"
              target="_blank"
            >
              <span className="ascii-contributor-card__index">usr/{String(index + 1).padStart(2, '0')}</span>
              <div>
                <strong>@{person.login}</strong>
                <small>{person.name}</small>
                <p>{person.role}</p>
              </div>
              <AsciiBadge>{person.status}</AsciiBadge>
            </a>
          ))}
        </div>
      </div>
    </AsciiFrame>
  )
}
