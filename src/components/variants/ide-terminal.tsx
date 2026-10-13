import { type FormEvent, useRef, useState } from 'react'
import type { IdeTerminalProps, TerminalLine } from '@/types'

const HELP = 'commands: ls · open <file> · cat principles.md · pet · theme · clear · help'

let lineId = 0
const line = (kind: TerminalLine['kind'], text: string): TerminalLine => ({
  id: lineId++,
  kind,
  text,
})

export function IdeTerminal({ files, onOpen, onPet, onToggleTheme }: IdeTerminalProps) {
  const [history, setHistory] = useState<TerminalLine[]>([line('output', `term v0.1 · ${HELP}`)])
  const inputRef = useRef<HTMLInputElement>(null)

  const respond = (raw: string): string[] => {
    const [command, ...rest] = raw.trim().toLowerCase().split(/\s+/)
    const arg = rest.join(' ')
    const match = files.find((file) => file.path.toLowerCase().includes(arg) && arg.length > 0)
    switch (command) {
      case 'help':
        return [HELP]
      case 'ls':
        return [files.map((file) => file.path).join('   ')]
      case 'open':
      case 'cat':
        if (!match) return [`no file matches "${arg}". try ls`]
        onOpen(match.path)
        return [`opened ${match.path}`]
      case 'pet':
        onPet()
        return ['^.^  purr']
      case 'theme':
        onToggleTheme()
        return ['theme switched']
      default:
        return [`${command}: not a command. ${HELP}`]
    }
  }

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const value = inputRef.current?.value ?? ''
    if (!value.trim()) return
    if (inputRef.current) inputRef.current.value = ''
    if (value.trim() === 'clear') return setHistory([])
    const output = respond(value).map((text) => line('output', text))
    setHistory((current) => [...current.slice(-30), line('input', value), ...output])
  }

  return (
    <div className="flex h-full flex-col bg-sumi font-mono text-kami text-sm">
      <p className="border-yoru border-b px-4 py-1.5 text-fog text-xs">terminal</p>
      <div aria-live="polite" className="flex-1 space-y-1 overflow-y-auto px-4 py-3">
        {history.map((entry) => (
          <p className={entry.kind === 'input' ? '' : 'text-fog'} key={entry.id}>
            {entry.kind === 'input' ? <span className="text-sakura">$ </span> : null}
            {entry.text}
          </p>
        ))}
      </div>
      <form className="flex items-center gap-2 border-yoru border-t px-4 py-2" onSubmit={submit}>
        <span className="text-sakura">$</span>
        <input
          aria-label="Terminal command"
          autoComplete="off"
          className="flex-1 bg-transparent outline-none placeholder:text-fog"
          placeholder="try: open anko"
          ref={inputRef}
          spellCheck={false}
        />
      </form>
    </div>
  )
}
