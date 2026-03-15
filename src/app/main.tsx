import React from 'react';
import ReactDOM from 'react-dom/client';
import App from 'app/App';
import './index.css';
import { StoreProvider } from './providers/storeProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StoreProvider>
      <App />
    </StoreProvider>
  </React.StrictMode>
);
