type Props = {
  phase: string
  errorMessage?: string | null
}

export function StatusBanner({ phase, errorMessage }: Props) {
  return (
    <section>
      <h2>状態</h2>
      <div data-testid="status-banner-phase">{phase}</div>
      {errorMessage && <div data-testid="status-banner-error">{errorMessage}</div>}
    </section>
  )
}

