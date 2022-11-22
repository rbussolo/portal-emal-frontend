import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import { RoutesApp } from './routes';
import { AuthProvider } from './contexts/AuthProvider';
import { TimerProvider } from './contexts/TimerData';
import { AlertProvider } from './contexts/AlertProvider';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <TimerProvider>
          <AlertProvider>
            <RoutesApp />
          </AlertProvider>
        </TimerProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
