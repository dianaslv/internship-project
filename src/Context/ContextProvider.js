import React, { useContext, useState } from "react";
import { AppContext, defaultValue } from "./AppContext";

export default function ContextProvider({ children }) {
  const [user, setUser] = useState(defaultValue);

  const updateUser = (newUser) =>
    setUser((prevUser) => {
      return {
        ...prevUser,
        id: newUser.id,
        username: newUser.username,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        password: newUser.password,
        userRole: newUser.userRole.name,
      };
    });

  const contextValue = {
    user,
    updateUser,
  };
  return (
    <>
      <AppContext.Provider value={contextValue}>{children}</AppContext.Provider>
    </>
  );
}

export const useAppContext = () => useContext(AppContext);
