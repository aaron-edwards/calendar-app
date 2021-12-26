import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthProvider } from './AuthContext';
import reportWebVitals from './reportWebVitals';
import { SettingsProvider } from './SettingsContext';

ReactDOM.render(
  <React.StrictMode>
    <SettingsProvider>
      <CssBaseline />
      <AuthProvider>
        <App />
      </AuthProvider>
    </SettingsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
