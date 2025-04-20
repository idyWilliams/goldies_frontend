import { IAdmin, IUser } from "@/interfaces/user.interface";
import {
  createContext,
  MutableRefObject,
  useContext,
  useRef,
  useState,
} from "react";

interface Auth {
  user?: IUser;
  admin?: IAdmin;
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
  activePathRef: MutableRefObject<string>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: IProps) => {
  const [auth, setAuth] = useState<Auth>({});
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState<"user" | "admin" | "super_admin" | null>(
    null,
  );
  const activePathRef = useRef("");

  return (
    <AuthContext.Provider
      value={{
        auth,
        setAuth,
        isLogin,
        setIsLogin,
        role,
        setRole,
        activePathRef,
      }}
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
