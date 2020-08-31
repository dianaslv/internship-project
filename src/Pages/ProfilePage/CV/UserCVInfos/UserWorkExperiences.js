import React, { useEffect, useState } from "react";
import UserWorkExperiencesModal from "../Modals/UserWorkExperiencesModal";
import { useAppContext } from "../../../../Context/ContextProvider";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddUserWorkExperiences,
  DeleteUserWorkExperiences,
  UpdateUserWorkExperiences,
} from "../../../../Apollo/Queries/UserQueries/UserWorkExperiencesQueries";
import { GetUserWorkExperiencesDataForCV } from "../../../../Apollo/Queries/UserQueries/UserQueries";
import CustomTable from "../../../../Commons/CommonComponents/Tables/CustomTable";
import getDateFormatForUpdateMutation from "../../../../Commons/CommonComponents/Date/DateFormatConverter";

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
  const [index, setIndex] = useState(-1);
  const [updateUserWorkExperience] = useMutation(UpdateUserWorkExperiences);

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

  const startEditing = (i) => {
    setIndex(i);
  };

  const stopEditing = (i) => {
    let workExperience = userWorkExperiences[i];
    let workExperienceStartDate = getDateFormatForUpdateMutation(
      workExperience.startDate
    );
    let workExperienceEndDate = getDateFormatForUpdateMutation(
      workExperience.endDate
    );

    updateUserWorkExperience({
      variables: {
        id: parseInt(workExperience.id),
        userId: user.id,
        institution: workExperience.institution,
        description: workExperience.description,
        startDate: workExperienceStartDate,
        endDate: workExperienceEndDate,
      },
    }).then((r) => {
      console.log(r);
      setIndex(-1);
    });
  };

  const handleChange = (value, name, workPos) => {
    console.log(value, name);
    const updatedWork = [...userWorkExperiences];
    updatedWork[workPos][name] = value;
    setUserWorkExperiences(updatedWork);
  };

  const handleSubmit = (workExperiences) => {
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

  const handleRemove = (index) => {
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
        <CustomTable
          editIdx={index}
          startEditing={startEditing}
          stopEditing={stopEditing}
          handleChange={handleChange}
          handleRemove={handleRemove}
          data={userWorkExperiences}
          header={[
            {
              name: "Description",
              prop: "description",
            },
            {
              name: "Institution",
              prop: "institution",
            },
            {
              name: "Start Date",
              prop: "startDate",
              componentForEditing: "DateTimePickerComponent",
              specialFormatForDisplaying: "date",
            },
            {
              name: "End Date",
              prop: "endDate",
              componentForEditing: "DateTimePickerComponent",
              specialFormatForDisplaying: "date",
            },
          ]}
          title="Work Experiences table"
        />
        <UserWorkExperiencesModal
          userId={user.id}
          handleSubmit={handleSubmit}
        />
      </>
    )
  );
}
