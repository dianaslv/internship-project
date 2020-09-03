import React from "react";
import UserSkillsModal from "../Modals/UserSkillsModal";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddUserSkill,
  DeleteUserSkill,
  UpdateUserSkillRating,
} from "../../../../Apollo/Queries/UserQueries/UserSkillsQueries";
import { AddSkill } from "../../../../Apollo/Queries/SkillsQueries";
import { Users } from "../../../../Apollo/Queries/UserQueries/UserQueries";
import CustomTable from "../../../../Commons/CommonComponents/Tables/CustomTable";

export default function UserSkills({ userSkills, userId }) {
  const [addUserSkill] = useMutation(AddUserSkill);
  const [addSkill] = useMutation(AddSkill);
  const [deleteUserSkill] = useMutation(DeleteUserSkill);
  const [updateUserSkill] = useMutation(UpdateUserSkillRating);

  const handleSubmit = (skills) => {
    skills.map((skill, key) => {
      if (skill.id === -1) {
        addSkill({
          variables: {
            name: skill.name,
          },
        }).then((r) => {
          addUserSkill({
            variables: {
              skillId: parseInt(r.data.createSkill.id),
              userId: userId,
              rating: parseInt(skill.rating),
            },
            refetchQueries: [{ query: Users }],
          });
        });
      } else {
        addUserSkill({
          variables: {
            skillId: parseInt(skill.id),
            userId: userId,
            rating: parseInt(skill.rating),
          },
          refetchQueries: [{ query: Users }],
        });
      }
    });
  };

  const handleRemove = (index) => {
    deleteUserSkill({
      variables: { id: userSkills[index].id },
      refetchQueries: [
        {
          query: Users,
        },
      ],
    });
  };

  const stopEditing = (i, editedData) => {
    updateUserSkill({
      variables: {
        id: editedData.id,
        rating: parseInt(editedData.rating),
      },
      refetchQueries: [
        {
          query: Users,
        },
      ],
    });
  };

  return (
    userSkills && (
      <>
        <CustomTable
          stopEditing={stopEditing}
          handleRemove={handleRemove}
          data={userSkills}
          header={[
            {
              name: "Skill Name",
              prop: "skill.name",
              disableUpdate: true,
            },
            {
              name: "Rating",
              prop: "rating",
            },
          ]}
          title="Skills table"
        />
        <UserSkillsModal userId={userId} handleSubmit={handleSubmit} />
      </>
    )
  );
}
