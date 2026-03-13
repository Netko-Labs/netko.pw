import { useState } from 'react'
import { motion } from 'motion/react'
import { useGitHubData } from '@/hooks/use-github-data'
import { useTheme } from '@/hooks/use-theme'
import { trackEvent } from '@/hooks/use-umami'
import {
  BootSequence,
  FloatingElements,
  Header,
  Hero,
  ProjectCard,
  GlitchCoveCard,
  ContributorCard,
  StatsCards,
  TechStack,
  FunnyMetrics,
  ActivityLog,
  StatusBar,
  Footer,
  containerVariants,
  projects,
} from './landing'

export function LandingPage() {
  const [booted, setBooted] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { githubData, mainContributor, loading, getRepo } = useGitHubData()

  const covenoteRepo = getRepo('covenote')
  const ankoRepo = getRepo('anko')
  const codeWhiskersRepo = getRepo('code-whiskers')
  const mizuRepo = getRepo('mizu')

  return (
    <>
      {!booted && <BootSequence onComplete={() => { setBooted(true); trackEvent('boot-complete') }} />}

      <div className="min-h-screen scanlines crt-flicker noise overflow-hidden flex flex-col">
        <FloatingElements />

        <div className="mx-auto max-w-4xl px-4 py-4 sm:py-8 relative flex-1 flex flex-col w-full z-10">
          {booted && (
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="show"
              className="space-y-1.5 flex-1 flex flex-col"
            >
              <Header githubData={githubData} onToggleTheme={toggleTheme} theme={theme} />

              <div className="grid grid-cols-2 lg:grid-cols-4 gap-1.5 flex-1">
                <Hero />

                <ProjectCard
                  repo={covenoteRepo}
                  fallbackUrl={`https://github.com/Netko-Labs/${projects.covenote.name.toLowerCase()}`}
                  fallbackDescription={projects.covenote.fallbackDescription}
                  fallbackTags={projects.covenote.fallbackTags}
                />

                <ProjectCard
                  repo={ankoRepo}
                  fallbackUrl={`https://github.com/Netko-Labs/${projects.anko.name.toLowerCase()}`}
                  fallbackDescription={projects.anko.fallbackDescription}
                  fallbackTags={projects.anko.fallbackTags}
                />

                <ProjectCard
                  repo={codeWhiskersRepo}
                  fallbackUrl="https://github.com/Netko-Labs/code-whiskers"
                  fallbackDescription={projects['code-whiskers'].fallbackDescription}
                  fallbackTags={projects['code-whiskers'].fallbackTags}
                  size="small"
                />

                <ProjectCard
                  repo={mizuRepo}
                  fallbackUrl="https://github.com/Netko-Labs/mizu"
                  fallbackDescription={projects.mizu.fallbackDescription}
                  fallbackTags={projects.mizu.fallbackTags}
                  size="small"
                />

                <GlitchCoveCard />

                <ContributorCard contributor={mainContributor} />

                <StatsCards githubData={githubData} loading={loading} />

                <TechStack />

                <FunnyMetrics />

                <ActivityLog />
              </div>

              <Footer />
            </motion.div>
          )}
        </div>

        {booted && <StatusBar />}
      </div>
    </>
  )
}
