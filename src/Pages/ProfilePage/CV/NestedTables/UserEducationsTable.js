import React, { useState } from "react";
import CustomTable from "../../../../Commons/CommonComponents/CustomTable";
import { useMutation } from "@apollo/client";
import {
  DeleteUserEducation,
  UpdateUserEducation,
} from "../../../../Apollo/Queries/UserQueries/UserEducationsQueries";
import getDateFormatForUpdateMutation from "../../../../Commons/CommonComponents/DateFormatConverter";

export default function UserEducationsTable(props) {
  const [index, setIndex] = useState(-1);
  const { userEducations } = props;
  const [getUpdatedUserEducation, { data: updatedUserEducation }] = useMutation(
    UpdateUserEducation
  );

  const startEditing = (i) => {
    setIndex(i);
    console.log("start editing", index);
  };

  const handleChange = (options) => {
    props.handleUpdateUserEducations(
      options.value,
      options.name,
      options.index
    );
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
        userId: parseInt(props.userId),
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

  const handleRemove = (i) => {
    props.handleDeleteUserEducations(i);
  };

  return userEducations ? (
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
    </>
  ) : null;
}
