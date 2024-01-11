import { render, screen } from '@testing-library/react';
import App from './App';

test('renders header', () => {
  render(<App />);
  const headerText = screen.getByText(/Idoven.ai Coding Challenge/i);
  expect(headerText).toBeInTheDocument();
});
