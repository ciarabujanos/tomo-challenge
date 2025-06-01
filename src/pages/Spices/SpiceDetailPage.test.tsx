import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SpiceDetailPage from './SpiceDetailPage';
import { MemoryRouter } from 'react-router-dom';

vi.mock('react-router-dom', async () => {
  const originalRouter = await vi.importActual('react-router-dom');
  return {
    ...originalRouter,
    useParams: () => ({ id: '0' }),
  };
});

beforeEach(() => {
  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          id: 0,
          name: 'Cilantro',
          color: 'ffcc00',
          price: '4.00',
          heat: 1,
        }),
    }),
  ) as unknown as typeof fetch;
});

afterEach(() => {
  vi.restoreAllMocks();
});

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
};

test('renders spice detail page', async () => {
  renderWithClient(<SpiceDetailPage />);
  // Spice Name should be visible
  expect(await screen.findByText(/spice name/i)).toBeInTheDocument();
  // Should see cilantro in the spice list
  expect(await screen.findByText(/cilantro/i)).toBeInTheDocument();
});
