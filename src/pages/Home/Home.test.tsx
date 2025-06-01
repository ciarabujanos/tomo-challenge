import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Home from './Home';

// 🧪 Mock the fetch responses
beforeEach(() => {
  global.fetch = vi.fn((url) => {
    if (url.includes('/spices')) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 0,
              name: 'Adobo',
              color: 'ffcc00',
              price: '4.00',
              heat: 1,
            },
          ]),
      });
    }

    if (url.includes('/blends')) {
      return Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              id: 1,
              name: 'Blendy Blend',
              blends: [0],
              spices: [2, 6, 37, 246],
              description: 'This is a new spice blend',
            },
          ]),
      });
    }

    return Promise.resolve({
      ok: true,
      json: () => Promise.resolve([]),
    });
  }) as unknown as typeof fetch;
});

afterEach(() => {
  vi.restoreAllMocks();
});

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <MemoryRouter>{ui}</MemoryRouter>
    </QueryClientProvider>,
  );
};

test('renders home page heading and spice link', async () => {
  renderWithClient(<Home />);

  expect(
    await screen.findByRole('heading', { name: /spice catalog/i }),
  ).toBeInTheDocument();

  expect(
    await screen.findByRole('link', { name: /adobo/i }),
  ).toBeInTheDocument();
});
