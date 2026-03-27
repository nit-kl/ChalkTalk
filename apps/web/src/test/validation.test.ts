import { describe, expect, it } from 'vitest'
import { validateTheme, validateYaml } from '../domain/validation'

describe('validation', () => {
  it('theme required', () => {
    const result = validateTheme('')
    expect(result.isValid).toBe(false)
  })

  it('yaml with scenes is valid', () => {
    const yaml = `scenes:\n  - id: 1\n    background: blackboard\n    dialogue: ok`
    const result = validateYaml(yaml)
    expect(result.isValid).toBe(true)
  })
})

