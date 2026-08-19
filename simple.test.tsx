import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

describe('Simple Test', () => {
  it('renders a simple message', () => {
    const { container } = render(<div data-testid="test-element">Hello Vitest</div>)
    expect(screen.getByTestId('test-element')).toHaveTextContent('Hello Vitest')
  })
})
