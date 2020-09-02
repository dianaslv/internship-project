import React, { useEffect, useState } from "react";
import CustomTable from "../../../Commons/CommonComponents/Tables/CustomTable";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddJobSkill,
  DeleteJobSkill,
  UpdateJobSkillRating,
} from "../../../Apollo/Queries/JobQueries/JobSkillsQueries";
import JobSkillsModal from "../Modals/JobSkillsModal";
import { GetJobSkillsById } from "../../../Apollo/Queries/JobQueries/JobQueries";
import { AddSkill } from "../../../Apollo/Queries/SkillsQueries";

export default function JobSkillsTable({ jobId, jobSkills }) {
  const [deleteJobSkill] = useMutation(DeleteJobSkill);
  const [getUpdatedJobSkillRating] = useMutation(UpdateJobSkillRating);
  const [addJobSkill, { data: addedJobSkill }] = useMutation(AddJobSkill);
  const [addSkill] = useMutation(AddSkill);

  const stopEditing = (i, editData) => {
    getUpdatedJobSkillRating({
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
          query: GetJobSkillsById,
          variables: {
            id: jobId,
          },
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
          console.log(r.data.createSkill.id);
          addJobSkill({
            variables: {
              skillId: parseInt(r.data.createSkill.id),
              jobId: parseInt(jobId),
              rating: parseInt(skill.rating),
            },
            refetchQueries: [
              {
                query: GetJobSkillsById,
                variables: {
                  id: jobId,
                },
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
              query: GetJobSkillsById,
              variables: {
                id: jobId,
              },
            },
          ],
        });
      }
    });
  };

  return (
    jobSkills && (
      <>
        {jobSkills.length > 0 && (
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
        )}
        <JobSkillsModal jobId={jobId} handleSubmit={handleSubmit} />
      </>
    )
  );
}
