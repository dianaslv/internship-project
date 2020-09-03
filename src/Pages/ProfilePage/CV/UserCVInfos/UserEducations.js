import React from "react";
import UserEducationsModal from "../Modals/UserEducationsModal";
import { useMutation } from "@apollo/client";
import {
  AddUserEducation,
  DeleteUserEducation,
  UpdateUserEducation,
} from "../../../../Apollo/Queries/UserQueries/UserEducationsQueries";
import { Users } from "../../../../Apollo/Queries/UserQueries/UserQueries";
import getDateFormatForUpdateMutation from "../../../../Commons/CommonComponents/Date/DateFormatConverter";
import CustomTable from "../../../../Commons/CommonComponents/Tables/CustomTable";

export default function UserEducations({ userEducations, userId }) {
  const [addUserEducation] = useMutation(AddUserEducation);
  const [deleteUserEducation] = useMutation(DeleteUserEducation);
  const [updateUserEducation] = useMutation(UpdateUserEducation);

  const handleSubmitUserEducations = (educations) => {
    educations.map((education, key) => {
      addUserEducation({
        variables: {
          institution: education.institution,
          description: education.description,
          userId: userId,
          startDate: education.startDate,
          endDate: education.endDate,
        },
        refetchQueries: [
          {
            query: Users,
          },
        ],
      }).then((r) => console.log(r));
    });
  };

  const handleRemove = (index) => {
    deleteUserEducation({
      variables: { id: userEducations[index].id },
      refetchQueries: [
        {
          query: Users,
        },
      ],
    }).then((r) => console.log(r));
  };

  const stopEditing = (i, editedData) => {
    console.log(editedData);
    let educationStartDate = getDateFormatForUpdateMutation(
      editedData.startDate
    );
    let educationEndDate = getDateFormatForUpdateMutation(editedData.endDate);

    updateUserEducation({
      variables: {
        id: editedData.id,
        userId: userId,
        institution: editedData.institution,
        description: editedData.description,
        startDate: educationStartDate,
        endDate: educationEndDate,
      },
      refetchQueries: [
        {
          query: Users,
        },
      ],
    });
  };

  return (
    userEducations && (
      <>
        <CustomTable
          stopEditing={stopEditing}
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
          userId={userId}
          handleSubmit={handleSubmitUserEducations}
        />
      </>
    )
  );
}
