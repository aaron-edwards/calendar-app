import { renderHook, cleanup } from '@testing-library/react-hooks';
import useInterval from '../useInterval';

describe('useInterval', () => {
  beforeAll(() => jest.useFakeTimers());
  afterAll(() => jest.useRealTimers());

  afterEach(async () => {
    await cleanup();
  });

  it('should poll the callback after the interval', () => {
    const callback = jest.fn();
    const delay = 10;

    renderHook(() => useInterval(callback, delay));

    jest.advanceTimersByTime(delay - 1);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(2);
  });

  it('should clear the interval on unmount', () => {
    const callback = jest.fn();
    const delay = 10;

    const { unmount } = renderHook(() => useInterval(callback, delay));

    unmount();

    jest.advanceTimersByTime(delay);
    expect(callback).not.toHaveBeenCalled();
  });

  it('should update the timer if delay changes', () => {
    const callback = jest.fn();
    let delay = 10;

    const { rerender } = renderHook(() => useInterval(callback, delay));

    jest.advanceTimersByTime(delay - 1);
    delay = 20;
    rerender();
    jest.advanceTimersByTime(1);
    expect(callback).not.toHaveBeenCalled();

    jest.advanceTimersByTime(delay);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should stop if delay is changed to 0', () => {
    const callback = jest.fn();
    const originalDelay = 10;
    let delay: number | null = originalDelay;

    const { rerender } = renderHook(() => useInterval(callback, delay));

    jest.advanceTimersByTime(delay);
    delay = null;
    rerender();
    jest.advanceTimersByTime(1);
    expect(callback).toHaveBeenCalledTimes(1);

    jest.advanceTimersByTime(originalDelay);
    expect(callback).toHaveBeenCalledTimes(1);
  });

  it('should update the callback', () => {
    const firstCallback = jest.fn();
    const secondCallback = jest.fn();
    let callback = firstCallback;
    const delay = 10;

    const { rerender } = renderHook(() => useInterval(callback, delay));

    jest.advanceTimersByTime(delay - 1);
    callback = secondCallback;
    rerender();
    jest.advanceTimersByTime(1);

    expect(firstCallback).not.toHaveBeenCalled();
    expect(secondCallback).toHaveBeenCalledTimes(1);
  });
});
