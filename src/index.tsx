import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { RoutesApp } from './routes';
import { AuthProvider } from './contexts/AuthProvider';
import { TimerProvider } from './contexts/TimerData';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <TimerProvider>
        <RoutesApp />
      </TimerProvider>
    </AuthProvider>
  </React.StrictMode>
);
