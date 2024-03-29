import { render, screen, fireEvent } from '@testing-library/react';
import VisualizationControls from '../../components/VisualizationControls';
import { VisualizationProvider } from '../../context/VisualizationContext';
import { VisualizationContext, ACTIONS } from '../../context/VisualizationContext'; // Ensure you import the correct context and actions



describe('VisualizationControls', () => {
  const mockContext = {
    state: {
      autoadjustY: false,
      range: [0, 1000],
      zoom: 100,
      useMean: false
    },
    dispatch: jest.fn(),
  };

  test('renders loading text', () => {
    render(
      <VisualizationProvider>
        <VisualizationControls />
      </VisualizationProvider>
    );

    const slider = screen.getByTestId('slider');
    const previousButton = screen.getByRole('button', {
      name: /PREVIOUS 10000 MILLISECONDS/i
    });
    const nextButton = screen.getByRole('button', {
      name: /NEXT 10000 MILLISECONDS/i
    });
    const adjustCheckbox = screen.getByTestId(/autoadjustY/i);
    const adjustCheckboxLabel = screen.getByText(/Adjust Y axis values to selection/i);
    const useMeanCheckbox = screen.getByTestId(/useMean/i);
    const useMeanCheckboxLabel = screen.getByText(/Use mean when downsampling/i);

    expect(slider).toBeInTheDocument();
    expect(previousButton).toBeInTheDocument();
    expect(previousButton).toBeDisabled();
    expect(nextButton).toBeInTheDocument();
    expect(adjustCheckbox).not.toBeChecked();
    expect(adjustCheckboxLabel).toBeInTheDocument();
    expect(useMeanCheckbox).not.toBeChecked();
    expect(useMeanCheckboxLabel).toBeInTheDocument();
  });

  test('handle autoadjustY change', () => {
    render(
      <VisualizationContext.Provider value={mockContext}>
        <VisualizationControls />
      </VisualizationContext.Provider>
    );

    const checkboxElement = screen.getByTestId(/autoadjustY/i);

    fireEvent.click(checkboxElement);

    expect(mockContext.dispatch).toHaveBeenCalledWith({ type: ACTIONS.UPDATE_AUTOADJUST_Y, payload: true });
  });

  test('handle use mean change', () => {
    render(
      <VisualizationContext.Provider value={mockContext}>
        <VisualizationControls />
      </VisualizationContext.Provider>
    );

    const checkboxElement = screen.getByTestId(/useMean/i);

    fireEvent.click(checkboxElement);

    expect(mockContext.dispatch).toHaveBeenCalledWith({ type: ACTIONS.UPDATE_USE_MEAN, payload: true });
  });

  test('handles next button click', () => {
    render(
      <VisualizationContext.Provider value={mockContext}>
        <VisualizationControls />
      </VisualizationContext.Provider>
    );

    const nextButton = screen.getByRole('button', {
      name: /NEXT 100 MILLISECONDS/i
    });

    expect(nextButton).toBeInTheDocument();

    fireEvent.click(nextButton);

    expect(mockContext.dispatch).toHaveBeenCalledWith({ type: ACTIONS.UPDATE_RANGE, payload: [100, 1100] });
  });

  test('handles previous button click', () => {
    render(
      <VisualizationContext.Provider value={{
        ...mockContext, state: {
          autoadjustY: false,
          range: [2000, 2500],
          zoom: 100,
        }
      }}>
        <VisualizationControls />
      </VisualizationContext.Provider>
    );

    const previousButton = screen.getByRole('button', {
      name: /PREVIOUS 100 MILLISECONDS/i
    });

    fireEvent.click(previousButton);

    expect(mockContext.dispatch).toHaveBeenCalledWith({ type: ACTIONS.UPDATE_RANGE, payload: [1900, 2400] });
  });
});
