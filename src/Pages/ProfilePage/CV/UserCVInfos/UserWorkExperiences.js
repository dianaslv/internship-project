import React from "react";
import UserWorkExperiencesModal from "../Modals/UserWorkExperiencesModal";
import { useMutation } from "@apollo/client";
import {
  AddUserWorkExperiences,
  DeleteUserWorkExperiences,
  UpdateUserWorkExperiences,
} from "../../../../Apollo/Queries/UserQueries/UserWorkExperiencesQueries";
import { Users } from "../../../../Apollo/Queries/UserQueries/UserQueries";
import CustomTable from "../../../../Commons/CommonComponents/Tables/CustomTable";
import getDateFormatForUpdateMutation from "../../../../Commons/CommonComponents/Date/DateFormatConverter";

export default function UserWorkExperiences({ userWorkExperiences, userId }) {
  const [addUserWorkExperience] = useMutation(AddUserWorkExperiences);
  const [deleteUserWorkExperience] = useMutation(DeleteUserWorkExperiences);
  const [updateUserWorkExperience] = useMutation(UpdateUserWorkExperiences);

  const stopEditing = (i, editedData) => {
    let workExperienceStartDate = getDateFormatForUpdateMutation(
      editedData.startDate
    );
    let workExperienceEndDate = getDateFormatForUpdateMutation(
      editedData.endDate
    );

    updateUserWorkExperience({
      variables: {
        id: editedData.id,
        userId: userId,
        institution: editedData.institution,
        description: editedData.description,
        startDate: workExperienceStartDate,
        endDate: workExperienceEndDate,
      },
      refetchQueries: [
        {
          query: Users,
        },
      ],
    });
  };

  const handleSubmit = (workExperiences) => {
    workExperiences.map((work, key) => {
      addUserWorkExperience({
        variables: {
          institution: work.institution,
          description: work.description,
          userId: userId,
          startDate: work.startDate,
          endDate: work.endDate,
        },
        refetchQueries: [
          {
            query: Users,
          },
        ],
      });
    });
  };

  const handleRemove = (index) => {
    deleteUserWorkExperience({
      variables: { id: userWorkExperiences[index].id },
      refetchQueries: [
        {
          query: Users,
        },
      ],
    });
  };

  return (
    userWorkExperiences && (
      <>
        <CustomTable
          stopEditing={stopEditing}
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
        <UserWorkExperiencesModal userId={userId} handleSubmit={handleSubmit} />
      </>
    )
  );
}
