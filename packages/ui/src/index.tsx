import { CssBaseline } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { AuthenticationProvider } from './Authentication/AuthenticationContext';
import reportWebVitals from './reportWebVitals';
import { SettingsProvider } from './SettingsContext';

const CLIENT_ID =
  '367871961450-kdu4665nnbbpl8bsmg2d6pseamtovhrf.apps.googleusercontent.com';
const scope = 'https://www.googleapis.com/auth/calendar.readonly';

ReactDOM.render(
  <React.StrictMode>
    <SettingsProvider>
      <AuthenticationProvider
        clientId={CLIENT_ID}
        googleAuthOptions={{
          scope,
          autoSignIn: true,
          autoSignInOptions: { prompt: 'select_account ' },
        }}
        reloadTime={45 * 60 * 1000}
      >
        <CssBaseline />
        <App />
      </AuthenticationProvider>
    </SettingsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
