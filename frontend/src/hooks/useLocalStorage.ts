import { Dispatch, SetStateAction, useEffect, useState } from 'react';

import { User } from '../types';

const useLocalStorage = (
  key: string,
): [User | null, Dispatch<SetStateAction<User | null>>] => {
  const [value, setValue] = useState<User | null>(() => {
    try {
      const data: User | null = JSON.parse(localStorage.getItem(key) ?? '');
      return data || null;
    } catch (error) {
      console.log(error);
      return null;
    }
  });

  useEffect(() => {
    try {
      if (value) {
        localStorage.setItem(key, JSON.stringify(value));
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
