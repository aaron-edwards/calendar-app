import { useCallback, useState } from 'react';
import useIsMounted from './useIsMounted';
import useScript from './useScript';

const JS_SRC = 'https://apis.google.com/js/api.js';
export const ID = 'google-api';

export type User = {
  auth: gapi.auth2.AuthResponse;
  profile: {
    id: string;
    email: string;
    name: string;
    givenName: string;
    familyName: string;
    imageUrl: string;
  };
};

function toUser(googleUser: gapi.auth2.GoogleUser): User {
  const auth = googleUser.getAuthResponse(true);
  const profile = googleUser.getBasicProfile();
  return {
    auth,
    profile: {
      id: profile.getId(),
      email: profile.getEmail(),
      name: profile.getName(),
      givenName: profile.getGivenName(),
      familyName: profile.getFamilyName(),
      imageUrl: profile.getImageUrl(),
    },
  };
}

export type GoogleAuthOptions = {
  scope?: string;
  autoSignIn?: boolean;
  autoSignInOptions?: gapi.auth2.SigninOptions;
};

export default function useGoogleAuth(
  clientId: string,
  { scope, autoSignIn = false, autoSignInOptions }: GoogleAuthOptions = {}
) {
  const isMounted = useIsMounted();
  const [user, setUser] = useState<User>();
  const [loaded, setLoaded] = useState(false);

  const setGoogleUser = useCallback((googleUser: gapi.auth2.GoogleUser) => {
    setUser(googleUser.isSignedIn() ? toUser(googleUser) : undefined);
  }, []);

  const signIn = useCallback(
    (options: gapi.auth2.SigninOptions) =>
      gapi.auth2.getAuthInstance()?.signIn(options),
    []
  );
  const signOut = useCallback(
    () => gapi.auth2.getAuthInstance()?.signOut(),
    []
  );
  const reload = useCallback(
    () => gapi.auth2.getAuthInstance()?.currentUser?.get().reloadAuthResponse(),
    []
  );

  const onload = () => {
    gapi.load('auth2', () => {
      gapi.auth2.init({ client_id: clientId, scope }).then(() => {
        if (isMounted()) {
          setLoaded(true);
          const GoogleAuth = gapi.auth2.getAuthInstance();
          const googleUser = GoogleAuth.currentUser.get();
          setGoogleUser(googleUser);
          GoogleAuth.currentUser.listen(setGoogleUser);

          if (autoSignIn && !googleUser.isSignedIn()) {
            GoogleAuth.signIn(autoSignInOptions);
          }
        }
      });
    });
  };

  useScript(JS_SRC, { id: ID, async: true, onload });

  return {
    loaded,
    user,
    signIn,
    signOut,
    reload,
  };
}
