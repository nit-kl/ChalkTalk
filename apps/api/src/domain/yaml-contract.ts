import type { ValidationResult } from './types'

export function validateGeneratedYaml(yamlText: string): ValidationResult {
  if (!yamlText.trim()) {
    return fail('YAML_EMPTY', 'Generated YAML is empty.')
  }

  const hasTitle = /^\s*title:\s*.+$/m.test(yamlText)
  const hasScenes = /^\s*scenes:\s*$/m.test(yamlText)
  const hasFirstScene = /^\s*-\s*id:\s*\d+/m.test(yamlText)

  const issues = []
  if (!hasTitle) issues.push({ code: 'YAML_TITLE_MISSING', message: 'title field is required.' })
  if (!hasScenes) issues.push({ code: 'YAML_SCENES_MISSING', message: 'scenes field is required.' })
  if (!hasFirstScene) issues.push({ code: 'YAML_SCENE_ITEM_MISSING', message: 'at least one scene id is required.' })

  return { isValid: issues.length === 0, issues }
}

function fail(code: string, message: string): ValidationResult {
  return { isValid: false, issues: [{ code, message }] }
}
