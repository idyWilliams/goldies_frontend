import { createContext, useState } from "react";

interface Auth {
  user?: any;
  admin?: any;
}
interface IProps {
  children: React.ReactNode;
}

interface AuthContextType {
  auth: Auth;
  setAuth: React.Dispatch<React.SetStateAction<Auth>>;
  isLogin: boolean;
  setIsLogin: React.Dispatch<React.SetStateAction<boolean>>;
  role: 'user' | 'admin' | null;
  setRole: (role: 'user' | 'admin' | null) => void;
}


const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: IProps) => {
  const [auth, setAuth] = useState<Auth>({});
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState<'user' | 'admin' | null>(null);



  return (
    <AuthContext.Provider value={{ auth, setAuth, isLogin, setIsLogin, role, setRole }}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthContext;
