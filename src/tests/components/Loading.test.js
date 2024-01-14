import { render, screen } from '@testing-library/react';
import Loading from '../../components/Loading';

test('renders loading text', () => {
  render(<Loading />);
  const headingElement = screen.getByRole('heading', { level: 4, name: /Loading ECG data.../i });
  const descriptionElement = screen.getByText(/Please wait. It can take some time./i);
  const circularProgressElement = screen.getByRole('progressbar');

  expect(headingElement).toBeInTheDocument();
  expect(descriptionElement).toBeInTheDocument();
  expect(circularProgressElement).toBeInTheDocument();
});
