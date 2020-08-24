import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import makeStyles from "@material-ui/core/styles/makeStyles";
import { useAppContext } from "../../Context/ContextProvider";
import { UpdateJob } from "../../Apollo/Queries/JobQueries/JobQueries";
import { GetUsersDataForCV } from "../../Apollo/Queries/UserQueries/UserQueries";
import { userTypeRoutes } from "../../Router/UserTypeRoutes";
import JobSkillsTable from "../../CompanyUser/Jobs/NestedTables/JobSkillsTable";
import SimpleTable from "../../Commons/SimpleTable";
import Card from "@material-ui/core/Card";
import UserSkillsTable from "./NestedTables/UserSkillsTable";
import UserEducationsTable from "./NestedTables/UserEducationsTable";
import DateTimePicker from "../../Commons/DateTimePicker";
import UserWorkExperiencesTable from "./NestedTables/UserWorkExperiencesTable";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: "pink",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function CVTable() {
  const classes = useStyles();
  const [index, setIndex] = useState(-1);
  const { user, updateUser } = useAppContext();
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
      <UserEducationsTable
        userId={user.id}
        userEducations={userEducations}
        handleUpdateUserEducations={handleUpdateUserEducations}
      />
      <UserWorkExperiencesTable
        userId={user.id}
        userWorkExperiences={userWorkExperiences}
        handleUpdateUserWorkExperiences={handleUpdateUserWorkExperiences}
      />
    </>
  ) : null;
}
