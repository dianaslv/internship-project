import React from "react";
import AddDataModal from "../../../Commons/AddDataModal";
import MultipleSkillsForm from "../../../CompanyUser/Jobs/Forms/MultipleSkillsForm";

export default function UserSkillsModal(props) {
  const handleSubmit = (skills) => {
    console.log(skills);
  };
  return (
    <div>
      <AddDataModal buttonText="Add Job Skill">
        <MultipleSkillsForm handleSubmit={handleSubmit} />
      </AddDataModal>
    </div>
  );
}
