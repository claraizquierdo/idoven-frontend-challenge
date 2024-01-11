import { render, screen } from '@testing-library/react';
import VisualizationControls from '../../components/VisualizationControls';
import {VisualizationProvider }from '../../context/VisualizationContext';


test('renders loading text', () => {
  render(
    <VisualizationProvider>
      <VisualizationControls />
    </VisualizationProvider>);

  const previousButton = screen.getByRole('button', {
    name: /PREVIOUS 1000 MILLISECONDS/i
  });

  const nextButton = screen.getByRole('button', {
    name: /NEXT 1000 MILLISECONDS/i
  });

  const adjustCheckbox = screen.queryByRole("checkbox");
  const adjustCheckboxLabel = screen.getByText(/Adjust Y axis values to selection/i);

  expect(previousButton).toBeInTheDocument();
  expect(previousButton).toBeDisabled();
  expect(nextButton).toBeInTheDocument();
  expect(adjustCheckbox).not.toBeChecked();
  expect(adjustCheckboxLabel).toBeInTheDocument();
});
