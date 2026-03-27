import { SceneCanvas } from './SceneCanvas'
import { SceneNavigator } from './SceneNavigator'

type Props = {
  sceneCount: number
  selectedIndex: number
  previewText: string
  onSelectScene: (idx: number) => void
}

export function PreviewSection({
  sceneCount,
  selectedIndex,
  previewText,
  onSelectScene,
}: Props) {
  return (
    <section>
      <h2>プレビュー</h2>
      <SceneNavigator sceneCount={sceneCount} selectedIndex={selectedIndex} onSelect={onSelectScene} />
      <SceneCanvas text={previewText} />
    </section>
  )
}

