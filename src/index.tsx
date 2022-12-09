import React from 'react';
import ReactDOM from 'react-dom/client';

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import { RoutesApp } from './routes';
import { AuthProvider } from './contexts/AuthProvider';
import { TimerProvider } from './contexts/TimerData';
import { BrowserRouter } from 'react-router-dom';
import { LoadingProvider } from './contexts/LoadingProvider';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TimerProvider>
          <LoadingProvider>
            <RoutesApp />
          </LoadingProvider>
        </TimerProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
