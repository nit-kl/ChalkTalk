import { describe, expect, it } from 'vitest'
import { useAppStore } from '../state/app-store'

describe('app-store', () => {
  it('updates theme', () => {
    useAppStore.getState().setTheme('abc')
    expect(useAppStore.getState().theme).toBe('abc')
  })
})

