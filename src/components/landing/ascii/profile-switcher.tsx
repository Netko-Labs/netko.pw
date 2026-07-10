import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { AsciiProfileSwitcherProps, InterfaceProfile } from '@/types'
import { interfaceProfiles } from '../profiles'
import { AsciiRule } from './primitives'

export function AsciiProfileSwitcher({ profile, onChange }: AsciiProfileSwitcherProps) {
  return (
    <section aria-labelledby="ascii-profile-heading" className="ascii-profile-switcher">
      <div className="ascii-profile-switcher__heading">
        <span id="ascii-profile-heading">[ choose_brew_interface ]</span>
        <span>keys: 1—6</span>
      </div>
      <AsciiRule character="=" />
      <ToggleGroup
        aria-label="Choose an ASCII interface"
        className="ascii-profile-switcher__options"
        multiple={false}
        onValueChange={(values) => {
          const nextProfile = values.at(-1) as InterfaceProfile | undefined
          if (nextProfile) onChange(nextProfile)
        }}
        spacing={0}
        value={[profile]}
        variant="default"
      >
        {interfaceProfiles.map((option) => (
          <ToggleGroupItem
            aria-keyshortcuts={String(Number(option.index))}
            aria-label={`${option.name}: ${option.note}`}
            className="ascii-profile-option"
            key={option.id}
            value={option.id}
          >
            <span aria-hidden="true" className="ascii-profile-option__edge">
              {profile === option.id ? '>' : '['}
            </span>
            <span>{option.index}</span>
            <span className="ascii-profile-option__name">{option.name.toLowerCase()}</span>
            <span aria-hidden="true" className="ascii-profile-option__edge">
              {profile === option.id ? '<' : ']'}
            </span>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
      <AsciiRule character="=" />
    </section>
  )
}
