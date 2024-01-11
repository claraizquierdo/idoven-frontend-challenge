import { render, screen } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  beforeAll(() => {
    window.matchMedia = window.matchMedia || function() {
      return {
        matches: false,
        addEventListener: function() {},
        removeEventListener: function() {},
    }};
  });

  test('renders header', () => {
    render(<App />);
    const headerText = screen.getByText(/Idoven.ai Coding Challenge/i);
    expect(headerText).toBeInTheDocument();
  });
});


