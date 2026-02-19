import { useGitHubData } from '@/hooks/use-github-data'

const GOLD = '#C9A84C'
const GOLD_LIGHT = '#E8C97A'
const BG = '#0E0C08'
const CREAM = '#F5F0E8'
const SERIF = '"Playfair Display", "Georgia", serif'
const LIGHT_SERIF = '"Cormorant Garamond", "Garamond", serif'

function GoldDivider() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '20px 0' }}>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(to right, transparent, ${GOLD})` }} />
      <span style={{ color: GOLD, fontSize: '16px' }}>◆</span>
      <div style={{ flex: 1, height: '1px', background: `linear-gradient(to left, transparent, ${GOLD})` }} />
    </div>
  )
}

function OrnamentBorder({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      border: `1px solid ${GOLD}30`,
      position: 'relative',
      ...style,
    }}>
      {/* Corner ornaments */}
      {[{ top: -1, left: -1 }, { top: -1, right: -1 }, { bottom: -1, left: -1 }, { bottom: -1, right: -1 }].map((pos, i) => (
        <span key={i} style={{ position: 'absolute', color: GOLD, fontSize: '10px', lineHeight: 1, ...pos }}>◆</span>
      ))}
      {children}
    </div>
  )
}

export function ArtDecoDesign() {
  const { githubData, mainContributor, loading, getRepo } = useGitHubData()

  const projects = [
    { key: 'covenote', roman: 'Ⅰ', name: 'CoveNote', subtitle: 'The Second Brain', desc: 'Capture and connect your thoughts with elegance.' },
    { key: 'anko', roman: 'Ⅱ', name: 'Anko', subtitle: 'The SQL Atelier', desc: 'A refined environment for database artisans.' },
    { key: 'code-whiskers', roman: 'Ⅲ', name: 'Code Whiskers', subtitle: 'The Error Observatory', desc: 'Self-sovereign monitoring for discerning engineers.' },
    { key: 'mizu', roman: 'Ⅳ', name: 'Mizu', subtitle: 'The Homelab Sanctuary', desc: 'Bring the cloud home. Sovereign infrastructure.' },
  ]

  return (
    <div style={{ background: BG, color: CREAM, minHeight: '100vh', fontFamily: LIGHT_SERIF }}>

      {/* ORNAMENTAL TOP */}
      <div style={{ textAlign: 'center', padding: '16px 24px', borderBottom: `1px solid ${GOLD}30` }}>
        <div style={{ color: GOLD, fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', fontFamily: '"Cormorant Garamond", serif' }}>
          ✦ &nbsp; Est. MMXXIV &nbsp; ✦
        </div>
      </div>

      <div style={{ maxWidth: '780px', margin: '0 auto', padding: '48px 24px' }}>

        {/* MASTHEAD */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ color: GOLD, fontSize: '11px', letterSpacing: '0.5em', marginBottom: '16px', fontFamily: '"Cormorant Garamond", serif' }}>
            THE COLLECTIVE
          </div>
          <h1 style={{
            fontFamily: SERIF,
            fontSize: 'clamp(64px, 14vw, 120px)',
            fontWeight: 900,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            margin: '0 0 8px',
            background: `linear-gradient(135deg, ${GOLD_LIGHT}, ${GOLD}, #9a7a2e)`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}>
            NETKO
          </h1>
          <div style={{ color: `${CREAM}80`, fontSize: '14px', letterSpacing: '0.3em', fontFamily: '"Cormorant Garamond", serif', fontStyle: 'italic' }}>
            We Ship Cool Stuff
          </div>

          <GoldDivider />

          {!loading && githubData && (
            <div style={{ display: 'flex', justifyContent: 'center', gap: '48px', fontFamily: '"Cormorant Garamond", serif' }}>
              {[
                { value: githubData.totalStars, label: 'Stars' },
                { value: githubData.publicRepos, label: 'Repositories' },
              ].map(stat => (
                <div key={stat.label} style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: SERIF, fontSize: '36px', color: GOLD, fontWeight: 700 }}>{stat.value}</div>
                  <div style={{ fontSize: '11px', color: `${CREAM}60`, letterSpacing: '0.2em', textTransform: 'uppercase' }}>{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* PROJECTS */}
        <div style={{ marginBottom: '48px' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div style={{ color: GOLD, fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase' }}>The Works</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {projects.map((p) => {
              const repo = getRepo(p.key)
              return (
                <OrnamentBorder key={p.key} style={{ padding: '24px 28px', display: 'grid', gridTemplateColumns: 'auto 1fr auto', gap: '24px', alignItems: 'center' }}>
                  <div style={{ fontFamily: SERIF, fontSize: '40px', color: `${GOLD}40`, fontWeight: 900, lineHeight: 1 }}>{p.roman}</div>
                  <div>
                    <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '11px', color: GOLD, letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: '4px' }}>{p.subtitle}</div>
                    <div style={{ fontFamily: SERIF, fontSize: '24px', fontWeight: 700, color: CREAM, marginBottom: '4px' }}>{p.name}</div>
                    <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '14px', color: `${CREAM}70`, fontStyle: 'italic' }}>{p.desc}</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    {repo && <div style={{ color: GOLD, fontSize: '13px', marginBottom: '4px' }}>★ {repo.stars}</div>}
                    <a href={repo?.url || `https://github.com/n3tko/${p.key}`} target="_blank" rel="noreferrer"
                      style={{ color: GOLD, textDecoration: 'none', fontSize: '12px', letterSpacing: '0.15em', fontFamily: '"Cormorant Garamond", serif' }}>
                      View →
                    </a>
                  </div>
                </OrnamentBorder>
              )
            })}
          </div>
        </div>

        <GoldDivider />

        {/* GLITCHCOVE */}
        <OrnamentBorder style={{ padding: '28px', textAlign: 'center', marginBottom: '40px', borderColor: `${GOLD}50` }}>
          <div style={{ color: GOLD, fontSize: '11px', letterSpacing: '0.4em', marginBottom: '8px', fontFamily: '"Cormorant Garamond", serif' }}>FORTHCOMING</div>
          <div style={{ fontFamily: SERIF, fontSize: '42px', fontWeight: 700, color: CREAM, marginBottom: '8px' }}>GlitchCove</div>
          <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '15px', color: `${CREAM}60`, fontStyle: 'italic' }}>
            A game of mystery and consequence. Coming when it's ready.
          </div>
        </OrnamentBorder>

        {/* CREATOR */}
        {mainContributor && (
          <div style={{ textAlign: 'center' }}>
            <div style={{ color: GOLD, fontSize: '11px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '12px', fontFamily: '"Cormorant Garamond", serif' }}>The Artisan</div>
            <div style={{ fontFamily: SERIF, fontSize: '28px', color: CREAM, marginBottom: '4px' }}>{mainContributor.name}</div>
            <div style={{ fontFamily: '"Cormorant Garamond", serif', fontSize: '14px', color: `${CREAM}60`, fontStyle: 'italic', marginBottom: '8px' }}>
              {mainContributor.bio}
            </div>
            <a href={mainContributor.url} target="_blank" rel="noreferrer"
              style={{ color: GOLD, textDecoration: 'none', fontSize: '12px', letterSpacing: '0.2em', fontFamily: '"Cormorant Garamond", serif' }}>
              GitHub Profile →
            </a>
          </div>
        )}

        <GoldDivider />

        <div style={{ textAlign: 'center', color: `${CREAM}30`, fontSize: '11px', letterSpacing: '0.3em', fontFamily: '"Cormorant Garamond", serif' }}>
          NETKO OSS ✦ OPEN SOURCE COLLECTIVE ✦ ALL RIGHTS RESERVED
        </div>
      </div>
    </div>
  )
}
