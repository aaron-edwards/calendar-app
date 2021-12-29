import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

declare global {
  type IdConfiguration = {
    client_id: string;
    callback: (response: CredentialResponse) => void;
    auto_select?: boolean;
    prompt_parent_id?: string;
  };
  type ButtonConfiguration = {
    width: number;
  };
  type Google = {
    accounts: {
      id: {
        initialize(config: IdConfiguration): void;
        prompt(): void;
        renderButton: (a: HTMLDivElement, config: ButtonConfiguration) => void;
      };
    };
  };
  interface Window {
    google: Google;
  }
}
type CredentialResponse = {
  credential: string;
  select_by: string;
};

function LoginButton(props: ButtonConfiguration) {
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (ref.current) {
      window.google.accounts.id.renderButton(ref.current, props);
    }
  }, [ref]);

  return <div ref={ref} data-testid="gsi-login-button" />;
}

type SignInOptionsOptions = {
  autoSelect: boolean;
};

export default function useGoogleSignIn(
  clientId: string,
  onLogin: (response: CredentialResponse) => void,
  { autoSelect = true }: Partial<SignInOptionsOptions> = {}
) {
  const [loaded, setLoaded] = useState(false);
  const onLoginRef = useRef<(response: CredentialResponse) => void>();
  useEffect(() => {
    onLoginRef.current = onLogin;
  }, [onLogin]);
  const onLoad = useCallback(() => {
    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (args) => {
        onLoginRef.current?.(args);
      },
      auto_select: autoSelect,
    });
    setLoaded(true);
  }, [setLoaded]);

  const prompt = useCallback(() => {
    window.google.accounts.id.prompt();
  }, []);

  useEffect(() => {
    let gsiScript = document.getElementById(
      'gsi-client'
    ) as HTMLScriptElement | null;
    if (window.google) {
      onLoad();
    }
    if (!gsiScript) {
      gsiScript = document.createElement('script');
      gsiScript.id = 'gsi-client';
      gsiScript.src = 'https://accounts.google.com/gsi/client';
      document.head.appendChild(gsiScript);
    }
    gsiScript.onload = onLoad;
  }, []);

  return { loaded, prompt, LoginButton };
}
