import React, { useState } from "react";
import CustomTable from "../../../Commons/CustomTable";
import { useMutation } from "@apollo/client";
import {
  DeleteUserEducation,
  UpdateUserEducation,
} from "../../../Apollo/Queries/UserQueries/UserEducationsQueries";
import moment from "moment";
import UserWorkExperiencesModal from "../Modals/UserWorkExperiencesModal";
import {
  DeleteUserWorkExperiences,
  UpdateUserWorkExperiences,
} from "../../../Apollo/Queries/UserQueries/UserWorkExperiencesQueries";

export default function UserWorkExperiencesTable(props) {
  const [index, setIndex] = useState(-1);
  const { userWorkExperiences } = props;
  const [
    getUpdatedUserWorkExperience,
    { data: updatedUserWorkExperience },
  ] = useMutation(UpdateUserWorkExperiences);
  const [getDeletedUserWorkExperience] = useMutation(DeleteUserWorkExperiences);

  const startEditing = (i) => {
    setIndex(i);
    console.log("start editing", index);
  };

  const handleChange = (value, name, i) => {
    console.log(value, name, i);
    props.handleUpdateUserWorkExperiences(value, name, i);
  };

  const stopEditing = (i) => {
    let workExperience = userWorkExperiences[i];

    console.log("workExperience.startDate", workExperience.startDate);
    console.log("workExperience.endDate", workExperience.endDate);

    let workExperienceStartDate =
      moment(workExperience.startDate).format("YYYY") +
      "-" +
      moment(workExperience.startDate).format("M") +
      "-" +
      moment(workExperience.startDate).format("D");
    let workExperienceEndDate =
      moment(workExperience.endDate).format("YYYY") +
      "-" +
      moment(workExperience.endDate).format("M") +
      "-" +
      moment(workExperience.endDate).format("D");

    console.log("workExperienceStartDate", workExperienceStartDate);
    console.log("workExperienceEndDate", workExperienceEndDate);

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
    getDeletedUserWorkExperience({
      variables: { id: userWorkExperiences[i].id },
    }).then((r) => console.log(r));
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
            name: "Id",
            prop: "id",
          },
          {
            name: "Description",
            prop: "description",
          },
          {
            name: "Institution",
            prop: "institution",
          },
          {
            name: "End Data",
            prop: "endDate",
            componentForEditing: "DateTimePickerComponent",
            specialFormatForDisplaying: "date",
          },
          {
            name: "Start Data",
            prop: "startDate",
            componentForEditing: "DateTimePickerComponent",
            specialFormatForDisplaying: "date",
          },
        ]}
        title="Work Experiences table"
      />
    </>
  ) : null;
}
