type Props = {
  yaml: string
  onYamlChange: (value: string) => void
}

export function ScriptEditorSection({ yaml, onYamlChange }: Props) {
  return (
    <section>
      <h2>YAMLエディタ</h2>
      <textarea
        data-testid="script-editor-section-textarea"
        value={yaml}
        onChange={(e) => onYamlChange(e.target.value)}
        rows={12}
      />
    </section>
  )
}

