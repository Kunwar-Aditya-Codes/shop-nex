import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClientProvider } from '@tanstack/react-query';
import {
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Route,
} from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { queryClient } from './lib/api/tanstackConfig.ts';

const router = createBrowserRouter(
  createRoutesFromElements(<Route path='/*' element={<App />} />)
);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <Toaster
        toastOptions={{
          className: ' z-[1000]',
        }}
      />
    </QueryClientProvider>
  </React.StrictMode>
);
