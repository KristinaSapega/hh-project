import { useLocalStorage } from './useLocalStorage';

const useAuth = () => {
  const [user, setUser] = useLocalStorage('user');

  const login = (login: string, header: string) => {
    setUser({ login, header });
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
