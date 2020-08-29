import React, { useEffect, useState } from "react";
import CustomTable from "../../../Commons/CommonComponents/CustomTable";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddJobSkill,
  DeleteJobSkill,
  UpdateJobSkillRating,
} from "../../../Apollo/Queries/JobQueries/JobSkillsQueries";
import JobSkillsModal from "../Modals/JobSkillsModal";
import { GetJobSkillsById } from "../../../Apollo/Queries/JobQueries/JobQueries";
import { AddSkill } from "../../../Apollo/Queries/SkillsQueries";

export default function JobSkillsTable(props) {
  const [index, setIndex] = useState(-1);
  const [deleteJobSkill] = useMutation(DeleteJobSkill);
  const [getUpdatedJobSkillRating] = useMutation(UpdateJobSkillRating);
  const { data, loading } = useQuery(GetJobSkillsById, {
    variables: { id: props.jobId },
  });
  const [jobSkills, setJobSkills] = useState([]);

  const [addJobSkill, { data: addedJobSkill }] = useMutation(AddJobSkill);
  const [addSkill] = useMutation(AddSkill);

  useEffect(() => {
    if (data) {
      let updatedJobSkills = [];
      data.job.jobSkills.map((jobSkill, key) =>
        updatedJobSkills.push({
          id: jobSkill.id,
          rating: jobSkill.rating,
          skillId: jobSkill.skill.id,
          skillName: jobSkill.skill.name,
        })
      );
      setJobSkills(updatedJobSkills);
      console.log(updatedJobSkills, jobSkills);
    }
  }, [data]);

  if (loading) return null;

  const startEditing = (i) => {
    setIndex(i);
    console.log("start editing", index);
  };

  const stopEditing = (i) => {
    let updatedSkill = jobSkills[i];
    console.log("submit", updatedSkill.id, updatedSkill.name, props.jobId);
    setIndex(-1);

    getUpdatedJobSkillRating({
      variables: {
        id: parseInt(updatedSkill.id),
        rating: parseInt(updatedSkill.rating),
      },
    }).then((r) => {
      console.log(r);
      setIndex(-1);
    });
  };

  const handleChange = (options) => {
    const updatedJobSkills = [...jobSkills];
    updatedJobSkills[options.index][options.name] = options.value;
    setJobSkills(updatedJobSkills);
  };

  const handleRemove = (i) => {
    deleteJobSkill({
      variables: { id: jobSkills[i].id },
      refetchQueries: [
        {
          query: GetJobSkillsById,
          variables: {
            id: props.jobId,
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
              jobId: parseInt(props.jobId),
              rating: parseInt(skill.rating),
            },
            refetchQueries: [
              {
                query: GetJobSkillsById,
                variables: {
                  id: props.jobId,
                },
              },
            ],
          }).then((r) => console.log(r));
        });
      } else {
        addJobSkill({
          variables: {
            skillId: parseInt(skill.id),
            jobId: parseInt(props.jobId),
            rating: parseInt(skill.rating),
          },
          refetchQueries: [
            {
              query: GetJobSkillsById,
              variables: {
                id: props.jobId,
              },
            },
          ],
        }).then((r) => {
          console.log(addedJobSkill);
        });
      }
    });
  };

  return (
    jobSkills && (
      <>
        {jobSkills.length > 0 && (
          <CustomTable
            startEditing={startEditing}
            editIdx={index}
            stopEditing={stopEditing}
            handleChange={handleChange}
            handleRemove={handleRemove}
            data={jobSkills}
            header={[
              {
                name: "Rating",
                prop: "rating",
              },
              {
                name: "Skill Name",
                prop: "skillName",
                disableUpdate: true,
              },
            ]}
            title="Skills table"
          />
        )}
        <JobSkillsModal jobId={props.jobId} handleSubmit={handleSubmit} />
      </>
    )
  );
}
