import { CircularProgress, Stack } from '@mui/material';
import { createContext, FC, useMemo, useState } from 'react';
import {
  useGoogleLogin,
  GoogleLoginResponse,
  useGoogleLogout,
} from 'react-google-login';

const clientId =
  '367871961450-kdu4665nnbbpl8bsmg2d6pseamtovhrf.apps.googleusercontent.com';

type Profile = {
  email: string;
  name: string;
  image: string;
};
type Token = {
  accessToken: string;
  token: string;
  type: 'Bearer';
  expiresAt: number;
};

type Auth = {
  token: Token;
  profile: Profile;
};

export const AuthContext = createContext<{
  auth: Auth | null;
  signIn: () => void;
  signOut: () => void;
  loaded: boolean;
}>({
  auth: null,
  loaded: false,
  signIn: () => undefined,
  signOut: () => undefined,
});

export const AuthProvider: FC = ({ children }) => {
  const [auth, setAuth] = useState<Auth | null>(null);
  const { signIn, loaded } = useGoogleLogin({
    clientId,
    responseType: 'id_token token',
    accessType: 'online',
    cookiePolicy: 'single_host_origin',
    isSignedIn: true,
    onSuccess: (responese: GoogleLoginResponse) => {
      setAuth({
        token: {
          accessToken: responese.accessToken,
          token: responese.tokenId,
          type: 'Bearer',
          expiresAt: responese.tokenObj.expires_at,
        },
        profile: {
          name: responese.profileObj.name,
          email: responese.profileObj.email,
          image: responese.profileObj.imageUrl,
        },
      });
    },
  });

  const value = useMemo(
    () => ({ auth, signIn, loaded, signOut: () => undefined }),
    [auth, signIn, loaded]
  );

  return (
    <AuthContext.Provider value={value}>
      {loaded ? (
        children
      ) : (
        <Stack
          sx={{
            height: '100vh',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress size={150} />
        </Stack>
      )}
    </AuthContext.Provider>
  );
};
