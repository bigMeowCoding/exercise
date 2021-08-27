import { act, renderHook } from "@testing-library/react-hooks";
import { useCallback, useEffect, useState } from "react";
export function useCounter(initValue = 0) {
  const [count, setCount] = useState(initValue);
  const increment = useCallback(() => setCount((x) => x + 1), [initValue]);
  const reset = useCallback(() => setCount(() => initValue), [initValue]);
  return { count, increment, reset };
}
export function useSideEffect() {
  const cache: any = {};
  const get = (id: number) => {
    return !!cache[id];
  };
  const start = (id: number) => {
    console.log("start=======", id);
    cache[id] = true;
    return cache;
  };
  const stop = (id: number) => delete cache[id];
  return { get, start, stop };
}
describe("should use counter", () => {
  test("base", () => {
    const { result } = renderHook(() => useCounter(100));
    expect(result.current.count).toBe(100);
    expect(typeof result.current.increment).toBe("function");
    act(() => {
      result.current.increment();
    });
    expect(result.current.count).not.toBe(100);
    expect(result.current.count).toBe(101);
  });
  test("rerender", () => {
    let initialValue = 0;
    const { result, rerender } = renderHook(
      ({ initialValue }) => useCounter(initialValue),
      {
        initialProps: { initialValue },
      }
    );
    expect(result.current.count).toBe(0);
    rerender({ initialValue: 100 });
    act(() => {
      result.current.reset();
    });
    expect(result.current.count).toBe(100);
  });
  test("usesideeffect", () => {
    let initialValue = 0;
    const { stop, start, get } = useSideEffect();
    const { rerender } = renderHook(
      ({ initialValue }) =>
        useEffect(() => {
          start(initialValue);
          return () => {
            console.log("stop======", initialValue);
            stop(initialValue);
          };
        }, [initialValue]),
      {
        initialProps: { initialValue },
      }
    );
    expect(get(0)).toBeTruthy();
    rerender({ initialValue: 100 });
    expect(get(100)).toBeTruthy();
    expect(get(0)).toBeFalsy();
    // act(() => {
    //   result.current.reset();
    // });
    // expect(result.current.count).toBe(100);
  });
});
