import { createTheme, ThemeProvider } from '@mui/material';
import { render, waitFor } from '@testing-library/react';
import { FC } from 'react';
import App from '../App';

describe('App', () => {
  const theme = createTheme();
  const wrapper: FC = ({ children }) => {
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  };

  describe('pages', () => {
    it('Should not display settings page', () => {
      const { baseElement } = render(<App />, { wrapper });
      expect(baseElement).not.toHaveTextContent('Settings');
    });

    it('should display the Settings page when the settings button is clicked', () => {
      const { getByRole, baseElement } = render(<App />, { wrapper });
      getByRole('button', { name: 'settings' }).click();
      expect(baseElement).toHaveTextContent('Settings');
    });

    it('should close Settings page if pressed twice', async () => {
      const { getByRole, baseElement } = render(<App />, { wrapper });
      getByRole('button', { name: 'settings' }).click();
      getByRole('button', { name: 'settings' }).click();

      waitFor(() => expect(baseElement).not.toHaveTextContent('Settings'));
    });
  });
});
