import { useState, useEffect } from 'react';

//custom hook to delay reacting to value changes until timeout passes
export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    //set a timer to update the value after delay
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    //cancel previous timer if value changes within delay
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
