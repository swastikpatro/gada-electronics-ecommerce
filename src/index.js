import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import 'normalize.css';
import './index.css';
import { makeServer } from './server';
import {
  AuthContextProvider,
  ProductsContextProvider,
} from './frontend/contexts';

// Call make Server
makeServer();

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <ProductsContextProvider>
        <App />
      </ProductsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
