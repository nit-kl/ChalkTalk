type Props = {
  theme: string
  canGenerate: boolean
  onThemeChange: (value: string) => void
  onGenerate: () => void
}

export function ThemeInputSection({ theme, canGenerate, onThemeChange, onGenerate }: Props) {
  return (
    <section>
      <h2>テーマ入力</h2>
      <input
        data-testid="theme-input-section-input"
        value={theme}
        onChange={(e) => onThemeChange(e.target.value)}
        placeholder="例: 量子コンピュータとは"
      />
      <button
        data-testid="theme-input-section-generate-button"
        onClick={onGenerate}
        disabled={!canGenerate}
      >
        YAMLを生成
      </button>
    </section>
  )
}

