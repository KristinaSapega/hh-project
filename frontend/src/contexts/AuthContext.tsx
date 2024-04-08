import { FunctionComponent, ReactNode, createContext } from 'react';

import { useAuth } from '../hooks/useAuth';

interface IAuthContext {
  user: string | null;
  login: (user: string) => void;
  logout: () => void;
}

const initialContext: IAuthContext = {
  user: null,
  login: () => {},
  logout: () => {},
};

export const AuthContext = createContext<IAuthContext>(initialContext);

const AuthProvider: FunctionComponent<{ children: ReactNode }> = ({
  children,
}) => {
  const auth = useAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
