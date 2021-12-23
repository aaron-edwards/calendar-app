import { useEffect, useRef } from 'react';

export default function useInterval(
  callback: () => void,
  delay: number | null
): void {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    if (delay) {
      const tick = () => {
        savedCallback.current?.();
      };
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return undefined;
  }, [delay]);
}
