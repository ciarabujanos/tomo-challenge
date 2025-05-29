import { render, screen } from '@testing-library/react';
import ErrorBanner from './ErrorBanner';

describe('ErrorBanner', () => {
  it('renders an error message', () => {
    render(<ErrorBanner error="Unexpected error" />);
    expect(screen.getByText('Unexpected error')).toBeInTheDocument();
  });
});
