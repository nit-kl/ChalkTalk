export interface ScriptGenerationResult {
  yaml: string
  requestId: string
}

const fallbackYaml = `title: "Sample"
scenes:
  - id: 1
    background: "blackboard"
    text_on_board: "はじめに"
    dialogue: "テーマの説明を始めます。"
    duration: 4
    characters:
      - name: "sensei"
        position: "right"
        expression: "smile"
`

export async function generateScript(theme: string): Promise<ScriptGenerationResult> {
  if (!theme.trim()) throw new Error('theme is empty')
  // U2未実装の間はU1側でスタブ応答を返す。
  return Promise.resolve({
    yaml: fallbackYaml.replace('はじめに', theme.trim()),
    requestId: `mock-${Date.now()}`,
  })
}

