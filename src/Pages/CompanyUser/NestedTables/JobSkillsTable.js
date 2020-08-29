import React, { useState } from "react";
import CustomTable from "../../../Commons/CommonComponents/CustomTable";
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
  };

  const handleChange = (options) => {
    props.handleUpdateJobSkill(
      options.value,
      options.name,
      props.positionInJobSkillsTable,
      options.index
    );
  };

  const handleRemove = (i) => {
    deleteJobSkill({
      variables: { id: skills[i].id },
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
