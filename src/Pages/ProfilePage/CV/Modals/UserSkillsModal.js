import React from "react";
import AddDataModal from "../../../../Commons/CommonComponents/AddDataModal";
import MultipleSkillsForm from "../../../CompanyUser/Forms/MultipleSkillsForm";

export default function UserSkillsModal(props) {
  return (
    <div>
      <AddDataModal buttonText="Add Job Skill">
        <MultipleSkillsForm handleSubmit={props.handleSubmit} />
      </AddDataModal>
    </div>
  );
}
