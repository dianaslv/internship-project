import React from "react";
import AddDataModal from "../../../../Commons/CommonComponents/AddDataModal";
import MultipleSkillsForm from "../../../CompanyUser/Forms/MultipleSkillsForm";
import { useMutation } from "@apollo/client";
import { AddJobSkill } from "../../../../Apollo/Queries/JobQueries/JobSkillsQueries";
import { AddSkill } from "../../../../Apollo/Queries/SkillsQueries";
import { AddUserSkill } from "../../../../Apollo/Queries/UserQueries/UserSkillsQueries";

export default function UserSkillsModal(props) {
  const [addUserSkill, { data: addedUserSkill }] = useMutation(AddUserSkill);
  const [addSkill, { data: addedSkill }] = useMutation(AddSkill);

  const handleSubmit = (skills) => {
    skills.map((skill, key) => {
      if (skill.id === -1) {
        addSkill({
          variables: {
            name: skill.name,
          },
        }).then((r) => {
          console.log(r.data.createSkill.id);
          addUserSkill({
            variables: {
              skillId: parseInt(r.data.createSkill.id),
              userId: parseInt(props.userId),
              rating: parseInt(skill.rating),
            },
          }).then((r) => console.log(r));
        });
      } else {
        addUserSkill({
          variables: {
            skillId: parseInt(skill.id),
            userId: parseInt(props.userId),
            rating: parseInt(skill.rating),
          },
        }).then((r) => {
          console.log(addedUserSkill);
        });
      }
    });
  };
  return (
    <div>
      <AddDataModal buttonText="Add Job Skill">
        <MultipleSkillsForm handleSubmit={handleSubmit} />
      </AddDataModal>
    </div>
  );
}
