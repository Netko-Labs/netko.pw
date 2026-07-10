import { IconArrowUpRight } from '@tabler/icons-react'

export function PageFooter() {
  return (
    <footer className="page-footer">
      <p>
        <span>NETKO LABS</span>
        <span>© {new Date().getFullYear()}</span>
        <span>ALL RIGHTS REVERSED</span>
      </p>
      <p>
        <span>Built in Bogotá</span>
        <a href="https://x.com/pejedev" rel="noreferrer" target="_blank">
          @pejedev <IconArrowUpRight aria-hidden="true" />
        </a>
      </p>
    </footer>
  )
}
