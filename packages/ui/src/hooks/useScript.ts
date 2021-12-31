import { useEffect } from 'react';

type Options = {
  id?: string;
  async?: boolean;
  onload?: () => void;
};

function createScript(url: string, options: Options) {
  const script = document.createElement('script');
  script.src = url;
  script.async = options.async || false;
  if (options.id) {
    script.id = options.id;
  }
  if (options.onload) {
    script.onload = options.onload;
  }
  document.head.appendChild(script);
  return script;
}

export default function useScript(url: string, options: Options = {}) {
  useEffect(() => {
    if (options.id && document.getElementById(options.id)) {
      options.onload?.();
      return () => undefined;
    }
    const temporaryScript = createScript(url, options);
    return () => {
      document.head.removeChild(temporaryScript);
    };
  }, []);
}
