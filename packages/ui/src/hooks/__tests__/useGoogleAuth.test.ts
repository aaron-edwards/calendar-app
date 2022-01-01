import { renderHook } from '@testing-library/react-hooks';
import { act } from 'react-dom/test-utils';
import useGoogleAuth, { ID } from '../useGoogleAuth';

const CLIENT_ID = 'client-id';
const scope = 'profile';
describe('useGoogleAuth', () => {
  function loadScript(id: string = ID) {
    act(() => {
      document.getElementById(id)?.onload?.({} as Event);
    });
  }
  it('should add the google api script', () => {
    renderHook(() => useGoogleAuth(CLIENT_ID));
    expect(document.getElementById(ID)).toBeInTheDocument();
  });

  it('should load the google auth library and return the current user', () => {
    const { result } = renderHook(() => useGoogleAuth(CLIENT_ID, { scope }));
    loadScript();
    expect(gapi.load).toHaveBeenCalledWith('auth2', expect.anything());
    expect(gapi.auth2.init).toHaveBeenCalledWith({
      client_id: CLIENT_ID,
      scope,
    });

    expect(result.current.user?.profile).toEqual(
      expect.objectContaining({
        id: gapi.auth2
          .getAuthInstance()
          .currentUser.get()
          .getBasicProfile()
          .getId(),
      })
    );
  });

  describe('signIn', () => {
    it('should call the auth2 signin method', () => {
      const { result } = renderHook(() => useGoogleAuth(CLIENT_ID));
      loadScript();
      result.current.signIn({ prompt: 'select_account' });
      expect(gapi.auth2.getAuthInstance().signIn).toHaveBeenCalledWith({
        prompt: 'select_account',
      });
    });
    it('should automatically sign in if no user is signed in on load', () => {
      const { result } = renderHook(() =>
        useGoogleAuth(CLIENT_ID, { autoSignIn: true })
      );
      (
        gapi.auth2.getAuthInstance().currentUser.get as jest.Mock
      ).mockReturnValue({ isSignedIn: () => false });
      loadScript();
      expect(result.current.user).toBeUndefined();
      expect(gapi.auth2.getAuthInstance().signIn).toHaveBeenCalled();
    });
  });

  describe('signOut', () => {
    it('should call the auth2 signOut method', () => {
      const { result } = renderHook(() => useGoogleAuth(CLIENT_ID));
      loadScript();
      result.current.signOut();
      expect(gapi.auth2.getAuthInstance().signOut).toHaveBeenCalled();
    });
  });
});
