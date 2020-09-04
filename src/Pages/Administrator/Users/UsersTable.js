import React from "react";
import CustomTable from "../../../Commons/CommonComponents/Tables/CustomTable";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddUser,
  DeleteUser,
  UpdateUser,
  Users,
} from "../../../Apollo/Queries/UserQueries/UserQueries";
import AddUserModal from "./AddUserModal";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function UsersTable() {
  const [addUser] = useMutation(AddUser);
  const [updateUser] = useMutation(UpdateUser);
  const [deleteUser] = useMutation(DeleteUser);
  const { data: users, loading } = useQuery(Users);

  if (loading) return <CircularProgress />;

  const handleRemove = async (i) => {
    await deleteUser({
      variables: { id: [users.users[i].id] },
      update: (cache) => {
        const existingUsers = cache.readQuery({ query: Users });
        const newUsers = existingUsers.users.filter(
          (t) => t.id !== users.users[i].id
        );
        cache.writeQuery({
          query: Users,
          data: { users: newUsers, __typename: "User" },
        });
      },
    });
  };

  const stopEditing = (i, editedData) => {
    console.log(editedData);
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

  const handleSubmit = (submittedUser) => {
    addUser({
      variables: {
        username: submittedUser.username,
        password: submittedUser.password,
        firstName: submittedUser.firstName,
        lastName: submittedUser.lastName,
        userRoleId: 2,
      },
      update: (cache, { data: user }) => {
        const existingUsers = cache.readQuery({ query: Users });
        const newUsers = Object.assign([], existingUsers.users);
        newUsers.push(user.createUser);
        cache.writeQuery({
          query: Users,
          data: { users: newUsers, __typename: "User" },
        });
      },
    }).then((r) => console.log(r));
  };

  return users && users.users ? (
    <>
      <AddUserModal handleSubmit={handleSubmit} />
      <CustomTable
        handleRemove={handleRemove}
        stopEditing={stopEditing}
        data={users.users}
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
        ]}
        title="Users table"
      />
    </>
  ) : (
    <CircularProgress />
  );
}
