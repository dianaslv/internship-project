import React, { useState } from "react";
import SimpleTable from "../../../Commons/SimpleTable";
import { useMutation } from "@apollo/client";
import JobSkillsModal from "../../../CompanyUser/Jobs/Modals/JobSkillsModal";
import { UpdateJobSkillRating } from "../../../Apollo/Queries/JobQueries/JobSkillsQueries";
import {
  DeleteUserSkill,
  UpdateUserSkillRating,
} from "../../../Apollo/Queries/UserQueries/UserSkillsQueries";
import UserSkillsModal from "../Modals/UserSkillsModal";

export default function UserSkillsTable(props) {
  const [index, setIndex] = useState(-1);
  const { skills } = props;
  const [
    getUpdatedUserSkillRating,
    { data: updatedUserSkillRating },
  ] = useMutation(UpdateUserSkillRating);
  const [getDeletedUserSkill] = useMutation(DeleteUserSkill);

  const startEditing = (i) => {
    setIndex(i);
    console.log("start editing", index);
  };

  const handleChange = (e, name, i) => {
    const { value } = e.target;
    console.log(value, name, i);
    props.handleUpdateUserSkill(e.target.value, e.target.name, i);
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
    getDeletedUserSkill({
      variables: { id: skills[i].id },
    }).then((r) => console.log(r));
  };

  return skills ? (
    <>
      <SimpleTable
        editIdx={index}
        startEditing={startEditing}
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
      <UserSkillsModal userId={props.userId} />
    </>
  ) : null;
}
