import { useAppContext } from "../../../Context/ContextProvider";
import CustomTable from "../../../Commons/CommonComponents/CustomTable";
import React, { useState } from "react";
import { UpdateUser } from "../../../Apollo/Queries/UserQueries/UserQueries";
import { useMutation } from "@apollo/client";

export default function UserDataTable() {
  const { user, updateUser } = useAppContext();
  const [userData, updateUserData] = useState(user);
  const [index, setIndex] = useState(-1);
  const [getUpdatedUser] = useMutation(UpdateUser);

  const startEditing = (i) => {
    setIndex(i);
  };

  const stopEditing = () => {
    const updatedUser = { ...userData };
    getUpdatedUser({
      variables: {
        id: updatedUser.id,
        username: updatedUser.username,
        password: updatedUser.password,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      },
    }).then((r) => {
      console.log(r);
      setIndex(-1);
    });
  };

  const handleChange = (options) => {
    const updatedUser = { ...userData };
    updatedUser[options.name] = options.value;
    updateUserData(updatedUser);
  };

  return user.id ? (
    <>
      <CustomTable
        startEditing={startEditing}
        editIdx={index}
        stopEditing={stopEditing}
        handleChange={handleChange}
        data={[userData]}
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
          },
        ]}
        title="User Account Info"
      />
    </>
  ) : null;
}
