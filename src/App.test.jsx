import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from './App';

describe('App', () => {
  it('renders without crashing', () => {
    render(<App />);
    const heading = screen.getByText(/Infrastructure is the/i);
    expect(heading).toBeInTheDocument();
  });
});
