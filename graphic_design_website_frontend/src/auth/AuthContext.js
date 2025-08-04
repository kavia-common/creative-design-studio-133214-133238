import React, { createContext, useContext, useState, useEffect } from "react";

// PUBLIC_INTERFACE
// Authentication state and provider for the app.
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Simulate login persistence (to be replaced with real logic)
  useEffect(() => {
    const storedUser = localStorage.getItem("gfx-user");
    if (storedUser) setUser(JSON.parse(storedUser));
    setLoading(false);
  }, []);

  // PUBLIC_INTERFACE
  function login(username, password) {
    // Stub: Replace with API
    const fakeUser = { username, id: "001" };
    setUser(fakeUser);
    localStorage.setItem("gfx-user", JSON.stringify(fakeUser));
    return Promise.resolve(fakeUser);
  }

  // PUBLIC_INTERFACE
  function logout() {
    setUser(null);
    localStorage.removeItem("gfx-user");
  }

  // PUBLIC_INTERFACE
  function signup(email, password) {
    // Stub: Replace with API
    return login(email, password);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
}
