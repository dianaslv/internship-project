import React from "react";
import NameInput from "../../../Commons/CommonComponents/NameInput";

export default function BenefitsForm(props) {
  const handleSubmit = (listOfBenefits) => {
    props.handleSubmit(listOfBenefits);
  };

  return <NameInput handleSubmit={handleSubmit} />;
}
