type Props = {
  text: string
}

export function SceneCanvas({ text }: Props) {
  return (
    <div data-testid="scene-canvas-output" className="canvas-like">
      {text || 'プレビュー対象がありません'}
    </div>
  )
}

