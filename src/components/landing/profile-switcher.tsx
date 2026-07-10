import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { InterfaceProfile } from '@/types'
import { interfaceProfiles } from './profiles'

interface ProfileSwitcherProps {
  profile: InterfaceProfile
  onChange: (profile: InterfaceProfile) => void
  layout?: 'grid' | 'tabs' | 'rail' | 'tape'
  label?: string
}

export function ProfileSwitcher({
  profile,
  onChange,
  layout = 'grid',
  label = 'DESIGN ITERATION',
}: ProfileSwitcherProps) {
  return (
    <section aria-labelledby="profile-heading" className="profile-switcher" data-layout={layout}>
      <div className="profile-switcher__label">
        <span id="profile-heading">{label}</span>
        <span>PRESS 1—6</span>
      </div>

      <ToggleGroup
        aria-label="Choose an interface profile"
        className="profile-switcher__options"
        multiple={false}
        onValueChange={(values) => {
          const nextProfile = values.at(-1) as InterfaceProfile | undefined
          if (nextProfile) onChange(nextProfile)
        }}
        orientation={layout === 'rail' ? 'vertical' : 'horizontal'}
        spacing={0}
        value={[profile]}
        variant="outline"
      >
        {interfaceProfiles.map((option) => (
          <ToggleGroupItem
            aria-label={`${option.name}: ${option.note}`}
            className="profile-option"
            data-profile-option={option.id}
            key={option.id}
            value={option.id}
          >
            <span className="profile-option__index">{option.index}</span>
            <span className="profile-option__copy">
              <span className="profile-option__name">{option.name}</span>
              <span className="profile-option__note">{option.note}</span>
            </span>
            <span
              aria-hidden="true"
              className="profile-option__swatch"
              style={{ backgroundColor: option.accent }}
            />
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </section>
  )
}
