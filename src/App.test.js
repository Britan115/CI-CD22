import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('zeigt den Ref-Card Titel', () => {
  render(<App />);
  const heading = screen.getByText(/App Ref\. Card 02/i);
  expect(heading).toBeInTheDocument();
});
