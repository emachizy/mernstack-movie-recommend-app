import { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import api from "../services/api";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch user on mount to check session from cookie
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await api.get("/user/me", { withCredentials: true });
        setUser(res.data.user);
      } catch (err) {
        console.error(err);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, []);

  const login = async (email, password) => {
    const res = await api.post(
      "/auth/login",
      { email, password },
      { withCredentials: true }
    );
    setUser(res.data.user);

    return res.data;
  };

  const register = async (name, email, password) => {
    const res = await api.post(
      "/auth/register",
      { name, email, password },
      { withCredentials: true }
    );
    setUser(res.data.user);
    return res.data;
  };

  const logout = async () => {
    await api.post("/auth/logout", {}, { withCredentials: true });
    console.log("User logged out");
    setUser(null);
  };

  if (loading) return null; // Or show spinner

  return (
    <AuthContext.Provider value={{ user, setUser, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
