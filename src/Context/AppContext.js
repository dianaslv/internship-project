import React, {useState, useContext} from "react";

export const defaultValue = {
    user: {
        id:0,
        username:"",
        firstName:"",
        lastName:"",
        password:"",
        userRole:"sys_admin"
    }
};
export const AppContext = React.createContext(defaultValue);


