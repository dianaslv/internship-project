import React, { useState } from "react";
import CustomTable from "../../../../Commons/CommonComponents/CustomTable";
import { useMutation } from "@apollo/client";
import {
  DeleteUserWorkExperiences,
  UpdateUserWorkExperiences,
} from "../../../../Apollo/Queries/UserQueries/UserWorkExperiencesQueries";
import getDateFormatForUpdateMutation from "../../../../Commons/CommonComponents/DateFormatConverter";

export default function UserWorkExperiencesTable(props) {
  const [index, setIndex] = useState(-1);
  const { userWorkExperiences } = props;
  const [
    getUpdatedUserWorkExperience,
    { data: updatedUserWorkExperience },
  ] = useMutation(UpdateUserWorkExperiences);

  const startEditing = (i) => {
    setIndex(i);
    console.log("start editing", index);
  };

  const handleChange = (options) => {
    console.log(options.value, options.name, options.index);
    props.handleUpdateUserWorkExperiences(
      options.value,
      options.name,
      options.index
    );
  };

  const stopEditing = (i) => {
    let workExperience = userWorkExperiences[i];
    let workExperienceStartDate = getDateFormatForUpdateMutation(
      workExperience.startDate
    );
    let workExperienceEndDate = getDateFormatForUpdateMutation(
      workExperience.endDate
    );

    getUpdatedUserWorkExperience({
      variables: {
        id: parseInt(workExperience.id),
        userId: parseInt(props.userId),
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

  const handleRemove = (i) => {
    props.handleDeleteUserWorkExperiences(i);
  };

  return userWorkExperiences ? (
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
    </>
  ) : null;
}
