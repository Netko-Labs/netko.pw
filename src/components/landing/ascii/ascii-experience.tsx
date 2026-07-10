import type { DesignLayoutProps } from '@/components/landing/designs/design-layout-props'
import { AsciiAfterHoursBoard } from './after-hours-board'
import { AsciiShell } from './ascii-shell'

export function AsciiExperience(props: DesignLayoutProps) {
  return (
    <AsciiShell error={props.error} onProfileChange={props.onProfileChange} profile={props.profile}>
      <AsciiAfterHoursBoard {...props} />
    </AsciiShell>
  )
}
