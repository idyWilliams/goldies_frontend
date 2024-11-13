import { createContext, useContext, useState } from "react";

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
  role: "user" | "admin" | "super_admin" | null;
  setRole: (role: "user" | "admin" | "super_admin" | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: IProps) => {
  const [auth, setAuth] = useState<Auth>({});
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState<"user" | "admin" | "super_admin" | null>(
    null,
  );

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, isLogin, setIsLogin, role, setRole }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
