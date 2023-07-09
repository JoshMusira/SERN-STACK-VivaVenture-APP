import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.jsx';
import './index.css';
import { UIContextProvider } from './context/phoneContext/Context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UIContextProvider>
      <App />
    </UIContextProvider>
  </React.StrictMode>
);
