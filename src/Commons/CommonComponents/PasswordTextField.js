import TextField from "@material-ui/core/TextField";
import React from "react";

export default function PasswordTextField(props) {
  const [value, setValue] = React.useState(props.value);
  console.log(props.value);

  const handleChange = (event) => {
    event.preventDefault();
    setValue(event.target.value);
    props.handleChange({
      value: event.target.value,
      name: event.target.name,
    });
  };

  return (
    <TextField
      id="password"
      name="password"
      type="password"
      value={value}
      onChange={handleChange}
    />
  );
}
