import { Dispatch, SetStateAction, useEffect, useState } from 'react';

const useLocalStorage = (
  key: string,
): [string | null, Dispatch<SetStateAction<string | null>>] => {
  const [value, setValue] = useState<string | null>(() => {
    try {
      const data = localStorage.getItem(key);
      return data || null;
    } catch (error) {
      console.log(error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (value) {
        localStorage.setItem(key, value);
      } else {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.log(error);
    }
  }, [key, value]);

  return [value, setValue];
};

export { useLocalStorage };
