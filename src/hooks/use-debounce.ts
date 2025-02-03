import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay?: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // This useEffect hook runs whenever `value` or `delay` changes
    const timer = setTimeout(() => {
      // After `delay` milliseconds, update `debouncedValue` to `value`
      setDebouncedValue(value);
    }, delay || 500); // Default delay is 500 milliseconds if `delay` is not provided

    // Clean up function to clear the timeout if `value` or `delay` changes before timeout fires
    return () => {
      clearTimeout(timer);
    };
  }, [value, delay]); // Depend on `value` and `delay` to re-run effect when they change

  // Return the current `debouncedValue` for use in the component
  return debouncedValue;
}
