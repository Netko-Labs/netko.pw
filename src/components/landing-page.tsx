import { motion } from 'motion/react'
import { IconSparkles, IconDatabase, IconRadar, IconBrandApple } from '@tabler/icons-react'
import { useGitHubData } from '@/hooks/use-github-data'
import {
  FloatingElements,
  Header,
  Hero,
  ProjectCard,
  GlitchCoveCard,
  ContributorCard,
  StatsCards,
  TechStack,
  FunnyMetrics,
  Footer,
  containerVariants,
  projects,
} from './landing'

export function LandingPage() {
  const { githubData, mainContributor, loading, getRepo } = useGitHubData()

  const covenoteRepo = getRepo('covenote')
  const ankoRepo = getRepo('anko')
  const codeWhiskersRepo = getRepo('code-whiskers')
  const mizuRepo = getRepo('mizu')

  return (
    <div className="min-h-screen noise overflow-hidden flex flex-col">
      <FloatingElements />

      <div className="mx-auto max-w-5xl px-4 py-6 sm:py-10 relative flex-1 flex flex-col w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-4 flex-1 flex flex-col"
        >
          <Header githubData={githubData} />

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 flex-1">
            <Hero />

            <ProjectCard
              repo={covenoteRepo}
              fallbackUrl={`https://github.com/n3tko/${projects.covenote.name.toLowerCase()}`}
              fallbackDescription={projects.covenote.fallbackDescription}
              fallbackTags={projects.covenote.fallbackTags}
              icon={<IconSparkles className="text-primary" size={18} />}
              color="primary"
            />

            <ProjectCard
              repo={ankoRepo}
              fallbackUrl={`https://github.com/n3tko/${projects.anko.name.toLowerCase()}`}
              fallbackDescription={projects.anko.fallbackDescription}
              fallbackTags={projects.anko.fallbackTags}
              icon={<IconDatabase className="text-accent" size={18} />}
              color="accent"
            />

            <ProjectCard
              repo={codeWhiskersRepo}
              fallbackUrl="https://github.com/n3tko/code-whiskers"
              fallbackDescription={projects['code-whiskers'].fallbackDescription}
              fallbackTags={projects['code-whiskers'].fallbackTags}
              icon={<IconRadar className="text-red-400" size={16} />}
              color="red"
              size="small"
            />

            <ProjectCard
              repo={mizuRepo}
              fallbackUrl="https://github.com/n3tko/mizu"
              fallbackDescription={projects.mizu.fallbackDescription}
              fallbackTags={projects.mizu.fallbackTags}
              icon={<IconBrandApple className="text-cyan-400" size={16} />}
              color="cyan"
              size="small"
            />

            <GlitchCoveCard />

            <ContributorCard contributor={mainContributor} />

            <StatsCards githubData={githubData} loading={loading} />

            <TechStack />

            <FunnyMetrics />
          </div>

          <Footer />
        </motion.div>
      </div>
    </div>
  )
}
