import { useState } from 'react'
import { LandingPage } from './components/landing-page'
import { BrutalistDesign, TerminalDesign, ArtDecoDesign, EditorialDesign, getSavedDesign, saveDesign, type DesignId } from './designs'
import { DesignSwitcher } from './components/design-switcher'

export function App() {
  const [design, setDesign] = useState<DesignId>(getSavedDesign)

  const handleChange = (id: DesignId) => {
    saveDesign(id)
    setDesign(id)
  }

  const renderDesign = () => {
    switch (design) {
      case 'brutalist':  return <BrutalistDesign />
      case 'terminal':   return <TerminalDesign />
      case 'artdeco':    return <ArtDecoDesign />
      case 'editorial':  return <EditorialDesign />
      default:           return <LandingPage />
    }
  }

  return (
    <>
      {renderDesign()}
      <DesignSwitcher current={design} onChange={handleChange} />
    </>
  )
}

export default App
