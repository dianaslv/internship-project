import React from "react";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { withRouter } from "react-router-dom";

export default function RegisterUserForm({ handleSubmitData }) {
  const [user, setUser] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
  });

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    handleSubmitData(user);
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
          First Name
          <input
            name="firstName"
            type="text"
            value={user.firstName}
            onChange={(event) => {
              event.preventDefault();
              handleChange(event);
            }}
          />
        </label>

        <label>
          Last Name
          <input
            name="lastName"
            type="text"
            value={user.lastName}
            onChange={(event) => {
              event.preventDefault();
              handleChange(event);
            }}
          />
        </label>

        <label>
          Email
          <input
            name="username"
            type="text"
            value={user.username}
            onChange={(event) => {
              event.preventDefault();
              handleChange(event);
            }}
          />
        </label>

        <label>
          Password
          <input
            name="password"
            type="text"
            value={user.password}
            onChange={(event) => {
              event.preventDefault();
              handleChange(event);
            }}
          />
        </label>

        <button type="submit">Register account</button>
      </form>
    </div>
  );
}
