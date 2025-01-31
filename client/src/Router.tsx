import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HomePage } from './Home/Home.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <HomePage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
