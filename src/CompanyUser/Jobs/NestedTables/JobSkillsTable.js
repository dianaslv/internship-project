import React, { useState } from "react";
import CustomTable from "../../../Commons/CustomTable";
import { useMutation } from "@apollo/client";
import {
  DeleteJobSkill,
  UpdateJobSkillRating,
} from "../../../Apollo/Queries/JobQueries/JobSkillsQueries";
import JobSkillsModal from "../Modals/JobSkillsModal";

export default function JobSkillsTable(props) {
  const [index, setIndex] = useState(-1);
  const { skills } = props;
  const [deleteJobSkill] = useMutation(DeleteJobSkill);
  const [
    getUpdatedJobSkillRating,
    { data: updatedJobSkillRating },
  ] = useMutation(UpdateJobSkillRating);

  console.log("skills in table", skills);
  const startEditing = (i) => {
    setIndex(i);
    console.log("start editing", index);
  };

  const stopEditing = (i) => {
    let updatedSkill = skills[i];
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

    /*
        getUpdatedJobSkills({
            variables: {
                id: updatedSkill.id,
                name: updatedSkill.name,
                jobId: props.jobId
            }
        }).then(r => {
            console.log(r);
            console.log(updatedJobSkills,updatedSkill)
            //props.handleSubmitJobSkill(updatedSkill,props.positionInJobSkillsTable);
            setIndex(-1);
        });
        */
  };

  const handleChange = (e, name, i) => {
    const { value } = e.target;
    console.log(value, name, i);
    props.handleUpdateJobSkill(
      e.target.value,
      e.target.name,
      props.positionInJobSkillsTable,
      i
    );
  };

  const handleRemove = (i) => {
    deleteJobSkill({
      variables: { id: skills[i].id },
      /*,
                update: (cache) => {
                    const existingUsers = cache.readQuery({query: JobSkills});
                    const newUsers = existingUsers.jobSkills.filter(t => (t.id !== skills[i].id));
                    cache.writeQuery({
                        query: JobSkills,
                        data: {jobSkills: newUsers, __typename: "JobSkill"}
                    });
                }*/
    }).then((r) => console.log(r));
  };

  return skills ? (
    <>
      <CustomTable
        startEditing={startEditing}
        editIdx={index}
        stopEditing={stopEditing}
        handleChange={handleChange}
        handleRemove={handleRemove}
        data={skills}
        header={[
          {
            name: "Id",
            prop: "id",
          },
          {
            name: "Rating",
            prop: "rating",
          },
          {
            name: "Skill Id",
            prop: "skillId",
          },
          {
            name: "Skill Name",
            prop: "skillName",
            disableUpdate: true,
          },
        ]}
        title="Skills table"
      />
      <JobSkillsModal jobId={props.jobId} />
    </>
  ) : null;
}
