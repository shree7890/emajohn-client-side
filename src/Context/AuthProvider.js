import { createContext } from "react";
import useFirebase from "../CustomHooks/useFirebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const contextAll = useFirebase();
  return (
    <AuthContext.Provider value={contextAll}>{children}</AuthContext.Provider>
  );
};
