import React, {
  createContext,
  ReactNode,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { Provider } from 'use-http';
import useGoogleSignIn from '../hooks/useGoogleSignIn';

type Context = {
  credentials: string;
  prompt: () => void;
  logout: () => void;
};

export const AuthenticationContext = createContext<Context>({
  credentials: 'UNKNOWN',
  prompt: () => undefined,
  logout: () => undefined,
});

type Props = {
  clientId: string;
  loadingScreen: JSX.Element;
  loginScreen: (
    button: (props: ButtonConfiguration) => JSX.Element
  ) => JSX.Element;
  children: ReactNode;
};
export function AuthenticationProvider({
  clientId,
  loadingScreen,
  loginScreen,
  children,
}: Props) {
  const [credentials, setCredentials] = useState<string | undefined>(undefined);
  const { loaded, prompt, LoginButton } = useGoogleSignIn(
    clientId,
    (response) => setCredentials(response.credential)
  );
  const value: Context = useMemo(
    () => ({
      credentials: credentials || 'UNKNOWN',
      prompt,
      logout: () => undefined,
    }),
    [credentials, prompt]
  );

  useEffect(() => {
    if (loaded && !credentials) {
      prompt();
    }
  }, [loaded, credentials]);

  if (!loaded) {
    return loadingScreen;
  }
  if (!credentials) {
    return loginScreen(LoginButton);
  }

  return (
    <AuthenticationContext.Provider value={value}>
      <Provider
        url="https://www.googleapis.com"
        options={{
          headers: {
            Authorization: `Bearer ${credentials}`,
          },
        }}
      >
        {children}
      </Provider>
    </AuthenticationContext.Provider>
  );
}
