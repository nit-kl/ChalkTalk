type Props = {
  sceneCount: number
  selectedIndex: number
  onSelect: (idx: number) => void
}

export function SceneNavigator({ sceneCount, selectedIndex, onSelect }: Props) {
  if (sceneCount === 0) return null
  return (
    <section>
      <h3>シーン選択</h3>
      <div>
        {Array.from({ length: sceneCount }).map((_, idx) => (
          <button
            key={idx}
            data-testid={`scene-navigator-scene-${idx}-button`}
            onClick={() => onSelect(idx)}
            aria-pressed={selectedIndex === idx}
          >
            {idx + 1}
          </button>
        ))}
      </div>
    </section>
  )
}

