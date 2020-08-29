import React, { useEffect, useState } from "react";
import UserSkillsTable from "../ProfilePage/CV/NestedTables/UserSkillsTable";
import { useAppContext } from "../../Context/ContextProvider";
import { useQuery } from "@apollo/client";
import { GetUsersDataForCV } from "../../Apollo/Queries/UserQueries/UserQueries";
import UserEducationsTable from "../ProfilePage/CV/NestedTables/UserEducationsTable";
import UserEducationsModal from "../ProfilePage/CV/Modals/UserEducationsModal";
import UserWorkExperiencesTable from "../ProfilePage/CV/NestedTables/UserWorkExperiencesTable";
import UserDataTable from "../ProfilePage/Profile/UserDataTable";
import ContactInfoTable from "../ProfilePage/Profile/ContactInfoTable";
import PageLayout from "../../Commons/PageLayout/PageLayout";
export default function UserCv(props) {
  const { user, updateUser } = useAppContext();
  const [userEducations, setUserEducations] = useState([]);
  const [userWorkExperiences, setUserWorkExperiences] = useState([]);
  const [userSkills, setUserSkills] = useState([]);
  const { data, loading } = useQuery(GetUsersDataForCV, {
    variables: {
      id: props.userId,
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

  return (
    <>
      <UserSkillsTable userId={props.userId} userSkills={userSkills} />
      <UserEducationsTable
        userId={props.userId}
        userEducations={userEducations}
      />
      <UserWorkExperiencesTable
        userId={props.userId}
        userWorkExperiences={userWorkExperiences}
      />
    </>
  );
}
