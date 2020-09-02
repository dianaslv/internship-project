import React from "react";
import { useState } from "react";
import UserSelector from "../../../Commons/CommonComponents/Selectors/UserSelector";

export default function CompanyGeneralInfoForm(props) {
  const [company, setCompany] = useState({
    name: "",
    userId: "",
    userName: "",
  });

  const handleChange = (options) => {
    console.log(options);
    const updatedCompany = { ...company };
    updatedCompany[options.name] = options.value;
    if (options.options) {
      const selectedIndex = options.options.selectedIndex;
      updatedCompany["userId"] = options.options[selectedIndex].getAttribute(
        "data-key"
      );
    }
    console.log(updatedCompany);
    setCompany(updatedCompany);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(company);
    props.handleSubmit(company);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Job Name</label>
      <input
        name="name"
        type="text"
        value={company.name}
        onChange={(e) =>
          handleChange({ name: e.target.name, value: e.target.value })
        }
      />
      <UserSelector
        field="userName"
        value={company.userName}
        handleChange={handleChange}
        i={0}
      />
      <button type="submit">Save Info</button>
    </form>
  );
}
