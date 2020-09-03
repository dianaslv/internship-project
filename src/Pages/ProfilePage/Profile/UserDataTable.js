import CustomTable from "../../../Commons/CommonComponents/Tables/CustomTable";
import React from "react";
import { UpdateUser } from "../../../Apollo/Queries/UserQueries/UserQueries";
import { useMutation } from "@apollo/client";

export default function UserDataTable({ data }) {
  const [updateUser] = useMutation(UpdateUser);

  const stopEditing = (i, editedData) => {
    updateUser({
      variables: {
        id: editedData.id,
        username: editedData.username,
        password: editedData.password,
        firstName: editedData.firstName,
        lastName: editedData.lastName,
      },
    });
  };

  return data ? (
    <>
      <CustomTable
        stopEditing={stopEditing}
        data={[data]}
        disableDelete={true}
        header={[
          {
            name: "First name",
            prop: "firstName",
          },
          {
            name: "Last name",
            prop: "lastName",
          },
          {
            name: "Username",
            prop: "username",
          },
          {
            name: "Password",
            prop: "password",
            specialFormatForDisplaying: "password",
            componentForEditing: "PasswordTextField",
          },
        ]}
        title="User Account Info"
      />
    </>
  ) : null;
}
