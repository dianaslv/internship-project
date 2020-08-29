import React, { useEffect, useState } from "react";
import UserEducationsModal from "../Modals/UserEducationsModal";
import UserEducationsTable from "../NestedTables/UserEducationsTable";
import { useAppContext } from "../../../../Context/ContextProvider";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddUserEducation,
  DeleteUserEducation,
} from "../../../../Apollo/Queries/UserQueries/UserEducationsQueries";
import { GetUserEducationsDataForCV } from "../../../../Apollo/Queries/UserQueries/UserQueries";

export default function UserEducations(props) {
  const { user } = useAppContext();
  const [userEducations, setUserEducations] = useState([]);
  const [addUserEducation, { data: addedUserEducation }] = useMutation(
    AddUserEducation
  );
  const [getDeletedUserEducation] = useMutation(DeleteUserEducation);
  const { data, loading } = useQuery(GetUserEducationsDataForCV, {
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
    }
  }, [data]);

  if (loading) return null;

  const handleUpdateUserEducations = (value, name, educationPos) => {
    console.log(value, name);
    const updatedEducations = [...userEducations];
    userEducations[educationPos][name] = value;
    setUserEducations(updatedEducations);
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
            query: GetUserEducationsDataForCV,
            variables: {
              id: user.id,
            },
          },
        ],
      }).then((r) => console.log(r));
    });
  };

  const handleDeleteUserEducations = (index) => {
    getDeletedUserEducation({
      variables: { id: userEducations[index].id },
      refetchQueries: [
        {
          query: GetUserEducationsDataForCV,
          variables: {
            id: user.id,
          },
        },
      ],
    }).then((r) => console.log(r));
  };

  return (
    userEducations && (
      <>
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
      </>
    )
  );
}
