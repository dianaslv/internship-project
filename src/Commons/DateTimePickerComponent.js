import React from "react";
import DateTimePicker from "./DateTimePicker";

export default function DateTimePickerComponent(props) {
  return (
    <DateTimePicker
      field={props.field}
      row={props.i}
      handleChange={props.handleChange}
    />
  );
}
