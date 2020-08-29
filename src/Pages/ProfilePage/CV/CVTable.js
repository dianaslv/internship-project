import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { useAppContext } from "../../../Context/ContextProvider";
import {
  GetUsersDataForCV,
  Users,
} from "../../../Apollo/Queries/UserQueries/UserQueries";
import UserSkillsTable from "./NestedTables/UserSkillsTable";
import UserEducationsTable from "./NestedTables/UserEducationsTable";
import UserWorkExperiencesTable from "./NestedTables/UserWorkExperiencesTable";
import UserWorkExperiencesModal from "./Modals/UserWorkExperiencesModal";
import UserEducationsModal from "./Modals/UserEducationsModal";
import UserSkillsModal from "./Modals/UserSkillsModal";
import {
  AddUserSkill,
  DeleteUserSkill,
} from "../../../Apollo/Queries/UserQueries/UserSkillsQueries";
import { AddSkill } from "../../../Apollo/Queries/SkillsQueries";
import {
  AddUserEducation,
  DeleteUserEducation,
} from "../../../Apollo/Queries/UserQueries/UserEducationsQueries";
import {
  AddUserWorkExperiences,
  DeleteUserWorkExperiences,
} from "../../../Apollo/Queries/UserQueries/UserWorkExperiencesQueries";

export default function CVTable() {
  const { user } = useAppContext();
  const [userEducations, setUserEducations] = useState([]);
  const [userWorkExperiences, setUserWorkExperiences] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const [addUserSkill, { data: addedUserSkill }] = useMutation(AddUserSkill);
  const [addSkill, { data: addedSkill }] = useMutation(AddSkill);
  const [
    addUserWorkExperience,
    { data: addedUserWorkExperience },
  ] = useMutation(AddUserWorkExperiences);
  const [addUserEducation, { data: addedUserEducation }] = useMutation(
    AddUserEducation
  );
  const [getDeletedUserSkill] = useMutation(DeleteUserSkill);
  const [getDeletedUserEducation] = useMutation(DeleteUserEducation);
  const [getDeletedUserWorkExperience] = useMutation(DeleteUserWorkExperiences);

  const { data, loading } = useQuery(GetUsersDataForCV, {
    variables: { id: user.id },
  });

  useEffect(() => {
    console.log(data);
    if (data) {
      let userEducation = [];
      data.user.userEducations.map((education, key) => {
        let newEducation = {
          id: education.id,
          description: education.description,
          endDate: education.endDate,
          startDate: education.startDate,
          institution: education.institution,
        };
        userEducation.push(newEducation);
      });
      setUserEducations(userEducation);

      let userWorks = [];
      data.user.userWorkExperiences.map((work, key) => {
        let newWork = {
          id: work.id,
          description: work.description,
          endDate: work.endDate,
          startDate: work.startDate,
          institution: work.institution,
        };
        userWorks.push(newWork);
      });
      setUserWorkExperiences(userWorks);

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

  const handleUpdateUserEducations = (value, name, educationPos) => {
    console.log(value, name);
    const updatedEducations = [...userEducations];
    userEducations[educationPos][name] = value;
    setUserEducations(updatedEducations);
  };

  const handleUpdateUserWorkExperiences = (value, name, workPos) => {
    console.log(value, name);
    const updatedWork = [...userWorkExperiences];
    updatedWork[workPos][name] = value;
    setUserWorkExperiences(updatedWork);
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
                query: GetUsersDataForCV,
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
              query: GetUsersDataForCV,
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

  const handleSubmitUserEducations = (educations) => {
    console.log(educations);
    educations.map((education, key) => {
      addUserEducation({
        variables: {
          institution: education.institution,
          description: education.description,
          userId: user.id,
          startDate: education.startDate,
          endDate: education.endDate,
        },
        refetchQueries: [
          {
            query: GetUsersDataForCV,
            variables: {
              id: user.id,
            },
          },
        ],
      }).then((r) => console.log(r));
    });
  };

  const handleSubmitUserWorkExperiences = (workExperiences) => {
    workExperiences.map((work, key) => {
      addUserWorkExperience({
        variables: {
          institution: work.institution,
          description: work.description,
          userId: user.id,
          startDate: work.startDate,
          endDate: work.endDate,
        },
        refetchQueries: [
          {
            query: GetUsersDataForCV,
            variables: {
              id: user.id,
            },
          },
        ],
      }).then((r) => console.log(r));
    });
  };

  const handleDeleteUserSkill = (index) => {
    getDeletedUserSkill({
      variables: { id: userSkills[index].id },
      refetchQueries: [
        {
          query: GetUsersDataForCV,
          variables: {
            id: user.id,
          },
        },
      ],
    }).then((r) => console.log(r));
  };

  const handleDeleteUserEducations = (index) => {
    getDeletedUserEducation({
      variables: { id: userEducations[index].id },
      refetchQueries: [
        {
          query: GetUsersDataForCV,
          variables: {
            id: user.id,
          },
        },
      ],
    }).then((r) => console.log(r));
  };

  const handleDeleteUserWorkExperiences = (index) => {
    getDeletedUserWorkExperience({
      variables: { id: userWorkExperiences[index].id },
      refetchQueries: [
        {
          query: GetUsersDataForCV,
          variables: {
            id: user.id,
          },
        },
      ],
    }).then((r) => console.log(r));
  };

  return userWorkExperiences && userEducations && userSkills ? (
    <>
      <UserSkillsTable
        userId={user.id}
        skills={userSkills}
        handleUpdateUserSkill={handleUpdateUserSkill}
        handleDeleteUserSkill={handleDeleteUserSkill}
      />
      <UserSkillsModal userId={user.id} handleSubmit={handleSubmitUserSkills} />
      <UserEducationsTable
        userId={user.id}
        userEducations={userEducations}
        handleUpdateUserEducations={handleUpdateUserEducations}
        handleDeleteUserEducations={handleDeleteUserEducations}
      />
      <UserEducationsModal
        userId={user.id}
        handleSubmit={handleSubmitUserEducations}
      />

      <UserWorkExperiencesTable
        userId={user.id}
        userWorkExperiences={userWorkExperiences}
        handleUpdateUserWorkExperiences={handleUpdateUserWorkExperiences}
        handleDeleteUserWorkExperiences={handleDeleteUserWorkExperiences}
      />
      <UserWorkExperiencesModal
        userId={user.id}
        handleSubmit={handleSubmitUserWorkExperiences}
      />
    </>
  ) : null;
}
