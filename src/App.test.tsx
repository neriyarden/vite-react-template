import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'

import App from './App'
import { ThemeProvider } from './providers/ThemeProvider'

function renderWithProviders(ui: React.ReactElement) {
  return render(<ThemeProvider>{ui}</ThemeProvider>)
}

describe('App', () => {
  it('renders the main heading', () => {
    renderWithProviders(<App />)
    expect(
      screen.getByText('Vite + React + TypeScript Template')
    ).toBeInTheDocument()
  })

  it('renders the description', () => {
    renderWithProviders(<App />)
    expect(
      screen.getByText('Interview-ready starter template')
    ).toBeInTheDocument()
  })
})
