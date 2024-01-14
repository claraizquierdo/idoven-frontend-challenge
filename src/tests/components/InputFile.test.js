import { render, screen, fireEvent, } from '@testing-library/react';
import InputFile from '../../components/InputFile';
import { VisualizationProvider, VisualizationContext } from '../../context/VisualizationContext';
import Papa from 'papaparse'

jest.mock('papaparse');

describe('InputFile', () => {
  const mockedParse = jest.fn()

  const mockContext = {
    state: {
      autoadjustY: false,
      originalData: new Int16Array(),
      range: [0, 1000],
      zoom: 100,
    },
    dispatch: jest.fn(),
  };

  test('renders correctly', () => {
    render(
      <VisualizationProvider>
        <InputFile />
      </VisualizationProvider>
    );
    const uploadText = screen.getByText(/Please, upload the CSV file/i);
    const fileInput = screen.getByPlaceholderText(/Select your file/i);
    const processedLinesText = screen.getByText(/Processed lines:/i);

    expect(uploadText).toBeInTheDocument();
    expect(fileInput).toBeInTheDocument();
    expect(processedLinesText).toBeInTheDocument();

  });

  test('Handle file change and dispatch actions correctly', async () => {
    const mockFile = new File(['fake csv content'], 'fake.csv', { type: 'text/csv' });
    Papa.parse = mockedParse;

    render(
      <VisualizationContext.Provider value={mockContext}>
        <InputFile />
      </VisualizationContext.Provider>
    );

    const fileInput = screen.getByPlaceholderText(/Select your file/i);
    fireEvent.change(fileInput, { target: { files: [mockFile] } });

    expect(mockedParse).toHaveBeenCalled();
  });


});
