import React from "react";
import CustomTable from "../../../Commons/CommonComponents/Tables/CustomTable";
import { useMutation } from "@apollo/client";
import {
  AddJobSkill,
  DeleteJobSkill,
  UpdateJobSkillRating,
} from "../../../Apollo/Queries/JobQueries/JobSkillsQueries";
import JobSkillsModal from "../Modals/JobSkillsModal";
import { Jobs } from "../../../Apollo/Queries/JobQueries/JobQueries";
import { AddSkill } from "../../../Apollo/Queries/SkillsQueries";

export default function JobSkillsTable({ jobId, jobSkills }) {
  const [deleteJobSkill] = useMutation(DeleteJobSkill);
  const [updateJobSkill] = useMutation(UpdateJobSkillRating);
  const [addJobSkill] = useMutation(AddJobSkill);
  const [addSkill] = useMutation(AddSkill);

  const stopEditing = (i, editData) => {
    updateJobSkill({
      variables: {
        id: parseInt(editData.id),
        rating: parseInt(editData.rating),
      },
    });
  };

  const handleRemove = (i) => {
    deleteJobSkill({
      variables: { id: jobSkills[i].id },
      refetchQueries: [
        {
          query: Jobs,
        },
      ],
    }).then((r) => console.log(r));
  };

  const handleSubmit = (skills) => {
    skills.map((skill, key) => {
      if (skill.id === -1) {
        addSkill({
          variables: {
            name: skill.name,
          },
        }).then((r) => {
          addJobSkill({
            variables: {
              skillId: parseInt(r.data.createSkill.id),
              jobId: parseInt(jobId),
              rating: parseInt(skill.rating),
            },
            refetchQueries: [
              {
                query: Jobs,
              },
            ],
          });
        });
      } else {
        addJobSkill({
          variables: {
            skillId: parseInt(skill.id),
            jobId: parseInt(jobId),
            rating: parseInt(skill.rating),
          },
          refetchQueries: [
            {
              query: Jobs,
            },
          ],
        });
      }
    });
  };

  return (
    <>
      {jobSkills ? (
        <CustomTable
          stopEditing={stopEditing}
          handleRemove={handleRemove}
          data={jobSkills}
          header={[
            {
              name: "Rating",
              prop: "rating",
            },
            {
              name: "Skill Name",
              prop: "skill.name",
              disableUpdate: true,
            },
          ]}
          title="Skills table"
        />
      ) : null}
      <JobSkillsModal jobId={jobId} handleSubmit={handleSubmit} />
    </>
  );
}
