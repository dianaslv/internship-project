import React from "react";

export const defaultValue = {
  user: {
    id: 0,
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    userRole: {
      id: 0,
      name: "",
    },
  },
};
export const AppContext = React.createContext(defaultValue);
