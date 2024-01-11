import { render, screen } from '@testing-library/react';
import Loading from '../../components/Loading';

test('renders loading text', () => {
  render(<Loading />);
  const loadingText = screen.getByText(/Loading ECG data.../i);
  expect(loadingText).toBeInTheDocument();
});
