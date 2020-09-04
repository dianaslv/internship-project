import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import getComponentForEditing from "../../../Commons/CommonComponents/SpecialFormatComponentsForEditing";

export default function ContactInfoForm(props) {
  const [contactInfo, setContactInfo] = useState({
    email: "",
    phone: "",
    countryName: "",
    city: "",
    website: "",
    avatarUrl: "",
    about: "",
  });

  const handleChange = (options) => {
    const updatedContactInfo = { ...contactInfo };
    updatedContactInfo[options.name] = options.value;
    if (options.options) {
      const selectedIndex = options.options.selectedIndex;
      const key = options.options[selectedIndex].getAttribute("data-key");
      updatedContactInfo["countryId"] = key;
    }
    setContactInfo(updatedContactInfo);
  };

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        props.handleSubmit(contactInfo);
      }}
    >
      {Object.entries(contactInfo).map((entry) => {
        return (
          <>
            {entry[0] === "countryName" &&
              getComponentForEditing(
                entry[0],
                entry[1],
                "CountrySelector",
                0,
                handleChange
              )}
            {entry[0] !== "countryName" && entry[0] !== "countryId" && (
              <TextField
                variant="outlined"
                fullWidth
                name={entry[0]}
                type="text"
                value={entry[1]}
                onChange={(event) => {
                  event.preventDefault();
                  handleChange({
                    name: event.target.name,
                    value: event.target.value,
                  });
                }}
                label={entry[0]}
                autoFocus
              />
            )}
          </>
        );
      })}
      <Button type="submit" fullWidth variant="contained" color="primary">
        Add contact info
      </Button>
    </form>
  );
}
