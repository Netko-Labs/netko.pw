import { useGitHubData } from '@/hooks/use-github-data'

const RED = '#FF2D00'
const BLACK = '#000000'
const WHITE = '#F5F5F0'
const MONO = '"DM Mono", "Courier New", monospace'
const DISPLAY = '"Bebas Neue", "Arial Black", sans-serif'

export function BrutalistDesign() {
  const { githubData, mainContributor, loading, getRepo } = useGitHubData()
  const projects = [
    { key: 'covenote', name: 'COVENOTE', tag: 'SECOND BRAIN', desc: 'Your second brain, minus the corporate bullshit.' },
    { key: 'anko', name: 'ANKO', tag: 'SQL EDITOR', desc: 'SQL editor for people who think SQL editors suck.' },
    { key: 'code-whiskers', name: 'CODE-WHISKERS', tag: 'ERROR MONITORING', desc: 'Self-hosted error monitoring. No SaaS tax.' },
    { key: 'mizu', name: 'MIZU', tag: 'MAC MINI PAAS', desc: 'Mac mini homelab. PaaS vibes without the cloud bill.' },
  ]

  return (
    <div style={{ background: WHITE, color: BLACK, minHeight: '100vh', fontFamily: MONO }}>

      {/* TOP BAR */}
      <div style={{ background: BLACK, color: WHITE, padding: '10px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: `4px solid ${RED}` }}>
        <span style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase' }}>NETKO OSS — EST. 2024</span>
        <span style={{ fontFamily: MONO, fontSize: '11px', letterSpacing: '0.1em', color: '#aaa' }}>WE SHIP COOL STUFF</span>
      </div>

      {/* HERO */}
      <div style={{ padding: '0 24px', borderBottom: `2px solid ${BLACK}` }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: '0', alignItems: 'end', borderBottom: `2px solid ${BLACK}`, paddingBottom: '0' }}>
          <h1 style={{
            fontFamily: DISPLAY,
            fontSize: 'clamp(80px, 18vw, 220px)',
            lineHeight: 0.88,
            letterSpacing: '-0.02em',
            margin: '0',
            padding: '24px 0 0',
            color: BLACK,
          }}>
            NET<br />
            <span style={{ color: RED }}>KO.</span>
          </h1>
          <div style={{ paddingBottom: '8px', textAlign: 'right' }}>
            {!loading && githubData && (
              <div style={{ fontFamily: MONO, fontSize: '12px', lineHeight: '2' }}>
                <div><span style={{ color: RED }}>★</span> {githubData.totalStars} STARS</div>
                <div>⬡ {githubData.publicRepos} REPOS</div>
                <div>◉ {githubData.languages.slice(0, 3).join(' / ')}</div>
              </div>
            )}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: `2px solid ${BLACK}` }}>
          <div style={{ padding: '16px 0', borderRight: `2px solid ${BLACK}`, fontFamily: MONO, fontSize: '13px', letterSpacing: '0.05em' }}>
            OPEN SOURCE COLLECTIVE.<br />
            TOOLS WE ACTUALLY USE.
          </div>
          <div style={{ padding: '16px 24px', fontFamily: MONO, fontSize: '11px', color: '#555', lineHeight: '1.8' }}>
            NO CORPORATE VIBES.<br />
            NO INVESTOR DECKS.<br />
            JUST GOOD SOFTWARE.
          </div>
        </div>
      </div>

      {/* PROJECTS */}
      <div style={{ padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)' }}>
          {projects.map((p, i) => {
            const repo = getRepo(p.key)
            return (
              <div key={p.key} style={{
                borderRight: i % 2 === 0 ? `2px solid ${BLACK}` : 'none',
                borderBottom: `2px solid ${BLACK}`,
                padding: '20px 0',
                paddingRight: i % 2 === 0 ? '20px' : '0',
                paddingLeft: i % 2 === 1 ? '20px' : '0',
              }}>
                <div style={{ fontFamily: MONO, fontSize: '10px', color: RED, letterSpacing: '0.25em', marginBottom: '6px' }}>{p.tag}</div>
                <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(28px, 4vw, 52px)', lineHeight: '1', marginBottom: '10px' }}>{p.name}</div>
                <div style={{ fontFamily: MONO, fontSize: '12px', color: '#444', marginBottom: '12px', lineHeight: '1.6' }}>{p.desc}</div>
                <div style={{ display: 'flex', gap: '16px', fontFamily: MONO, fontSize: '11px', color: '#666' }}>
                  {repo && <span><span style={{ color: RED }}>★</span> {repo.stars}</span>}
                  {repo && <span>⑂ {repo.forks}</span>}
                  <a href={repo?.url || `https://github.com/n3tko/${p.key}`} target="_blank" rel="noreferrer" style={{ color: RED, textDecoration: 'none', letterSpacing: '0.1em', fontWeight: 700, marginLeft: 'auto' }}>→ REPO</a>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* GLITCHCOVE + CONTRIBUTOR */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '0 24px', borderBottom: `2px solid ${BLACK}` }}>
        <div style={{ background: BLACK, color: WHITE, padding: '24px', borderRight: `2px solid ${RED}` }}>
          <div style={{ fontFamily: MONO, fontSize: '10px', color: RED, letterSpacing: '0.25em', marginBottom: '8px' }}>COMING SOON</div>
          <div style={{ fontFamily: DISPLAY, fontSize: '52px', lineHeight: '1', marginBottom: '12px' }}>GLITCH<br /><span style={{ color: RED }}>COVE.</span></div>
          <div style={{ fontFamily: MONO, fontSize: '12px', color: '#aaa', lineHeight: '1.6' }}>Something is being built. Details classified. Watch the repo.</div>
        </div>
        <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontFamily: MONO, fontSize: '10px', letterSpacing: '0.25em', marginBottom: '8px', color: RED }}>OPERATOR</div>
          {mainContributor ? (
            <>
              <div style={{ fontFamily: DISPLAY, fontSize: '36px', lineHeight: '1', marginBottom: '8px' }}>{mainContributor.name?.toUpperCase() || 'PEJEDEV'}</div>
              <div style={{ fontFamily: MONO, fontSize: '11px', color: '#555', lineHeight: '1.8' }}>
                {mainContributor.location && <div>⌖ {mainContributor.location.toUpperCase()}</div>}
                <div>↳ {mainContributor.followers} FOLLOWERS</div>
              </div>
            </>
          ) : (
            <div style={{ fontFamily: DISPLAY, fontSize: '36px' }}>PEJEDEV</div>
          )}
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: RED, padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontFamily: DISPLAY, fontSize: '28px', color: WHITE }}>NETKO — WE SHIP COOL STUFF</span>
        <a href="https://github.com/n3tko" target="_blank" rel="noreferrer" style={{ fontFamily: MONO, fontSize: '11px', color: WHITE, textDecoration: 'none', letterSpacing: '0.1em' }}>GITHUB →</a>
      </div>
    </div>
  )
}
