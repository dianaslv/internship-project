import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { useAppContext } from "../../../Context/ContextProvider";
import { GetUsersDataForCV } from "../../../Apollo/Queries/UserQueries/UserQueries";
import UserSkillsTable from "./NestedTables/UserSkillsTable";
import UserEducationsTable from "./NestedTables/UserEducationsTable";
import UserWorkExperiencesTable from "./NestedTables/UserWorkExperiencesTable";
import UserWorkExperiencesModal from "./Modals/UserWorkExperiencesModal";
import UserEducationsModal from "./Modals/UserEducationsModal";
import UserSkillsModal from "./Modals/UserSkillsModal";

export default function CVTable() {
  const { user } = useAppContext();
  const [userEducations, setUserEducations] = useState([]);
  const [userWorkExperiences, setUserWorkExperiences] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const { data, loading } = useQuery(GetUsersDataForCV, {
    variables: {
      id: user.id,
    },
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

  return userWorkExperiences && userEducations && userSkills ? (
    <>
      <UserSkillsTable
        userId={user.id}
        skills={userSkills}
        handleUpdateUserSkill={handleUpdateUserSkill}
      />
      <UserSkillsModal userId={user.id} />
      <UserEducationsTable
        userId={user.id}
        userEducations={userEducations}
        handleUpdateUserEducations={handleUpdateUserEducations}
      />
      <UserEducationsModal userId={user.id} />

      <UserWorkExperiencesTable
        userId={user.id}
        userWorkExperiences={userWorkExperiences}
        handleUpdateUserWorkExperiences={handleUpdateUserWorkExperiences}
      />
      <UserWorkExperiencesModal userId={user.id} />
    </>
  ) : null;
}
