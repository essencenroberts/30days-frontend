//  

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import AuthContext from "./AuthContent";
import type { AuthContextType } from "./AuthContent";
import api from "../api/client";
import type { AuthResponse, User } from "../types";


// 
interface AuthProviderProps {
  children: ReactNode;
}

function AuthProvider({ children }: AuthProviderProps) {

  const [user, setUser] = useState<User | null>(null);

  const [authLoading, setAuthLoading] = useState(true);

  // check for saved token 
  useEffect(() => {
    async function checkSavedToken() {
      const savedToken = localStorage.getItem('token');

      if (!savedToken) {
        setAuthLoading(false);
        return;
      }

      try {
        const response = await api.get<User>('/users/me');
        setUser(response.data);
      } catch {
        localStorage.removeItem('token');
        setUser(null);
      } finally {
        setAuthLoading(false);
      }
    }
    checkSavedToken();
  }, [])


// save token + user

function saveSession(data: AuthResponse) {
  localStorage.setItem('token', data.token);
  setUser(data.user);
}

  // login and register
  async function login(email: string, password: string): Promise<User> {
    const response = await api.post<AuthResponse>('/users/login', {  email, password });
    saveSession(response.data);
    return response.data.user;
  }

  async function register(username: string, email: string, password: string): Promise<User> {
    const response = await api.post<AuthResponse>('/users/register', {username, email, password});
    saveSession(response.data);
    return response.data.user;
  }

  // logging out
  function logout() {
    localStorage.removeItem('token');
    setUser(null);
  }


  // check
  const value: AuthContextType = {
    user,
    isLoggedIn: !!user,
    authLoading,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export default AuthProvider;