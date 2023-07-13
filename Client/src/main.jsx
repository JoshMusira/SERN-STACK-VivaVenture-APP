import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { UIContextProvider } from './context/phoneContext/Context.jsx';
import { ContextProvider } from './context/userContext/Context.jsx';
import { AdminContextProvider } from './Admin/context/AdminContext/Context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ContextProvider>
      <UIContextProvider>
        <AdminContextProvider>
          <App />
        </AdminContextProvider>
      </UIContextProvider>
    </ContextProvider>
  </React.StrictMode>
);
