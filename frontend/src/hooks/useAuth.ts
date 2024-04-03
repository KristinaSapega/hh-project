import { useLocalStorage } from './useLocalStorage';

const useAuth = () => {
  const [user, setUser] = useLocalStorage('user');

  const login = (user: string) => {
    setUser(user);
  };

  const logout = () => {
    setUser(null);
  };

  return {
    user,
    login,
    logout,
  };
};

export { useAuth };
