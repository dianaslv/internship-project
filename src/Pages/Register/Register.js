import React from "react";
import { useMutation } from "@apollo/client";
import RegisterUserForm from "../../Commons/CommonComponents/Forms/RegisterUserForm";
import { withRouter } from "react-router-dom";
import { AddUser } from "../../Apollo/Queries/UserQueries/UserQueries";

function Register(props) {
  const [addUser, { data }] = useMutation(AddUser);

  const handleSubmit = (user) => {
    addUser({
      variables: {
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        userRoleId: 3,
      },
    }).then((r) => {
      const { history } = props;
      history.push("/login");
    });
  };

  return <RegisterUserForm handleSubmitData={handleSubmit} />;
}

export default withRouter(Register);
