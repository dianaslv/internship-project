import React from "react";
import { withRouter } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { useAppContext } from "../Context/ContextProvider";
import { Users } from "../Apollo/Queries/UserQueries/UserQueries";

function UserLoginForm() {
  const { updateUser } = useAppContext();
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const [getUsers, { data }] = useLazyQuery(Users, {
    onCompleted({ getUsers }) {
      if (data) {
        let founded = 0;
        data.users.find((user) => {
          if (
            user.username === state.username &&
            state.password === user.password
          ) {
            alert("Account exists");
            founded = 1;
            updateUser(user);
            console.log(user.userRole.name);
            history.push("/home");
          }
        });
        if (!founded) {
          alert("Account doesn't exists");
          history.push("/register");
        }
      }
    },
  });
  const history = useHistory();

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    getUsers();
  };

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          handleSubmit(event);
        }}
      >
        <label>
          Email
          <input
            name="username"
            type="text"
            value={state.username}
            onChange={(event) => {
              event.preventDefault();
              handleChange(event);
            }}
          />
        </label>
        <br />
        <label>
          Password
          <input
            name="password"
            type="text"
            value={state.password}
            onChange={(event) => {
              event.preventDefault();
              handleChange(event);
            }}
          />
        </label>
        <br />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default withRouter(UserLoginForm);
