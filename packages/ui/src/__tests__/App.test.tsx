import { render, waitFor } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  describe('pages', () => {
    it('Should not display settings page', () => {
      const { baseElement } = render(<App />);
      expect(baseElement).not.toHaveTextContent('Settings');
    });

    it('should display the Settings page when the settings button is clicked', () => {
      const { getByRole, baseElement } = render(<App />);
      getByRole('button', { name: 'settings' }).click();
      expect(baseElement).toHaveTextContent('Settings');
    });

    it('should close Settings page if pressed twice', async () => {
      const { getByRole, baseElement } = render(<App />);
      getByRole('button', { name: 'settings' }).click();
      getByRole('button', { name: 'settings' }).click();

      waitFor(() => expect(baseElement).not.toHaveTextContent('Settings'));
    });
  });
});
