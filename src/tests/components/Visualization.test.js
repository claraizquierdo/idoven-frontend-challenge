import { render, screen } from '@testing-library/react';
import Visualization from '../../components/Visualization';
import { VisualizationContext } from '../../context/VisualizationContext';

describe('Visualization', () => {
  const mockContext = {
    state: {
      autoadjustY: false,
      originalData: new Int16Array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]),
      isLoading: false,
      range: [0, 5],
      zoom: 5,
    },
    dispatch: jest.fn(),
  };

  const loadingContext = {
    state: {
      autoadjustY: false,
      originalData: new Int16Array(),
      isLoading: true,
      range: [0, 5],
      zoom: 5,
    },
    dispatch: jest.fn(),
  };

  beforeAll(() => {
    window.matchMedia = window.matchMedia || function () {
      return {
        matches: false,
        addEventListener: function () { },
        removeEventListener: function () { },
      }
    };
  });

  test('renders correctly', () => {
    render(
      <VisualizationContext.Provider value={mockContext}>
        <Visualization />
      </VisualizationContext.Provider>
    );

    expect(screen.getByTestId('graph')).toBeInTheDocument();
    expect(screen.getByTestId('visualization-controls')).toBeInTheDocument();
  });

  test('renders Loading when isLoading is true', () => {
    render(
      <VisualizationContext.Provider value={loadingContext}>
        <Visualization />
      </VisualizationContext.Provider>
    );

    expect(screen.getByText(/Loading ECG data.../i)).toBeInTheDocument();
    expect(screen.queryByTestId('graph')).not.toBeInTheDocument();
    expect(screen.queryByTestId('visualization-controls')).not.toBeInTheDocument();
  });
});