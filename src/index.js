import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';

const root = document.getElementById('root');
const rootComponent = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

if (root) {
  createRoot(root).render(rootComponent);
} else {
  console.error("Root element not found");
}
