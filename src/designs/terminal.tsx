import { useEffect, useState } from 'react'
import { useGitHubData } from '@/hooks/use-github-data'

const GREEN = '#00FF41'
const DIM_GREEN = '#00aa2a'
const BG = '#0a0a0a'
const MONO = '"VT323", "DM Mono", "Courier New", monospace'

function useTyping(text: string, speed = 40) {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    setDisplayed('')
    let i = 0
    const id = setInterval(() => {
      setDisplayed(text.slice(0, ++i))
      if (i >= text.length) clearInterval(id)
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])
  return displayed
}

function AsciiBox({ title, children, style }: { title: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{ border: `1px solid ${DIM_GREEN}`, fontFamily: MONO, ...style }}>
      <div style={{ borderBottom: `1px solid ${DIM_GREEN}`, padding: '4px 12px', color: GREEN, fontSize: '13px', background: '#0f0f0f' }}>
        [ {title} ]
      </div>
      <div style={{ padding: '12px' }}>{children}</div>
    </div>
  )
}

export function TerminalDesign() {
  const { githubData, mainContributor, loading, getRepo } = useGitHubData()
  const [time, setTime] = useState(new Date().toISOString())
  const headline = useTyping('NETKO OSS — WE SHIP COOL STUFF', 45)

  useEffect(() => {
    const id = setInterval(() => setTime(new Date().toISOString()), 1000)
    return () => clearInterval(id)
  }, [])

  const projects = [
    { key: 'covenote', cmd: 'covenote', desc: 'Second brain app. No subscriptions.' },
    { key: 'anko', cmd: 'anko', desc: 'SQL editor that doesn\'t suck.' },
    { key: 'code-whiskers', cmd: 'code-whiskers', desc: 'Self-hosted error monitoring.' },
    { key: 'mizu', cmd: 'mizu', desc: 'Mac mini homelab PaaS.' },
  ]

  return (
    <div style={{
      background: BG,
      color: GREEN,
      minHeight: '100vh',
      fontFamily: MONO,
      fontSize: '16px',
      lineHeight: '1.5',
      // CRT effect
      backgroundImage: `repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 2px)`,
    }}>

      {/* TERMINAL CHROME */}
      <div style={{ background: '#111', borderBottom: `1px solid ${DIM_GREEN}`, padding: '6px 16px', display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
        <span style={{ color: DIM_GREEN }}>netko@terminal ~ $ bash netko.sh</span>
        <span style={{ color: DIM_GREEN }}>{time}</span>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '24px 16px' }}>

        {/* BOOT SEQUENCE */}
        <div style={{ marginBottom: '24px', color: DIM_GREEN, fontSize: '13px', lineHeight: '1.8' }}>
          <div>$ ./init --org n3tko --mode=oss</div>
          <div>Loading modules...</div>
          <div>✓ GitHub API connected</div>
          <div>✓ {loading ? 'Fetching repos...' : `${githubData?.publicRepos ?? '?'} repos indexed`}</div>
          <div>✓ {loading ? 'Counting stars...' : `${githubData?.totalStars ?? '?'} total stars`}</div>
        </div>

        {/* HEADLINE */}
        <div style={{ marginBottom: '32px' }}>
          <span style={{ color: DIM_GREEN }}>$ echo </span>
          <span style={{ color: GREEN, fontSize: '20px' }}>"{headline}"</span>
          <span style={{ animation: 'blink 1s step-end infinite', color: GREEN }}>█</span>
        </div>

        {/* PROJECTS GRID */}
        <div style={{ marginBottom: '24px' }}>
          <div style={{ color: DIM_GREEN, marginBottom: '8px', fontSize: '13px' }}>$ ls -la ./projects/</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {projects.map((p) => {
              const repo = getRepo(p.key)
              return (
                <AsciiBox key={p.key} title={p.cmd.toUpperCase()}>
                  <div style={{ fontSize: '13px', color: DIM_GREEN, marginBottom: '6px' }}>{p.desc}</div>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '13px', color: '#005510' }}>
                    {repo && <span>★ {repo.stars}</span>}
                    {repo && <span>⑂ {repo.forks}</span>}
                    {repo?.language && <span>[{repo.language}]</span>}
                  </div>
                  <div style={{ marginTop: '8px' }}>
                    <a href={repo?.url || `https://github.com/n3tko/${p.key}`} target="_blank" rel="noreferrer"
                      style={{ color: GREEN, textDecoration: 'none', fontSize: '13px' }}>
                      → github.com/n3tko/{p.key}
                    </a>
                  </div>
                </AsciiBox>
              )
            })}
          </div>
        </div>

        {/* CLASSIFIED / GLITCHCOVE */}
        <AsciiBox title="CLASSIFIED — GLITCHCOVE" style={{ marginBottom: '24px', borderColor: '#005510' }}>
          <div style={{ color: DIM_GREEN, fontSize: '13px', lineHeight: '1.8' }}>
            <div>STATUS: [████████░░] 80% complete</div>
            <div>TYPE: GAME</div>
            <div>ACCESS: RESTRICTED</div>
            <div>ETA: ██████████</div>
          </div>
        </AsciiBox>

        {/* OPERATOR */}
        {mainContributor && (
          <AsciiBox title={`OPERATOR — ${mainContributor.name?.toUpperCase() || 'PEJEDEV'}`} style={{ marginBottom: '24px' }}>
            <div style={{ fontSize: '13px', color: DIM_GREEN, lineHeight: '1.8' }}>
              {mainContributor.bio && <div>BIO: {mainContributor.bio}</div>}
              {mainContributor.location && <div>LOC: {mainContributor.location}</div>}
              <div>FOLLOWERS: {mainContributor.followers}</div>
              <a href={mainContributor.url} target="_blank" rel="noreferrer"
                style={{ color: GREEN, textDecoration: 'none' }}>
                → {mainContributor.url}
              </a>
            </div>
          </AsciiBox>
        )}

        {/* FOOTER */}
        <div style={{ color: DIM_GREEN, fontSize: '13px', borderTop: `1px solid ${DIM_GREEN}`, paddingTop: '12px', lineHeight: '1.8' }}>
          <div>$ whoami</div>
          <div>netko — open source collective</div>
          <div>$ exit 0</div>
          <div style={{ color: '#003308' }}>Process completed with exit code 0.</div>
        </div>
      </div>

      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  )
}
