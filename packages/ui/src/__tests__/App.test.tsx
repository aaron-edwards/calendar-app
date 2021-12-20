import { render } from '@testing-library/react';
import App from '../App';

describe('App', () => {
  describe('pages', () => {
    it('Should not display settings page', () => {
      const { baseElement } = render(<App />);
      expect(baseElement).not.toHaveTextContent('Settings');
    });
    it('should display the Settings page when the settings button is clicked', () => {
      const { getByRole, baseElement } = render(<App />);
      getByRole('button').click();
      expect(baseElement).toHaveTextContent('Settings');
    });
  });
});
