import React from "react";
import MultipleInputs from "./MultipleInputs";

export default function BenefitsForm(props) {
  const handleSubmit = (listOfBenefits) => {
    props.handleSubmit(listOfBenefits);
  };

  return <MultipleInputs handleSubmit={handleSubmit} />;
}
