import React, { useState } from "react";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import { useQuery } from "@apollo/client";
import { Users } from "../../../Apollo/Queries/UserQueries/UserQueries";

export default function UserSelector(props) {
  const [user] = useState({ id: "", username: "" });
  const { data: usersData, loading } = useQuery(Users);

  console.log(props);

  if (loading) return null;

  return (
    <Select
      name="userName"
      native
      value={props.value}
      onChange={(e) =>
        props.handleChange({
          options: e.target.options,
          value: e.target.value,
          name: e.target.name,
          index: props.i,
        })
      }
      input={<Input id="demo-dialog-native" />}
    >
      <option aria-label="None" value="" />
      {usersData &&
        user &&
        usersData.users.map((currentUser) => (
          <option data-key={currentUser.id} value={currentUser.username}>
            {currentUser.username}
          </option>
        ))}
    </Select>
  );
}
