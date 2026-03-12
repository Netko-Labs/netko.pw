export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Horizontal ruled lines – terminal paper */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(0deg, transparent 95%, var(--ruled-line-color) 95%)`,
          backgroundSize: '100% 20px',
          opacity: 'var(--ruled-line-opacity)',
        }}
      />
    </div>
  )
}
