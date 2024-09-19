import React, { act } from 'react';
import { render, screen } from '@testing-library/react';
import Dashboard from './Dashboard';

test('renders title', () => {
  act(() => {
    render(<Dashboard />);
  });
  const linkElement = screen.getByText(/Weather forecast data/i);
  expect(linkElement).toBeInTheDocument();
});
