import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './main.css';
import Home from './pages/Home/Home.tsx';
import SpiceDetailPage from './pages/Spices/SpiceDetailPage.tsx';
import BlendDetailPage from './pages/Blends/BlendDetailPage.tsx';

async function enableMocking() {
  const { worker } = await import('./mocks/browser');

  return worker.start();
}

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Home />,
      errorElement: <Home />,
    },
    {
      path: '/spices/:id',
      element: <SpiceDetailPage />,
    },
    {
      path: '/blends/:id',
      element: <BlendDetailPage />,
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  },
);

enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <RouterProvider router={router} future={{ v7_startTransition: true }} />
    </StrictMode>,
  );
});
