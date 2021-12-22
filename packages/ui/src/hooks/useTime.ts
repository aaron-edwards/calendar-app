import { useState } from 'react';
import useInterval from './useInterval';

export default function useTime(delay: number) {
  const [currentTime, setCurrentTime] = useState(Date.now());
  useInterval(() => setCurrentTime(Date.now()), delay);
  return currentTime;
}
