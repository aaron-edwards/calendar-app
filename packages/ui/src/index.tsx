import { CssBaseline, Paper } from '@mui/material';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { SettingsProvider } from './context/SettingsContext';
import './styles.css';
import { AuthenticationProvider } from './Authentication/AuthenticationContext';
import LoadingScreen from './Authentication/LoadingScreen';
import LoginScreen from './Authentication/LoginScreen';

const CLIENT_ID =
  '367871961450-kdu4665nnbbpl8bsmg2d6pseamtovhrf.apps.googleusercontent.com';

ReactDOM.render(
  <React.StrictMode>
    <SettingsProvider>
      <CssBaseline />
      <Paper
        id="main"
        square
        elevation={0}
        sx={{
          height: '100vh',
          display: 'flex',
        }}
      >
        <AuthenticationProvider
          clientId={CLIENT_ID}
          loadingScreen={<LoadingScreen />}
          loginScreen={(LoginButton) => (
            <LoginScreen loginButton={<LoginButton width={250} />} />
          )}
        >
          <App />
        </AuthenticationProvider>
      </Paper>
    </SettingsProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
