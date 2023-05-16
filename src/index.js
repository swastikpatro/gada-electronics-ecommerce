import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'normalize.css';
import './index.css';
import { makeServer } from './server';

// Call make Server
makeServer();

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
