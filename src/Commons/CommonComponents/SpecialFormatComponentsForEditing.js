import CountrySelector from "./Selectors/CountrySelector";
import DateTimePickerComponent from "./Date/DateTimePickerComponent";
import React from "react";
import UserSelector from "./Selectors/UserSelector";
import AvailabilityRadioButton from "./Availability/AvailabilityRadioButton";
import PasswordTextField from "./PasswordTextField";

const components = {
  CountrySelector: CountrySelector,
  DateTimePickerComponent: DateTimePickerComponent,
  UserSelector: UserSelector,
  AvailabilityRadioButton: AvailabilityRadioButton,
  PasswordTextField: PasswordTextField,
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
