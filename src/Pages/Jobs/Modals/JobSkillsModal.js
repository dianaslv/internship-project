import React from "react";
import AddDataModal from "../../../Commons/CommonComponents/AddDataModal";
import MultipleSkillsForm from "../Forms/MultipleSkillsForm";

export default function JobSkillsModal(props) {
  return (
    <div>
      <AddDataModal buttonText="Add Job Skill">
        <MultipleSkillsForm handleSubmit={props.handleSubmit} />
      </AddDataModal>
    </div>
  );
}
