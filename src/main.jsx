import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App.jsx';
import ThemeProvider from './components/ThemeProvider';
import { UserProvider } from './components/UserProvider.jsx';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

const container = document.getElementById('root');
ReactDOM.createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <UserProvider>
          <App />
        </UserProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
