import { fireEvent, render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from '../App'

describe('App', () => {
  it('renders input and generate button', () => {
    render(<App />)
    expect(screen.getByTestId('theme-input-section-input')).toBeInTheDocument()
    expect(screen.getByTestId('theme-input-section-generate-button')).toBeInTheDocument()
  })

  it('allows yaml edit and shows validation state', () => {
    render(<App />)
    fireEvent.change(screen.getByTestId('script-editor-section-textarea'), {
      target: { value: 'scenes:\n  - id: 1\n    background: blackboard\n    dialogue: ok' },
    })
    expect(screen.getByTestId('validation-panel-status')).toHaveTextContent('検証OK')
  })
})

