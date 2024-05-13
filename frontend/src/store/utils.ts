import { User } from '../types';

export const getUser = (): User | null => {
  try {
    const user = JSON.parse(localStorage.getItem('user') || '');
    return user;
  } catch (error) {
    return null;
  }
};
