import React from "react";
import AddDataModal from "../../../../Commons/CommonComponents/AddDataModal";
import MultipleSkillsForm from "../../../CompanyUser/Forms/MultipleSkillsForm";
import { useMutation } from "@apollo/client";
import { AddJobSkill } from "../../../../Apollo/Queries/JobQueries/JobSkillsQueries";
import { AddSkill } from "../../../../Apollo/Queries/SkillsQueries";
import { AddUserSkill } from "../../../../Apollo/Queries/UserQueries/UserSkillsQueries";

export default function UserSkillsModal(props) {
  return (
    <div>
      <AddDataModal buttonText="Add Job Skill">
        <MultipleSkillsForm handleSubmit={props.handleSubmit} />
      </AddDataModal>
    </div>
  );
}
