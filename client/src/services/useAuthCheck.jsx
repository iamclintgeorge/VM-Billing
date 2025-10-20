import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_admin_server}/api/check-auth`,
          { withCredentials: true }
        );

        if (response.data.authenticated) {
          setIsAuthenticated(true);
          setUser(response.data.user);

          // Redirect logged-in users away from /login or /signup
          if (
            window.location.pathname === "/login" ||
            window.location.pathname === "/signup"
          ) {
            navigate("/dashboard");
          }
        } else {
          // Allow access to /login and /signup
          if (
            window.location.pathname === "/login" ||
            window.location.pathname === "/signup"
          ) {
            setIsAuthenticated(false);
          } else {
            navigate("/login");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        if (error.response) {
          setMessage(
            error.response.data.message || "You are not authenticated."
          );

          // Only navigate if we're not already on login or signup pages
          if (
            error.response.status === 401 &&
            window.location.pathname !== "/login" &&
            window.location.pathname !== "/signup"
          ) {
            navigate("/login");
          }
        } else {
          setMessage("Failed to load message due to network issue.");
        }
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        message,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
