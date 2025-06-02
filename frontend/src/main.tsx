import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/register',
    element: <Register />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
