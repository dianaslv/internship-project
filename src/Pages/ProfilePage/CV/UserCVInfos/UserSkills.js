import React, { useEffect, useState } from "react";
import UserSkillsTable from "../NestedTables/UserSkillsTable";
import UserSkillsModal from "../Modals/UserSkillsModal";
import { useAppContext } from "../../../../Context/ContextProvider";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddUserSkill,
  DeleteUserSkill,
} from "../../../../Apollo/Queries/UserQueries/UserSkillsQueries";
import { AddSkill } from "../../../../Apollo/Queries/SkillsQueries";
import { GetUserSkillsDataForCV } from "../../../../Apollo/Queries/UserQueries/UserQueries";

export default function UserSkills(props) {
  const { user } = useAppContext();
  const [userSkills, setUserSkills] = useState([]);
  const [addUserSkill, { data: addedUserSkill }] = useMutation(AddUserSkill);
  const [addSkill, { data: addedSkill }] = useMutation(AddSkill);
  const [getDeletedUserSkill] = useMutation(DeleteUserSkill);
  const { data, loading } = useQuery(GetUserSkillsDataForCV, {
    variables: { id: user.id },
  });

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

  const handleUpdateUserSkill = (value, name, skillPos) => {
    console.log(value, name, skillPos);
    const updatedSkills = [...userSkills];
    userSkills[skillPos][name] = value;
    setUserSkills(updatedSkills);
    console.log(userSkills);
  };

  const handleSubmitUserSkills = (skills) => {
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
  const handleDeleteUserSkill = (index) => {
    getDeletedUserSkill({
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
  return (
    userSkills && (
      <>
        <UserSkillsTable
          userId={user.id}
          skills={userSkills}
          handleUpdateUserSkill={handleUpdateUserSkill}
          handleDeleteUserSkill={handleDeleteUserSkill}
        />
        <UserSkillsModal
          userId={user.id}
          handleSubmit={handleSubmitUserSkills}
        />
      </>
    )
  );
}
