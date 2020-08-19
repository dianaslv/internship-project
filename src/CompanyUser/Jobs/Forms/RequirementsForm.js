import React from "react";
import MultipleInputs from "./MultipleInputs";

export default function RequirementForm(props) {
  const handleSubmit = (listOfRequirements) => {
    props.handleSubmit(listOfRequirements);
  };
  return <MultipleInputs handleSubmit={handleSubmit} />;
}
