import { type FormEvent, useRef, useState } from 'react'
import { BrandMark, GITHUB_ORG_URL, RawMarkup, ThemeToggle, Wordmark } from '@/components/site'
import { BANNER_HTML } from '@/generated/brand-art'
import type { ChatMessage, ChatTopic, VariantProps } from '@/types'
import { ChatReply, TOPIC_PROMPT, TOPIC_TEXT, topicFor } from './chat-replies'

const TYPING_MS = 700

let messageId = 0
const message = (from: ChatMessage['from'], topic: ChatTopic, text: string): ChatMessage => ({
  id: messageId++,
  from,
  topic,
  text,
})

export function ChatVariant({ data, theme, onToggleTheme, expression }: VariantProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    message('term', 'intro', TOPIC_TEXT.intro),
  ])
  const [face, setFace] = useState<'typing' | 'happy' | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const asked = new Set(messages.map((entry) => entry.topic))
  const chips = (Object.keys(TOPIC_PROMPT) as (keyof typeof TOPIC_PROMPT)[]).filter(
    (topic) => !asked.has(topic),
  )

  const ask = (text: string, topic: ChatTopic) => {
    setMessages((current) => [...current, message('visitor', topic, text)])
    setFace('typing')
    window.setTimeout(() => {
      setMessages((current) => [...current, message('term', topic, TOPIC_TEXT[topic])])
      setFace(null)
    }, TYPING_MS)
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = inputRef.current?.value.trim() ?? ''
    if (!value) return
    if (inputRef.current) inputRef.current.value = ''
    ask(value, topicFor(value))
  }

  const pet = () => {
    setFace('happy')
    window.setTimeout(() => setFace(null), 1600)
  }

  const avatarFace = face === 'typing' ? 'loading' : face === 'happy' ? 'happy' : expression

  return (
    <div className="mx-auto flex min-h-dvh max-w-3xl flex-col px-4">
      <header className="sticky top-0 z-10 flex items-center gap-3 border-line border-b bg-bg/90 py-3 backdrop-blur">
        <BrandMark className="w-9" expression={avatarFace} size={36} />
        <div className="leading-tight">
          <p className="font-mono">term</p>
          <p className="font-mono text-muted text-xs">
            {face === 'typing' ? 'typing…' : 'online · netko.dev'}
          </p>
        </div>
        <span className="ml-auto">
          <ThemeToggle onToggle={onToggleTheme} theme={theme} />
        </span>
      </header>

      <div className="py-10">
        <Wordmark
          className="mx-auto block w-full max-w-[320px] [&_svg]:h-auto [&_svg]:w-full"
          width={320}
        />
      </div>

      <ol aria-live="polite" className="flex-1 space-y-4 pb-6">
        {messages.map((entry) =>
          entry.from === 'term' ? (
            <li className="flex gap-3" key={entry.id}>
              <BrandMark className="mt-1 w-8 shrink-0" size={32} />
              <div className="min-w-0 flex-1 rounded-brand rounded-tl-none border border-line bg-surface px-4 py-3">
                <p className="leading-relaxed">{entry.text}</p>
                <ChatReply data={data} topic={entry.topic} />
              </div>
            </li>
          ) : (
            <li className="flex justify-end" key={entry.id}>
              <p className="max-w-[80%] rounded-brand rounded-tr-none bg-fg px-4 py-2.5 font-mono text-bg text-sm">
                {entry.text}
              </p>
            </li>
          ),
        )}
        {face === 'typing' ? (
          <li className="pl-11 font-mono text-muted text-sm">term is typing…</li>
        ) : null}
      </ol>

      <div className="sticky bottom-0 space-y-3 border-line border-t bg-bg/95 py-4 backdrop-blur">
        <div className="flex flex-wrap gap-2">
          {chips.map((topic) => (
            <button
              className="rounded-brand border border-line px-3 py-1.5 font-mono text-xs hover:border-sakura"
              key={topic}
              onClick={() => ask(TOPIC_PROMPT[topic], topic)}
              type="button"
            >
              {TOPIC_PROMPT[topic]}
            </button>
          ))}
          <button
            className="rounded-brand border border-line px-3 py-1.5 font-mono text-xs hover:border-sakura"
            onClick={pet}
            type="button"
          >
            pet term
          </button>
        </div>
        <form
          className="flex items-center gap-2 rounded-brand border border-line bg-surface px-3 py-2"
          onSubmit={submit}
        >
          <span className="font-mono text-sakura">&gt;</span>
          <input
            aria-label="Ask term"
            className="flex-1 bg-transparent font-mono text-sm outline-none"
            placeholder="ask term anything"
            ref={inputRef}
          />
          <button className="font-mono text-muted text-xs" type="submit">
            send ↵
          </button>
        </form>
      </div>

      <footer className="space-y-4 py-12">
        <p className="text-center font-mono text-muted text-xs">
          — session ended ·{' '}
          <a className="underline" href={GITHUB_ORG_URL}>
            github.com/Netko-Labs
          </a>{' '}
          —
        </p>
        <RawMarkup as="pre" className="ascii" html={BANNER_HTML} />
      </footer>
    </div>
  )
}
