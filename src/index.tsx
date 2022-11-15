import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { RoutesApp } from './routes';
import { AuthProvider } from './contexts/AuthProvider';
import { TimerProvider } from './contexts/TimerData';
import { AlertProvider } from './contexts/AlertProvider';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <TimerProvider>
        <AlertProvider>
          <RoutesApp />
        </AlertProvider>
      </TimerProvider>
    </AuthProvider>
  </React.StrictMode>
);
