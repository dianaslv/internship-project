import React, { useState } from "react";
import CustomTable from "../../../../Commons/CommonComponents/CustomTable";
import { useMutation } from "@apollo/client";
import JobSkillsModal from "../../../CompanyUser/Modals/JobSkillsModal";
import { UpdateJobSkillRating } from "../../../../Apollo/Queries/JobQueries/JobSkillsQueries";
import {
  DeleteUserSkill,
  UpdateUserSkillRating,
} from "../../../../Apollo/Queries/UserQueries/UserSkillsQueries";
import UserSkillsModal from "../Modals/UserSkillsModal";

export default function UserSkillsTable(props) {
  const [index, setIndex] = useState(-1);
  const { skills } = props;
  const [
    getUpdatedUserSkillRating,
    { data: updatedUserSkillRating },
  ] = useMutation(UpdateUserSkillRating);

  const startEditing = (i) => {
    setIndex(i);
    console.log("start editing", index);
  };

  const handleChange = (options) => {
    props.handleUpdateUserSkill(options.value, options.name, options.index);
  };

  const stopEditing = (i) => {
    let updatedSkill = skills[i];
    console.log("submit", updatedSkill.id, updatedSkill.name, props.userId);

    getUpdatedUserSkillRating({
      variables: {
        id: parseInt(updatedSkill.id),
        rating: parseInt(updatedSkill.rating),
      },
    }).then((r) => {
      console.log(r);
      setIndex(-1);
    });
  };

  const handleRemove = (i) => {
    props.handleDeleteUserSkill(i);
  };

  return skills ? (
    <>
      <CustomTable
        editIdx={index}
        startEditing={startEditing}
        stopEditing={stopEditing}
        handleChange={handleChange}
        handleRemove={handleRemove}
        data={skills}
        header={[
          {
            name: "Skill Name",
            prop: "skillName",
            disableUpdate: true,
          },
          {
            name: "Rating",
            prop: "rating",
          },
        ]}
        title="Skills table"
      />
    </>
  ) : null;
}
