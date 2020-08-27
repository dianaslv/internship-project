import React from "react";
import AddDataModal from "../../../Commons/CommonComponents/AddDataModal";
import { useMutation } from "@apollo/client";
import { AddJobSkill } from "../../../Apollo/Queries/JobQueries/JobSkillsQueries";
import { AddSkill } from "../../../Apollo/Queries/SkillsQueries";
import MultipleSkillsForm from "../Forms/MultipleSkillsForm";

export default function JobSkillsModal(props) {
  const [addJobSkill, { data: addedJobSkill }] = useMutation(AddJobSkill);
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
          addJobSkill({
            variables: {
              skillId: parseInt(r.data.createSkill.id),
              jobId: parseInt(props.jobId),
              rating: parseInt(skill.rating),
            },
          }).then((r) => console.log(r));
        });
      } else {
        addJobSkill({
          variables: {
            skillId: parseInt(skill.id),
            jobId: parseInt(props.jobId),
            rating: parseInt(skill.rating),
          },
        }).then((r) => {
          console.log(addedJobSkill);
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
