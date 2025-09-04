import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio', () => {
  render(<App />);
  const linkElement = screen.getByText(/Prakash Maheshwaran/i);
  expect(linkElement).toBeInTheDocument();
});
