import { useEffect, useState } from "react";
import { UserContext } from "./UserContext";

function loadUser() {
  try {
    const stored = sessionStorage.getItem("user");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(loadUser);

  useEffect(() => {
    if (user) {
      sessionStorage.setItem("user", JSON.stringify(user));
    } else {
      sessionStorage.removeItem("user");
    }
  }, [user]);

  function login(userData, token) {
    setUser(userData);
    if (token) {
      sessionStorage.setItem("authToken", token);
    }
  }

  function logout() {
    setUser(null);
    sessionStorage.removeItem("authToken");
  }

  const userId = user?.id ?? null;

  return (
    <UserContext.Provider value={{ user, userId, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};
