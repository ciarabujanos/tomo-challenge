import { render, screen } from '@testing-library/react';
import SpiceDetailPage from './SpiceDetailPage';

vi.mock('react-router-dom', async () => {
  const originalRouter = await vi.importActual('react-router-dom');
  return {
    ...originalRouter,
    useParams: () => ({ id: '0' }),
    useLocation: () => ({ state: { spices: [] } }),
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

test('renders spice detail page', async () => {
  render(<SpiceDetailPage />);

  // Spice Name should be visible
  expect(await screen.findByText(/spice name/i)).toBeInTheDocument();
  // Should see cilantro in the spice list
  expect(await screen.findByText(/cilantro/i)).toBeInTheDocument();
});
