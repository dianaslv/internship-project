import React from "react";
import NameInput from "../../../Commons/CommonComponents/Forms/NameInput";

export default function BenefitsForm(props) {
  const handleSubmit = (listOfBenefits) => {
    props.handleSubmit(listOfBenefits);
  };

  return <NameInput handleSubmit={handleSubmit} />;
}
