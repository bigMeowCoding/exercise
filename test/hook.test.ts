import { act, renderHook } from "@testing-library/react-hooks";
import { useCallback, useState } from "react";
export default function useCounter(initValue = 0) {
  const [count, setCount] = useState(initValue);
  const increment = useCallback(() => setCount((x) => x + 1), [initValue]);
  const reset = useCallback(() => setCount((x) => initValue), [initValue]);
  return { count, increment, reset };
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
});
