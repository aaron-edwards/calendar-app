import { CircularProgress, Stack } from '@mui/material';
import {
  createContext,
  FC,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useGoogleLogin, GoogleLoginResponse } from 'react-google-login';
import { defaultSettings, SettingsContext } from './SettingsContext';

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

export type Auth = {
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
  const { setSettings } = useContext(SettingsContext);
  const [auth, setAuth] = useState<Auth | null>(null);
  const { signIn, loaded } = useGoogleLogin({
    clientId,
    responseType: 'id_token token',
    accessType: 'online',
    cookiePolicy: 'single_host_origin',
    scope:
      'https://www.googleapis.com/auth/calendar.readonly https://www.googleapis.com/auth/calendar.events.readonly',
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

  const signOut = useCallback(() => {
    const authAPI = (window as any).gapi?.auth2?.getAuthInstance();
    authAPI?.disconnect();
    authAPI?.signOut();
    setAuth(null);
    setSettings(defaultSettings);
  }, []);

  const value = useMemo(
    () => ({ auth, signIn, loaded, signOut }),
    [auth, signIn, loaded, signOut]
  );

  return (
    <AuthContext.Provider value={value}>
      {value.loaded ? (
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
