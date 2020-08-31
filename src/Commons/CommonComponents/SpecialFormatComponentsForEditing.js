import CountrySelector from "./CountrySelector";
import DateTimePickerComponent from "./DateTimePickerComponent";
import React from "react";

const components = {
  CountrySelector: CountrySelector,
  DateTimePickerComponent: DateTimePickerComponent,
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
