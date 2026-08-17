import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders portfolio title', () => {
  render(<App />);
  const titleElements = screen.getAllByText(/BALA/i);
  expect(titleElements.length).toBeGreaterThan(0);
});
