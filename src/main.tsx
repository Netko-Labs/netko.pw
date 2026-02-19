import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import "./index.css"
import App from "./App.tsx"

// Apply saved theme before first paint
const savedTheme = localStorage.getItem('netko-theme') ?? 'dark'
document.documentElement.setAttribute('data-theme', savedTheme)
document.documentElement.classList.toggle('dark', savedTheme !== 'light')

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
)
