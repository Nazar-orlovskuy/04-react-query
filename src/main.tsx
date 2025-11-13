import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App/App';
import 'modern-normalize/modern-normalize.css';
// import '../src/components/App/App.module.css';
import { Toaster } from 'react-hot-toast';

const root = createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <App />
    <Toaster position="top-right" />
  </React.StrictMode>
);
