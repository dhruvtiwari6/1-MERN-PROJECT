import React, { createContext, useState } from "react";

// Create the UserContext
export const UserContext = createContext();

// UserProvider component
export const UserProvider = ({ children }) => {
  const [UserDetails, setUserDetails] = useState({});

  return (
    <UserContext.Provider value={{ UserDetails, setUserDetails }}>
      {children}
    </UserContext.Provider>
  );
};
