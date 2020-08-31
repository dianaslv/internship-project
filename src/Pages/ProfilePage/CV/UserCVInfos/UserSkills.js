import React, { useEffect, useState } from "react";
import UserSkillsModal from "../Modals/UserSkillsModal";
import { useAppContext } from "../../../../Context/ContextProvider";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddUserSkill,
  DeleteUserSkill,
  UpdateUserSkillRating,
} from "../../../../Apollo/Queries/UserQueries/UserSkillsQueries";
import { AddSkill } from "../../../../Apollo/Queries/SkillsQueries";
import { GetUserSkillsDataForCV } from "../../../../Apollo/Queries/UserQueries/UserQueries";
import CustomTable from "../../../../Commons/CommonComponents/CustomTable";

export default function UserSkills(props) {
  const { user } = useAppContext();
  const [userSkills, setUserSkills] = useState([]);
  const [addUserSkill] = useMutation(AddUserSkill);
  const [addSkill] = useMutation(AddSkill);
  const [deleteUserSkill] = useMutation(DeleteUserSkill);
  const { data, loading } = useQuery(GetUserSkillsDataForCV, {
    variables: { id: user.id },
  });
  const [index, setIndex] = useState(-1);
  const [updateUserSkill] = useMutation(UpdateUserSkillRating);

  useEffect(() => {
    console.log(data);
    if (data) {
      let userSkills = [];
      data.user.userSkills.map((userSkill, key) => {
        let skill = {
          id: userSkill.id,
          rating: userSkill.rating,
          skillId: userSkill.skill.id,
          skillName: userSkill.skill.name,
        };
        userSkills.push(skill);
      });
      setUserSkills(userSkills);
    }
  }, [data]);

  if (loading) return null;

  const handleChange = (value, name, skillPos) => {
    console.log(value, name, skillPos);
    const updatedSkills = [...userSkills];
    userSkills[skillPos][name] = value;
    setUserSkills(updatedSkills);
    console.log(userSkills);
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
          addUserSkill({
            variables: {
              skillId: parseInt(r.data.createSkill.id),
              userId: user.id,
              rating: parseInt(skill.rating),
            },
            refetchQueries: [
              {
                query: GetUserSkillsDataForCV,
                variables: {
                  id: user.id,
                },
              },
            ],
          }).then((r) => console.log(r));
        });
      } else {
        addUserSkill({
          variables: {
            skillId: parseInt(skill.id),
            userId: user.id,
            rating: parseInt(skill.rating),
          },
          refetchQueries: [
            {
              query: GetUserSkillsDataForCV,
              variables: {
                id: user.id,
              },
            },
          ],
        }).then((r) => {
          console.log(r);
        });
      }
    });
  };

  const handleRemove = (index) => {
    deleteUserSkill({
      variables: { id: userSkills[index].id },
      refetchQueries: [
        {
          query: GetUserSkillsDataForCV,
          variables: {
            id: user.id,
          },
        },
      ],
    }).then((r) => console.log(r));
  };

  const startEditing = (i) => {
    setIndex(i);
    console.log("start editing", index);
  };

  const stopEditing = (i) => {
    let updatedSkill = userSkills[i];
    updateUserSkill({
      variables: {
        id: parseInt(updatedSkill.id),
        rating: parseInt(updatedSkill.rating),
      },
    }).then((r) => {
      console.log(r);
      setIndex(-1);
    });
  };

  return (
    userSkills && (
      <>
        <CustomTable
          editIdx={index}
          startEditing={startEditing}
          stopEditing={stopEditing}
          handleChange={handleChange}
          handleRemove={handleRemove}
          data={userSkills}
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
        <UserSkillsModal userId={user.id} handleSubmit={handleSubmit} />
      </>
    )
  );
}
