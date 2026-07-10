import { useCallback, useEffect, useState } from 'react'
import { interfaceProfiles } from '@/components/landing/profiles'
import type { InterfaceProfile } from '@/types'

const STORAGE_KEY = 'netko-interface-profile-v4'
const profileIds = new Set(interfaceProfiles.map((profile) => profile.id))

function getStoredProfile(): InterfaceProfile {
  if (typeof window === 'undefined') return 'zine'

  const stored = window.localStorage.getItem(STORAGE_KEY)
  return profileIds.has(stored as InterfaceProfile) ? (stored as InterfaceProfile) : 'zine'
}

export function useTheme() {
  const [profile, setProfileState] = useState<InterfaceProfile>(getStoredProfile)

  useEffect(() => {
    const selected = interfaceProfiles.find((item) => item.id === profile)
    const root = document.documentElement

    root.dataset.profile = profile
    root.classList.toggle('dark', selected?.dark ?? true)
    root.classList.toggle('light', !(selected?.dark ?? true))
    root.style.colorScheme = selected?.dark ? 'dark' : 'light'
    window.localStorage.setItem(STORAGE_KEY, profile)

    const themeMeta = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]')
    themeMeta?.setAttribute('content', selected?.dark ? '#000000' : '#f2f0e9')
  }, [profile])

  const setProfile = useCallback((nextProfile: InterfaceProfile) => {
    setProfileState(nextProfile)
  }, [])

  return { profile, setProfile }
}
