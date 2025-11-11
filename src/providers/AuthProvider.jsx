import { createContext, useCallback, useContext, useLayoutEffect, useState } from "react";
import axiosInstance from "../lib/axiosInstance";

const AuthContext = createContext();
export const useAuthContext = () => useContext(AuthContext);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null);

  const refetch = useCallback(async () => {
    try {
      const { data } = await axiosInstance.get("/user");
      setUser(data.data);
      localStorage.setItem("user", JSON.stringify(data.data));
    } catch (error) {
      if (error?.response?.status === 401) {
        setUser(null);
        localStorage.removeItem("user");
      }
    }
  }, []);

  const logout = useCallback(async () => {
    await axiosInstance.post("/auth/logout");
    localStorage.removeItem("user");
    setUser(null);
  }, []);

  useLayoutEffect(() => {
    refetch();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        refetch,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
