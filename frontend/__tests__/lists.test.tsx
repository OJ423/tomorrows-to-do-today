import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Page from '../src/app/page'
import { AuthProvider } from '@/components/context/AuthContext';


describe('Home page', () => {
  it('renders a heading', () => {
    render(
    <AuthProvider>
      <Page />
    </AuthProvider>
    )
    const heading = screen.getByRole('heading', { level: 1})
    expect(heading).toBeInTheDocument()
    expect(heading).toHaveTextContent("Tomorrow's To-Do Today"); 
  })
})