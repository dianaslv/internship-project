import CountrySelector from "./Selectors/CountrySelector";
import DateTimePickerComponent from "./Date/DateTimePickerComponent";
import React from "react";
import UserSelector from "./Selectors/UserSelector";

const components = {
  CountrySelector: CountrySelector,
  DateTimePickerComponent: DateTimePickerComponent,
  UserSelector: UserSelector,
};

export default function getComponentForEditing(
  field,
  value,
  componentForEditingName,
  i,
  handleChange
) {
  const MyComponent = components[componentForEditingName];

  return (
    <MyComponent
      field={field}
      value={value}
      handleChange={handleChange}
      i={i}
    />
  );
}
