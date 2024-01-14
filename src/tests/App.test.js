import { render, screen } from '@testing-library/react';
import App from '../App';
import {VisualizationProvider }from '../context/VisualizationContext';

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
    render(
      <VisualizationProvider>
        <App />
      </VisualizationProvider>
    );
    const headerText = screen.getByText(/Idoven.ai Coding Challenge/i);
    expect(headerText).toBeInTheDocument();
  });
});


