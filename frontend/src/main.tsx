import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Register from "./pages/Register.tsx";

// Import our custom CSS
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import './scss/styles.scss'

// Import all of Bootstrap’s JS
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import * as bootstrap from 'bootstrap'

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
