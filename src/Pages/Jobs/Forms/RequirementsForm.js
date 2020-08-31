import React from "react";
import NameInput from "../../../Commons/CommonComponents/Forms/NameInput";

export default function RequirementForm(props) {
  const handleSubmit = (listOfRequirements) => {
    props.handleSubmit(listOfRequirements);
  };
  return <NameInput handleSubmit={handleSubmit} />;
}
