import React, { useEffect, useState } from "react";
import UserEducationsModal from "../Modals/UserEducationsModal";
import { useAppContext } from "../../../../Context/ContextProvider";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddUserEducation,
  DeleteUserEducation,
  UpdateUserEducation,
} from "../../../../Apollo/Queries/UserQueries/UserEducationsQueries";
import { GetUserEducationsDataForCV } from "../../../../Apollo/Queries/UserQueries/UserQueries";
import getDateFormatForUpdateMutation from "../../../../Commons/CommonComponents/DateFormatConverter";
import CustomTable from "../../../../Commons/CommonComponents/CustomTable";

export default function UserEducations(props) {
  const { user } = useAppContext();
  const [userEducations, setUserEducations] = useState([]);
  const [addUserEducation] = useMutation(AddUserEducation);
  const [getDeletedUserEducation] = useMutation(DeleteUserEducation);
  const { data, loading } = useQuery(GetUserEducationsDataForCV, {
    variables: { id: user.id },
  });
  const [index, setIndex] = useState(-1);
  const [getUpdatedUserEducation] = useMutation(UpdateUserEducation);

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

  const handleChange = (value, name, educationPos) => {
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

  const handleRemove = (index) => {
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

  const startEditing = (i) => {
    setIndex(i);
    console.log("start editing", index);
  };

  const stopEditing = (i) => {
    let education = userEducations[i];
    let educationStartDate = getDateFormatForUpdateMutation(
      education.startDate
    );
    let educationEndDate = getDateFormatForUpdateMutation(education.endDate);

    getUpdatedUserEducation({
      variables: {
        id: parseInt(education.id),
        userId: user.id,
        institution: education.institution,
        description: education.description,
        startDate: educationStartDate,
        endDate: educationEndDate,
      },
    }).then((r) => {
      console.log(r);
      setIndex(-1);
    });
  };

  return (
    userEducations && (
      <>
        <CustomTable
          editIdx={index}
          startEditing={startEditing}
          stopEditing={stopEditing}
          handleChange={handleChange}
          handleRemove={handleRemove}
          data={userEducations}
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
          title="Educations table"
        />
        <UserEducationsModal
          userId={user.id}
          handleSubmit={handleSubmitUserEducations}
        />
      </>
    )
  );
}
