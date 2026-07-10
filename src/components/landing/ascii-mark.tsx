import { cn } from '@/lib/utils'
import type { InterfaceProfile } from '@/types'

const marks: Record<InterfaceProfile, string> = {
  void: `              /\\
             /  \\
            / /\\ \\
           / /  \\ \\
__________/ /____\\ \\__________
         /__________\\
            NETKO`,
  phosphor: `           /\\
          /  \\
    _____/ /\\ \\_____
   |    / /  \\ \\    |
---+---/_/____\\_\\---+---
       NETKO/LABS`,
  amber: `NETKO(1)                  MANUAL
          +------+
----------|  /\\  |----------
          | /__\\ |
          +------+`,
  ultraviolet: `\\             |             /
 \\            |            /
  \\        ___|___        /
---\\------/  / \\  \\------/---
    \\    /__/___\\__\\    /
     \\      NETKO      /`,
  paper: `A-01         /\\
------------/  \\------------
           / /\\ \\
----------/_/  \\_\\-----------
          NETKO LABS`,
  zine: ` /\\_/\\  CTRL+MAKE
( o.o ) ----------
 > ^ <   ISSUE 06`,
  logbook: `* a173f0 small tools
|
* coffee: tracked`,
  circuit: `o-----o-----o
      |
o----NETKO---o`,
  desktop: `[ terminal ] [ repos ]
     \\   /
    [ netko ]`,
  arcade: `+-------------+
| NETKO READY |
|  /\\_/\\    |
+-------------+`,
}

interface AsciiMarkProps {
  variant: InterfaceProfile
  className?: string
}

export function AsciiMark({ variant, className }: AsciiMarkProps) {
  return (
    <pre aria-hidden="true" className={cn('ascii-mark', `ascii-mark--${variant}`, className)}>
      {marks[variant]}
    </pre>
  )
}
