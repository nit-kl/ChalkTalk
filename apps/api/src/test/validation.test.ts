import { describe, expect, it } from 'vitest'
import { validateRequestBody } from '../domain/validation'
import { validateGeneratedYaml } from '../domain/yaml-contract'

describe('validateRequestBody', () => {
  it('accepts valid input', () => {
    const result = validateRequestBody({ theme: '連立方程式', locale: 'ja-JP' })
    expect(result.isValid).toBe(true)
  })

  it('rejects missing theme', () => {
    const result = validateRequestBody({ theme: '', locale: 'ja-JP' })
    expect(result.isValid).toBe(false)
    expect(result.issues[0]?.code).toBe('THEME_REQUIRED')
  })
})

describe('validateGeneratedYaml', () => {
  it('accepts minimum yaml contract', () => {
    const yaml = `title: "ok"
scenes:
  - id: 1
    background: "b"
    text_on_board: "t"
    dialogue: "d"`
    const result = validateGeneratedYaml(yaml)
    expect(result.isValid).toBe(true)
  })

  it('rejects missing scenes', () => {
    const result = validateGeneratedYaml('title: "bad"')
    expect(result.isValid).toBe(false)
  })
})
