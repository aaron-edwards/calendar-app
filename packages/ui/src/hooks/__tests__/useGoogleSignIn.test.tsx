import { render } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import useGoogleSignIn from '../useGoogleSignIn';

describe('useGoogleSignIn', () => {
  const CLIENT_ID = 'CLIENT_ID';
  const onLogin = jest.fn();

  function mockGoogleAccounts() {
    window.google = {
      accounts: {
        id: {
          initialize: jest.fn(),
          prompt: jest.fn(),
          renderButton: jest.fn(),
        },
      },
    };
  }
  function restGoogle() {
    window.google = undefined as unknown as Google;
  }

  beforeEach(() => restGoogle());
  afterEach(() => restGoogle());

  describe('when no gsi client script is present', () => {
    it('should initialize as not loaded', () => {
      const { result } = renderHook(() => useGoogleSignIn(CLIENT_ID, onLogin));
      expect(result.current.loaded).toBe(false);
    });

    it('should add a script element', () => {
      renderHook(() => useGoogleSignIn(CLIENT_ID, onLogin));
      const script = document.getElementById('gsi-client');
      expect(script).toBeInTheDocument();
      expect(script).toHaveAttribute(
        'src',
        'https://accounts.google.com/gsi/client'
      );
    });

    it('should initialize and mark as loaded when script loads', () => {
      const { result } = renderHook(() => useGoogleSignIn(CLIENT_ID, onLogin));
      mockGoogleAccounts();
      act(() => {
        document.getElementById('gsi-client')?.onload?.({} as Event);
      });
      expect(window.google.accounts.id.initialize).toHaveBeenCalledWith(
        expect.objectContaining({
          client_id: CLIENT_ID,
        })
      );
      expect(result.current.loaded).toBe(true);
    });
  });

  describe('prompt', () => {
    it('prompt the user for login & return credentials', () => {
      const credentials = { credentials: 'jwt' };
      mockGoogleAccounts();
      const { result } = renderHook(() => useGoogleSignIn(CLIENT_ID, onLogin));
      result.current.prompt();
      expect(window.google.accounts.id.prompt).toHaveBeenCalled();
      (
        window.google.accounts.id.initialize as jest.Mock
      ).mock.calls[0][0].callback(credentials);
      expect(onLogin).toHaveBeenCalledWith(credentials);
    });

    it('should call only the latest callback', () => {
      const cb1 = jest.fn();
      const cb2 = jest.fn();
      let cb = cb1;
      const credentials = { credentials: 'jwt' };
      mockGoogleAccounts();
      const hook = renderHook(() => useGoogleSignIn(CLIENT_ID, cb));
      cb = cb2;
      hook.rerender();
      (
        window.google.accounts.id.initialize as jest.Mock
      ).mock.calls[0][0].callback(credentials);

      expect(cb1).not.toHaveBeenCalled();
      expect(cb2).toHaveBeenCalledWith(credentials);
    });
  });

  describe('LoginButton', () => {
    it('should render the login button', () => {
      mockGoogleAccounts();
      const hook = renderHook(() => useGoogleSignIn(CLIENT_ID, onLogin));
      const { LoginButton } = hook.result.current;
      const { getByTestId } = render(<LoginButton width={100} />);

      expect(window.google.accounts.id.renderButton).toHaveBeenCalledWith(
        getByTestId('gsi-login-button'),
        { width: 100 }
      );
    });
  });
});
