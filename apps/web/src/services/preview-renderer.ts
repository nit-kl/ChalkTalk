import type { SceneViewModel } from '../domain/types'

export function buildPreviewText(scene: SceneViewModel): string {
  const chars = scene.characters.map((c) => `${c.name}(${c.expression})`).join(', ')
  return `Scene ${scene.sceneId} | bg=${scene.backgroundKey} | ${chars} | ${scene.dialogue}`
}

