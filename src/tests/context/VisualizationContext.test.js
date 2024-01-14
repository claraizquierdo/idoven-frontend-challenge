import { render, screen } from '@testing-library/react';
import VisualizationContext, {VisualizationProvider }from '../../context/VisualizationContext';
import { useContext } from "react";

const TestingComponent = () => {
  const { state } = useContext(VisualizationContext);
  const { autoadjustY, originalData, isLoading, range , zoom, useMean} = state;
  return (
    <>
      <p>{`Default value for autoadjustY: ${autoadjustY?.toString()}`}</p>
      <p>{`Default value for use mean: ${useMean?.toString()}`}</p>
      <p>{`Default value for isLoading: ${isLoading?.toString()}`}</p>
      <p>{`Range from ${range[0]} to ${range[1]}`}</p>
      <p>{`Data length is ${originalData.length}`}</p>
      <p>{`Zoom is ${zoom}`}</p>
    </>
  );
};

test('renders loading text', () => {
  render(<VisualizationProvider>
    <TestingComponent />
  </VisualizationProvider>);

  const autoadjustText = screen.getByText('Default value for autoadjustY: false');
  const useMeanText = screen.getByText('Default value for use mean: false');
  const isLoadingText = screen.getByText('Default value for isLoading: false');
  const rangeText = screen.getByText('Range from 0 to 10000');
  const dataText = screen.getByText('Data length is 0');
  const zoomText = screen.getByText('Zoom is 10000');

  expect(autoadjustText).toBeInTheDocument();
  expect(useMeanText).toBeInTheDocument();
  expect(isLoadingText).toBeInTheDocument();
  expect(rangeText).toBeInTheDocument();
  expect(dataText).toBeInTheDocument();
  expect(zoomText).toBeInTheDocument();
});
