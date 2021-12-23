import { act } from '@testing-library/react';
import { renderHook } from '@testing-library/react-hooks';
import useTime from '../useTime';

describe('useTime', () => {
  const INITIAL_TIME = new Date('2021-12-22').getTime();
  const DELAY = 5_000;
  beforeEach(() =>
    jest.useFakeTimers().setSystemTime(new Date(INITIAL_TIME).getTime())
  );
  afterAll(() => jest.useRealTimers());

  it('should start with the current time', () => {
    const { result } = renderHook(() => useTime(DELAY));
    expect(result.current).toBe(new Date(INITIAL_TIME).getTime());
  });

  it('should update the current time', () => {
    const { result } = renderHook(() => useTime(DELAY));

    act(() => {
      jest.advanceTimersByTime(DELAY - 1);
    });

    expect(result.all).toEqual([INITIAL_TIME]);

    act(() => {
      jest.advanceTimersByTime(1);
    });

    expect(result.all).toEqual([INITIAL_TIME, INITIAL_TIME + DELAY]);
  });
});
