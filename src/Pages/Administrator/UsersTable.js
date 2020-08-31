import React, { useEffect, useState } from "react";
import CustomTable from "../../Commons/CommonComponents/Tables/CustomTable";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddUser,
  DeleteUser,
  UpdateUser,
  Users,
} from "../../Apollo/Queries/UserQueries/UserQueries";
import AddUserModal from "./Modals/AddUserModal";

export default function UsersTable() {
  const [addUser, { data: addUserReceivedData }] = useMutation(AddUser);
  const [users, setUsers] = useState();
  const [index, setIndex] = useState(-1);
  const [getUpdatedUsers, { data: updatedData }] = useMutation(UpdateUser);
  const [deleteUser] = useMutation(DeleteUser);
  const { data: usersData, loading } = useQuery(Users);

  useEffect(() => {
    if (usersData) {
      const transformedUsers = transformData(usersData.users);
      setUsers([...transformedUsers]);
    }
  }, [usersData]);

  if (loading) return null;

  const transformData = (newData) => {
    const newArr = [];
    newData.map((user, key) => {
      let newUser = {};
      newUser.id = user["id"];
      newUser.username = user["username"];
      newUser.password = user["password"];
      newUser.firstName = user["firstName"];
      newUser.lastName = user["lastName"];
      newUser.userRole = user["userRole"]["name"];
      newArr.push(newUser);
    });
    return newArr;
  };

  const handleRemove = async (i) => {
    //setUserToDelete(users[i]);
    await deleteUser({
      variables: { id: [users[i].id] },
      update: (cache) => {
        const existingUsers = cache.readQuery({ query: Users });
        const newUsers = existingUsers.users.filter(
          (t) => t.id !== users[i].id
        );
        cache.writeQuery({
          query: Users,
          data: { users: newUsers, __typename: "User" },
        });
      },
    });
  };

  const startEditing = (i) => {
    setIndex(i);
  };

  const stopEditing = (i) => {
    let updatedUser = users[i];
    getUpdatedUsers({
      variables: {
        id: updatedUser.id,
        username: updatedUser.username,
        password: updatedUser.password,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      },
    }).then((r) => {
      const updatedUsers = [...users];
      updatedUsers[i] = updatedUser;
      setUsers(updatedUsers);
      setIndex(-1);
    });
  };

  const handleChange = (options) => {
    users.map((user, userKey) => {
      if (options.index === userKey) {
        const updatedUsers = [...users];
        updatedUsers[options.index][options.name] = options.value;
        setUsers(updatedUsers);
      }
    });
  };

  const handleSubmit = (submittedUser) => {
    addUser({
      variables: {
        username: submittedUser.username,
        password: submittedUser.password,
        firstName: submittedUser.firstName,
        lastName: submittedUser.lastName,
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

  return users ? (
    <>
      <AddUserModal handleSubmit={handleSubmit} />
      <CustomTable
        handleRemove={handleRemove}
        startEditing={startEditing}
        editIdx={index}
        stopEditing={stopEditing}
        handleChange={handleChange}
        data={users}
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
        title="Users table"
      />
    </>
  ) : null;
}
