import type { InterfaceProfile } from '@/types'

export type TerminalProfile = Extract<
  InterfaceProfile,
  'void' | 'phosphor' | 'amber' | 'ultraviolet' | 'paper'
>

export interface TerminalIteration {
  id: TerminalProfile
  handle: string
  cwd: string
  command: string
  response: string
  headline: [string, string]
  lede: string
  sceneLabel: string
  scene: string
  logs: string[]
  signoff: string
}

export const terminalIterations: Record<TerminalProfile, TerminalIteration> = {
  void: {
    id: 'void',
    handle: 'cat-mode',
    cwd: '~/netko-labs',
    command: 'netko start --with-cat',
    response: 'Cat attached to tty. Productivity may vary.',
    headline: ['hey, we make', 'small dev tools.'],
    lede: 'Open-source desktop, infrastructure, and data tooling from Bogotá. Built by humans, supervised by one very opinionated cat.',
    sceneLabel: 'resident process / cat',
    scene: ` /\\_/\\
( o.o )    ┌─────────────────┐
 > ^ <     │ bun run idea    │
 /|_|\\    └─────────────────┘
  / \\      status: curious`,
    logs: ['cat walked over keyboard', 'tests still pass somehow', 'keeping the changes'],
    signoff: 'brb, the cat needs the chair',
  },
  phosphor: {
    id: 'phosphor',
    handle: 'coffee.exe',
    cwd: '~/kitchen/build',
    command: 'brew coffee && bun run dev',
    response: 'Both processes are running. Please do not interrupt.',
    headline: ['first coffee.', 'then we ship.'],
    lede: 'Small tools, strong defaults, and a mug that has been reheated at least twice. Source is open; coffee status is best effort.',
    sceneLabel: 'hot reload / hotter drink',
    scene: `       (  (
        )  )
     ........
     |      |]
     \\      /
      \`----'
   coffee --watch`,
    logs: [
      'beans compiled successfully',
      'one warning: mug nearly empty',
      'hot reload feels personal',
    ],
    signoff: 'commit, sip, repeat',
  },
  amber: {
    id: 'amber',
    handle: 'pair-mode',
    cwd: '~/shared-brain',
    command: 'git pair --no-ego',
    response: 'Two keyboards connected. One good idea detected.',
    headline: ['good tools start', 'as side quests.'],
    lede: 'We poke at annoying problems until a useful little tool falls out. Pairing encouraged; pretending to know everything is not.',
    sceneLabel: 'two devs / one branch',
    scene: ` /\\_/\\          /\\_/\\
( o.o )        ( -.- )
 > ^ <   <=>    > ^ <
~/driver       ~/navigator
   shared branch: main-ish`,
    logs: ['driver says “tiny refactor”', 'navigator opens 14 tabs', 'rubber duck approves'],
    signoff: 'looks good from both keyboards',
  },
  ultraviolet: {
    id: 'ultraviolet',
    handle: 'ship-it',
    cwd: '~/almost-done',
    command: 'deploy --please-work',
    response: 'Checks are green. Confidence is cautiously high.',
    headline: ['it works here.', 'let’s ship it.'],
    lede: 'Public repos, practical experiments, and release notes written five minutes after the release. That still counts as documentation.',
    sceneLabel: 'release vehicle / probably stable',
    scene: `          /\\
         /  \\
        | == |
        |    |
       /|____|\\
        /_/\\_\\
         ||||
      ship --please`,
    logs: ['lint says fine', 'tests say fine', 'vibes say send it'],
    signoff: 'deployed before anyone changed their mind',
  },
  paper: {
    id: 'paper',
    handle: 'night-shift',
    cwd: '~/one-last-thing',
    command: 'focus --until=reasonable',
    response: 'Quiet mode enabled. Notifications went somewhere else.',
    headline: ['still awake.', 'might as well build.'],
    lede: 'Late-night experiments for desktop apps, local infrastructure, and data. The room is dark; the terminal is exactly bright enough.',
    sceneLabel: 'local time / too late',
    scene: `   /\\_/\\
  ( -.- )  zZ
  /|___|\\  ___________
   |   |  |  _>_    |
 __|___|__|_________|
    night build: calm`,
    logs: ['notifications muted', 'ambient playlist looped', 'one last thing became three'],
    signoff: 'save all, close lid, maybe sleep',
  },
}
