import React, { useEffect, useState } from "react";
import UserWorkExperiencesTable from "../NestedTables/UserWorkExperiencesTable";
import UserWorkExperiencesModal from "../Modals/UserWorkExperiencesModal";
import { useAppContext } from "../../../../Context/ContextProvider";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddUserWorkExperiences,
  DeleteUserWorkExperiences,
} from "../../../../Apollo/Queries/UserQueries/UserWorkExperiencesQueries";
import { GetUserWorkExperiencesDataForCV } from "../../../../Apollo/Queries/UserQueries/UserQueries";

export default function UserWorkExperiences(props) {
  const { user } = useAppContext();
  const [userWorkExperiences, setUserWorkExperiences] = useState([]);
  const [
    addUserWorkExperience,
    { data: addedUserWorkExperience },
  ] = useMutation(AddUserWorkExperiences);

  const [getDeletedUserWorkExperience] = useMutation(DeleteUserWorkExperiences);

  const { data, loading } = useQuery(GetUserWorkExperiencesDataForCV, {
    variables: { id: user.id },
  });

  useEffect(() => {
    console.log(data);
    if (data) {
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
    }
  }, [data]);

  if (loading) return null;

  const handleUpdateUserWorkExperiences = (value, name, workPos) => {
    console.log(value, name);
    const updatedWork = [...userWorkExperiences];
    updatedWork[workPos][name] = value;
    setUserWorkExperiences(updatedWork);
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
            query: GetUserWorkExperiencesDataForCV,
            variables: {
              id: user.id,
            },
          },
        ],
      }).then((r) => console.log(r));
    });
  };

  const handleDeleteUserWorkExperiences = (index) => {
    getDeletedUserWorkExperience({
      variables: { id: userWorkExperiences[index].id },
      refetchQueries: [
        {
          query: GetUserWorkExperiencesDataForCV,
          variables: {
            id: user.id,
          },
        },
      ],
    }).then((r) => console.log(r));
  };

  return (
    userWorkExperiences && (
      <>
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
    )
  );
}
