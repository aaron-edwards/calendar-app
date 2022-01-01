import { createContext, useMemo } from 'react';
import useGoogleAuth, { GoogleAuthOptions, User } from '../hooks/useGoogleAuth';
import useInterval from '../hooks/useInterval';

type AuthContext = {
  user?: User;
  signIn: (options?: gapi.auth2.SigninOptions) => void;
  signOut: () => void;
};

export const AuthenticationContext = createContext<AuthContext>({
  signIn: () => undefined,
  signOut: () => undefined,
});

type Props = {
  children: React.ReactNode;
  clientId: string;
  reloadTime?: number;
  googleAuthOptions?: GoogleAuthOptions;
};
export function AuthenticationProvider({
  children,
  clientId,
  reloadTime,
  googleAuthOptions,
}: Props) {
  const { user, signIn, signOut, reload } = useGoogleAuth(
    clientId,
    googleAuthOptions
  );
  const value = useMemo(
    () => ({
      user,
      signIn,
      signOut,
    }),
    [user, signIn, signOut]
  );
  useInterval(() => reload(), reloadTime && user ? reloadTime : null);
  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
}
