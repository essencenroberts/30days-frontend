// impprt createContent + Yser type
import { createContext } from "react";
import type { User } from "../types";


// interface 
export interface AuthContextType {
  user: User | null;
  isLoggedIn: boolean;
  authLoading: boolean:
  login: (email: string, password: string) => Promise<User>;
  register: (username: string, email:string, password: string) => Promise<User>;
  logout: () => void;
}

// context
const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;