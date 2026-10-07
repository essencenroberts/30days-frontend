// custom hook const { user, login, logout } = useAuth()

import { useContext } from "react";
import type { AuthContextType } from "../context/AuthContent";
import AuthContext from "../context/AuthContent";

// authContextType full login ingo
function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  // if null 
  if (!context) {
    throw new Error('useAuth must be used inside AUthProvider');
  }
  return context;
}

export default useAuth;