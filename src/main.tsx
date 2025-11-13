import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';
import { Toaster } from 'react-hot-toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import 'modern-normalize/modern-normalize.css';

const container = document.getElementById('root');
if (!container) throw new Error('Root element not found.');

const root = createRoot(container);

// Ініціалізуємо клієнт React Query
const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
      <Toaster position="top-right" reverseOrder={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
