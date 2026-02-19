import { useGitHubData } from '@/hooks/use-github-data'

const YELLOW = '#FFD600'
const BLACK = '#0A0A0A'
const WHITE = '#FAFAFA'
const GRAY = '#888'
const DISPLAY = '"Bebas Neue", "Impact", sans-serif'
const BODY = '"DM Mono", "Courier New", monospace'

export function EditorialDesign() {
  const { githubData, mainContributor, loading, getRepo } = useGitHubData()
  const date = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }).toUpperCase()

  const projects = [
    { key: 'covenote', cat: 'PRODUCTIVITY', name: 'CoveNote', lede: 'The second brain app that respects your data.' },
    { key: 'anko', cat: 'DEVELOPER TOOLS', name: 'Anko', lede: 'SQL editing for people who hate bloated editors.' },
    { key: 'code-whiskers', cat: 'INFRASTRUCTURE', name: 'Code Whiskers', lede: 'Self-hosted error monitoring. No SaaS. No BS.' },
    { key: 'mizu', cat: 'HOMELAB', name: 'Mizu', lede: 'Turn your Mac mini into a fully-featured PaaS.' },
  ]

  return (
    <div style={{ background: WHITE, color: BLACK, minHeight: '100vh', fontFamily: BODY }}>

      {/* MASTHEAD STRIP */}
      <div style={{ background: BLACK, color: WHITE, padding: '4px 24px', display: 'flex', justifyContent: 'space-between', fontSize: '11px', letterSpacing: '0.1em', fontFamily: BODY }}>
        <span>OPEN SOURCE · DEVELOPER TOOLS · INDIE GAMES</span>
        <span>{date}</span>
      </div>

      {/* NEWSPAPER HEADER */}
      <div style={{ borderBottom: `4px solid ${BLACK}`, padding: '16px 24px 0' }}>
        <div style={{ textAlign: 'center', borderBottom: `2px solid ${BLACK}`, paddingBottom: '12px', marginBottom: '12px' }}>
          <div style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.4em', color: GRAY, marginBottom: '4px' }}>THE NETKO GAZETTE</div>
          <h1 style={{ fontFamily: DISPLAY, fontSize: 'clamp(60px, 14vw, 140px)', lineHeight: 1, margin: 0, letterSpacing: '0.01em' }}>NETKO<span style={{ color: YELLOW }}>.</span></h1>
          <div style={{ fontFamily: BODY, fontSize: '12px', color: GRAY, letterSpacing: '0.15em' }}>
            "WE SHIP COOL STUFF" — SINCE 2024
          </div>
        </div>

        {/* STATS BAR */}
        {!loading && githubData && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '32px', paddingBottom: '12px', fontFamily: BODY, fontSize: '12px' }}>
            <span><strong style={{ color: YELLOW }}>★ {githubData.totalStars}</strong> TOTAL STARS</span>
            <span>|</span>
            <span><strong>{githubData.publicRepos}</strong> REPOSITORIES</span>
            <span>|</span>
            <span><strong>{githubData.languages.slice(0, 3).join(', ')}</strong></span>
          </div>
        )}
      </div>

      {/* MAIN CONTENT — NEWSPAPER GRID */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '24px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '0', borderLeft: `1px solid #e0e0e0`, borderRight: `1px solid #e0e0e0` }}>

        {/* LEFT: FEATURED PROJECTS */}
        <div style={{ borderRight: `1px solid #e0e0e0`, paddingRight: '24px' }}>
          <div style={{ fontFamily: BODY, fontSize: '10px', letterSpacing: '0.3em', color: GRAY, borderBottom: `1px solid #e0e0e0`, paddingBottom: '6px', marginBottom: '16px' }}>
            FEATURED PROJECTS
          </div>

          {/* HERO PROJECT */}
          {(() => {
            const p = projects[0]
            const repo = getRepo(p.key)
            return (
              <div style={{ marginBottom: '24px', borderBottom: `1px solid #e0e0e0`, paddingBottom: '24px' }}>
                <div style={{ background: YELLOW, display: 'inline-block', padding: '2px 8px', fontFamily: BODY, fontSize: '10px', letterSpacing: '0.2em', marginBottom: '8px' }}>{p.cat}</div>
                <div style={{ fontFamily: DISPLAY, fontSize: 'clamp(36px, 6vw, 64px)', lineHeight: 1, marginBottom: '10px' }}>{p.name}</div>
                <div style={{ fontFamily: BODY, fontSize: '14px', color: '#333', lineHeight: '1.6', marginBottom: '12px' }}>{p.lede}</div>
                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                  {repo && <span style={{ fontFamily: BODY, fontSize: '11px', color: GRAY }}>★ {repo.stars} stars · {repo.forks} forks</span>}
                  <a href={repo?.url || `https://github.com/n3tko/${p.key}`} target="_blank" rel="noreferrer"
                    style={{ background: BLACK, color: WHITE, textDecoration: 'none', fontFamily: BODY, fontSize: '11px', padding: '4px 12px', letterSpacing: '0.1em', marginLeft: 'auto' }}>
                    → REPO
                  </a>
                </div>
              </div>
            )
          })()}

          {/* OTHER PROJECTS — 3 COLUMNS */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
            {projects.slice(1).map(p => {
              const repo = getRepo(p.key)
              return (
                <div key={p.key} style={{ borderRight: p.key !== projects[projects.length - 1].key ? `1px solid #e0e0e0` : 'none', paddingRight: '16px' }}>
                  <div style={{ fontFamily: BODY, fontSize: '9px', letterSpacing: '0.2em', color: GRAY, marginBottom: '4px' }}>{p.cat}</div>
                  <div style={{ fontFamily: DISPLAY, fontSize: '22px', lineHeight: 1, marginBottom: '6px' }}>{p.name}</div>
                  <div style={{ fontFamily: BODY, fontSize: '11px', color: '#444', lineHeight: '1.5', marginBottom: '8px' }}>{p.lede}</div>
                  {repo && <div style={{ fontFamily: BODY, fontSize: '10px', color: GRAY }}>★ {repo.stars}</div>}
                  <a href={repo?.url || `https://github.com/n3tko/${p.key}`} target="_blank" rel="noreferrer"
                    style={{ color: BLACK, textDecoration: 'none', fontFamily: BODY, fontSize: '10px', borderBottom: `1px solid ${YELLOW}` }}>
                    Read more →
                  </a>
                </div>
              )
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: SIDEBAR */}
        <div style={{ paddingLeft: '24px', display: 'flex', flexDirection: 'column', gap: '24px' }}>

          {/* CLASSIFIED */}
          <div style={{ background: BLACK, color: WHITE, padding: '16px' }}>
            <div style={{ fontFamily: BODY, fontSize: '9px', letterSpacing: '0.3em', color: YELLOW, marginBottom: '8px' }}>CLASSIFIED / UPCOMING</div>
            <div style={{ fontFamily: DISPLAY, fontSize: '32px', lineHeight: 1, marginBottom: '8px' }}>GLITCH<br /><span style={{ color: YELLOW }}>COVE</span></div>
            <div style={{ fontFamily: BODY, fontSize: '11px', color: '#aaa', lineHeight: '1.5' }}>A game. Details withheld. Watch this space.</div>
          </div>

          {/* CONTRIBUTOR */}
          {mainContributor && (
            <div style={{ borderTop: `4px solid ${BLACK}`, paddingTop: '16px' }}>
              <div style={{ fontFamily: BODY, fontSize: '9px', letterSpacing: '0.3em', color: GRAY, marginBottom: '8px' }}>ABOUT THE AUTHOR</div>
              <div style={{ fontFamily: DISPLAY, fontSize: '26px', lineHeight: 1, marginBottom: '6px' }}>{mainContributor.name}</div>
              {mainContributor.bio && <div style={{ fontFamily: BODY, fontSize: '11px', color: '#555', lineHeight: '1.5', marginBottom: '8px' }}>{mainContributor.bio}</div>}
              {mainContributor.location && <div style={{ fontFamily: BODY, fontSize: '11px', color: GRAY }}>📍 {mainContributor.location}</div>}
              <div style={{ fontFamily: BODY, fontSize: '11px', color: GRAY, marginBottom: '8px' }}>⟡ {mainContributor.followers} followers</div>
              <a href={mainContributor.url} target="_blank" rel="noreferrer"
                style={{ color: BLACK, textDecoration: 'none', fontFamily: BODY, fontSize: '11px', borderBottom: `2px solid ${YELLOW}` }}>
                GitHub Profile →
              </a>
            </div>
          )}

          {/* TECH STACK */}
          <div style={{ borderTop: `1px solid #e0e0e0`, paddingTop: '16px' }}>
            <div style={{ fontFamily: BODY, fontSize: '9px', letterSpacing: '0.3em', color: GRAY, marginBottom: '8px' }}>BUILT WITH</div>
            {['TypeScript', 'Rust', 'React', 'Tauri', 'Tailwind'].map(t => (
              <div key={t} style={{ fontFamily: BODY, fontSize: '12px', borderBottom: `1px solid #e0e0e0`, padding: '4px 0', display: 'flex', justifyContent: 'space-between' }}>
                <span>{t}</span><span style={{ color: YELLOW }}>●</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{ background: BLACK, color: WHITE, padding: '12px 24px', display: 'flex', justifyContent: 'space-between', fontFamily: BODY, fontSize: '11px', letterSpacing: '0.1em' }}>
        <span>THE NETKO GAZETTE — OPEN SOURCE COLLECTIVE</span>
        <a href="https://github.com/n3tko" target="_blank" rel="noreferrer" style={{ color: YELLOW, textDecoration: 'none' }}>GITHUB →</a>
      </div>
    </div>
  )
}
