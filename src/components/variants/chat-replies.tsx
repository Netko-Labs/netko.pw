import { FEATURED_TOOLS, otherRepos, PRINCIPLES, StatusBadge, toolLinks } from '@/components/site'
import type { ChatReplyProps, ChatTopic } from '@/types'

export const TOPIC_PROMPT: Record<Exclude<ChatTopic, 'intro' | 'unknown'>, string> = {
  tools: 'what do you build?',
  code: 'show me the code',
  how: 'how do you work?',
  cat: 'who are you, cat?',
}

export const TOPIC_TEXT: Record<ChatTopic, string> = {
  intro:
    'hi, i’m term. netko is an open-source lab: we hack on LLMs for fun and ship the tools that fall out. ask me something.',
  tools: 'six tools so far. most started as a weekend poke at a model:',
  code: 'flagships are above. here’s everything else on github, freshest first:',
  how: 'three rules decide what ships:',
  cat: 'a chat bubble with ears, drawn the way a terminal would. the > is the eye that’s typing, the pink square is the eye that’s watching. pet me with the button below the thread.',
  unknown: 'i only know a few tricks so far. try one of the chips.',
}

const KEYWORDS: [ChatTopic, RegExp][] = [
  ['tools', /tool|build|make|product|ship/],
  ['code', /code|repo|github|source|open/],
  ['how', /how|work|rule|principle|why/],
  ['cat', /cat|who|you|term|mascot/],
]

export function topicFor(input: string): ChatTopic {
  const text = input.toLowerCase()
  return KEYWORDS.find(([, pattern]) => pattern.test(text))?.[0] ?? 'unknown'
}

export function ChatReply({ topic, data }: ChatReplyProps) {
  if (topic === 'tools') {
    return (
      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        {FEATURED_TOOLS.map((tool) => (
          <div className="rounded-brand border border-line bg-bg p-3" key={tool.name}>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono">{tool.name}</span>
              <StatusBadge status={tool.status} />
            </div>
            <p className="mt-1 text-muted text-sm">{tool.tagline}</p>
            <p className="mt-2 flex gap-3 font-mono text-xs">
              {toolLinks(tool).map((link) => (
                <a
                  className="underline decoration-sakura underline-offset-4"
                  href={link.href}
                  key={link.kind}
                >
                  {link.label} ↗
                </a>
              ))}
            </p>
          </div>
        ))}
      </div>
    )
  }
  if (topic === 'code') {
    return (
      <ul className="mt-3 divide-y divide-line rounded-brand border border-line bg-bg font-mono text-sm">
        {otherRepos(data.repos).map((repo) => (
          <li className="px-3 py-2" key={repo.name}>
            <a className="underline decoration-line underline-offset-4" href={repo.url}>
              {repo.name}
            </a>
          </li>
        ))}
      </ul>
    )
  }
  if (topic === 'how') {
    return (
      <ol className="mt-3 space-y-2">
        {PRINCIPLES.map((principle) => (
          <li
            className="rounded-brand border-sakura border-l-2 bg-bg px-3 py-2 text-sm"
            key={principle.name}
          >
            <span className="font-mono">{principle.name}</span>
            <span className="block text-muted">{principle.line}</span>
          </li>
        ))}
      </ol>
    )
  }
  return null
}
