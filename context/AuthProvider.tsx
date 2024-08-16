import { createContext, useState } from "react";

interface Auth {
  user?: any;
}
interface IProps {
  children: React.ReactNode;
}

interface AuthContextType {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: IProps) => {
  const [auth, setAuth] = useState<Auth>({});
  const [isLogin, setIsLogin] = useState(false);

  return (
    <AuthContext.Provider value={{ auth, setAuth, isLogin, setIsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
