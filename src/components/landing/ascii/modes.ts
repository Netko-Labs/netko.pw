import type { AsciiMode, InterfaceProfile } from '@/types'

export const asciiModes: Record<InterfaceProfile, AsciiMode> = {
  void: {
    id: 'void',
    label: 'brew bios',
    slug: 'brew-bios',
    command: 'boot /dev/brewer --self-test',
    output: 'POST passed. mug bus found. optimism checksum acceptable.',
    headline: ['power on.', 'pour over.'],
    lede: 'The morning boot screen for small open-source tools. Hardware is optional; coffee, curiosity, and a blinking cursor are not.',
    art: `+----------------------------------+
| /\\_/\\      KERNEL GARDEN         |
|( o.o )       _\\|/_    [ online ] |
| > ^ <       /_o_o_\\   sprout.pid |
|  /|\\       .--|--.   build: green|
| /_|_\\      |__|__|   bugs: mulch |
+----------------------------------+`,
    statusLines: [
      'coffee controller passed POST',
      'mounted hot mug at /dev/cup0',
      'handing control to curious humans',
    ],
    signoff: 'safe to remove mug after shutdown',
  },
  phosphor: {
    id: 'phosphor',
    label: 'coffee daemon',
    slug: 'coffee-daemon',
    command: 'brew --watch | bun run dev',
    output: 'mug warm. daemon alert. ideas slightly over-extracted.',
    headline: ['the build is steeping.', 'give it one more minute.'],
    lede: 'Small tools, strong defaults, and a mug reheated at least twice. Source is open; caffeine telemetry remains best effort.',
    art: `+----------------------------------+
|         (  (                     |
|          )  )     HOT RELOAD     |
|       .--------.   ..........    |
|       |        |]  :  READY :    |
|       \\        /   :........:    |
|        \`------'    coffee --watch|
+----------------------------------+`,
    statusLines: [
      'beans compiled without warnings',
      'mug mounted successfully at /dev/cup',
      'hot reload smells oddly convincing',
    ],
    signoff: 'commit, sip, pretend that was the plan',
  },
  amber: {
    id: 'amber',
    label: 'roaster rack',
    slug: 'roaster-rack',
    command: 'rackctl heat --beans=curious',
    output: 'three drums spinning. one idea smells almost ready.',
    headline: ['rack-mounted beans.', 'small-batch software.'],
    lede: 'A tiny machine room where repositories roast in public. Watch the heat, listen for first crack, and pull a build when it smells useful.',
    art: `+----------------------------------+
|         .---|---.    TX: NETKO   |
|    )))) |  CAT  | ((((           |
| /\\_/\\   '---+---'   o---[ API ]  |
|( o.o )      |       +---[ DATA ] |
| > ^ <   o---+---o   '---[ CLI ]  |
+----------------------------------+`,
    statusLines: [
      'drum one reached first crack',
      'cooling fan negotiated a truce',
      'release batch smells suspiciously good',
    ],
    signoff: 'let the release rest before serving',
  },
  ultraviolet: {
    id: 'ultraviolet',
    label: 'cafe tmux',
    slug: 'cafe-tmux',
    command: 'tmux new-session -s cafe',
    output: 'four panes open. the cat claimed the warm one.',
    headline: ['one terminal.', 'a whole little cafe.'],
    lede: 'Repos, notes, logs, and a tiny coffee bar tiled into one terminal session. Split the work; keep the conversation casual.',
    art: `+----------------------------------+
|[x] terminal        [x] snacks    |
|+----------------+ +-------------+|
|| $ bun dev      | | /\\_/\\ focus ||
|| > ready :5173  | |( o.o ) maybe||
|+----------------+ +-------------+|
| [repo] [music] [coffee]  02:17   |
+----------------------------------+`,
    statusLines: [
      'pane zero is taking orders',
      'pane one is pretending to be focused',
      'status bar says another cup is fine',
    ],
    signoff: 'detach gently, the cafe stays open',
  },
  paper: {
    id: 'paper',
    label: 'bean pipe',
    slug: 'bean-pipe',
    command: 'brewctl pipe ./ideas --to=ship',
    output: 'beans flowing. backpressure is mostly emotional.',
    headline: ['ideas in.', 'useful tools out.'],
    lede: 'A visible brew pipeline for open-source side quests: sort the beans, route the work, watch the build drip into something people can use.',
    art: `+----------------------------------+
|       !! BOSS: PROD BUG !!       |
| SCORE 0042              LIFE 03  |
| /\\_/\\      * [FLAKE] *      /\\   |
|( o.o )   --==>  {??}       /__\\  |
| > ^ <    [ PRESS RUN ]   HP: 01  |
+----------------------------------+`,
    statusLines: [
      'raw idea entered hopper zero',
      'tests filtered the bitter bits',
      'fresh build reached the serving port',
    ],
    signoff: 'close the valve, wipe the counter',
  },
  zine: {
    id: 'zine',
    label: 'after hours',
    slug: 'after-hours',
    command: 'git clone curiosity && bun run idea',
    output: 'if it helps, ship it. if not, we still learned something.',
    headline: ['we make small tools.', 'mostly for fun.'],
    lede: 'Netko Labs is a tiny workshop for open-source developer tools, odd experiments, and software we want to exist.',
    art: `+----------------------------------+
| CTRL+MAKE        ISSUE_06        |
| .------------.  +-------------+  |
| | /\\_/\\  YO |  | CODE / CATS |   |
| |( o.o )    |  | COFFEE / OSS |  |
| | > ^ <     |  |       *       | |
| '------------'  +-------------+  |
+---------- tear here -------------+`,
    statusLines: [
      'rain tapping on terminal glass',
      'last train left without the deploy',
      'cat approved the quiet patch',
    ],
    signoff: 'OSS for fun. useful is a bonus.',
  },
  logbook: {
    id: 'logbook',
    label: 'git logbook',
    slug: 'git-logbook',
    command: 'git log --all --decorate --coffee',
    output: 'history loaded. the mysterious commits remain mysterious.',
    headline: ['follow the commits.', 'ignore the timestamps.'],
    lede: 'A field log of tiny releases, brave refactors, and commit messages that made perfect sense at the time.',
    art: `+----------------------------------+
| * 9f31c2 ship the tiny thing     |
| |\\                               |
| | * c0ffee refill dependencies   |
| * | a11ce5 cat approved patch    |
| |/                               |
| * 000001 initial optimism        |
+----------------------------------+`,
    statusLines: [
      'branch is two coffees ahead',
      'blame points to past us',
      'rebase completed without drama',
    ],
    signoff: 'future us can squash it',
  },
  circuit: {
    id: 'circuit',
    label: 'repo circuit',
    slug: 'repo-circuit',
    command: 'trace ./repos --signal=open',
    output: 'all nodes responding. one side project is humming loudly.',
    headline: ['connect the weird bits.', 'see what lights up.'],
    lede: 'Apps, services, and data experiments wired together with open source, clear interfaces, and a healthy distrust of magic.',
    art: `+----------------------------------+
| o------[ API ]------o            |
| |                   |            |
|[CLI]---o---[ NETKO ]+---[DATA]   |
|       / \\          |             |
|  /\\_/\\  o------[ DESKTOP ]------o|
| ( o.o )  signal: purr            |
+----------------------------------+`,
    statusLines: [
      'all nodes say hello',
      'latency is basically a shrug',
      'cat found the warm server',
    ],
    signoff: 'leave the useful wires exposed',
  },
  desktop: {
    id: 'desktop',
    label: 'tiny desktop',
    slug: 'tiny-desktop',
    command: 'startx --layout=casual',
    output: 'desktop ready. windows arranged approximately.',
    headline: ['move fast.', 'tile your windows.'],
    lede: 'A pocket-sized workspace for repos, terminals, docs, and the playlist doing most of the actual project management.',
    art: `+----------------------------------+
|[x] terminal        [x] notes     |
|+----------------+ +-------------+|
|| $ bun dev      | | - fix bug   ||
|| > ready :5173  | | - pet cat   ||
|+----------------+ +-------------+|
| [repo] [music] [coffee]  02:17   |
+----------------------------------+`,
    statusLines: [
      'four workspaces, three are useful',
      'playlist is carrying the sprint',
      'window focus: mostly',
    ],
    signoff: 'alt-tab responsibly',
  },
  arcade: {
    id: 'arcade',
    label: 'ascii arcade',
    slug: 'ascii-arcade',
    command: 'insert-coin --credits=coffee',
    output: 'player one ready. final boss is a flaky test.',
    headline: ['press start.', 'build something odd.'],
    lede: 'Open-source side quests with extra lives, tiny high scores, and just enough chaos to make the terminal fun again.',
    art: `+----------------------------------+
|           NETKO ARCADE           |
| SCORE 0042               LIFE 03 |
|       /\\_/\\        *        /\\   |
|      ( o.o )    [BUG]     /\\     |
|       > ^ <   --==>      /__\\    |
|      PLAYER 1      [ PRESS RUN ] |
+----------------------------------+`,
    statusLines: [
      'combo: code plus coffee',
      'bonus round unlocked by accident',
      'high score saved locally',
    ],
    signoff: 'gg, one more run',
  },
}
