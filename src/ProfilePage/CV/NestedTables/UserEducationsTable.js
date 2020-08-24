import React, { useState } from "react";
import SimpleTable from "../../../Commons/SimpleTable";
import { useMutation } from "@apollo/client";
import {
  DeleteUserEducation,
  UpdateUserEducation,
} from "../../../Apollo/Queries/UserQueries/UserEducationsQueries";
import moment from "moment";
import UserSkillsModal from "../Modals/UserSkillsModal";
import UserEducationsModal from "../Modals/UserEducationsModal";

export default function UserEducationsTable(props) {
  const [index, setIndex] = useState(-1);
  const { userEducations } = props;
  const [getUpdatedUserEducation, { data: updatedUserEducation }] = useMutation(
    UpdateUserEducation
  );
  const [getDeletedUserEducation] = useMutation(DeleteUserEducation);

  const startEditing = (i) => {
    setIndex(i);
    console.log("start editing", index);
  };

  const handleChange = (e, name, i) => {
    const { value } = e.target;
    console.log(value, name, i);
    props.handleUpdateUserEducations(e.target.value, e.target.name, i);
  };

  const handleChangeDate = (field, rowNo, date) => {
    console.log(date);
    props.handleUpdateUserEducations(date, field, rowNo);
  };

  const stopEditing = (i) => {
    let education = userEducations[i];

    console.log("education.startDate", education.startDate);
    console.log("education.endDate", education.endDate);

    let educationStartDate =
      moment(education.startDate).format("YYYY") +
      "-" +
      moment(education.startDate).format("MM") +
      "-" +
      moment(education.startDate).format("DD");
    let educationEndDate =
      moment(education.endDate).format("YYYY") +
      "-" +
      moment(education.endDate).format("MM") +
      "-" +
      moment(education.endDate).format("DD");

    console.log("educationStartDate", educationStartDate);
    console.log("educationEndDate", educationEndDate);

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
    getDeletedUserEducation({
      variables: { id: userEducations[i].id },
    }).then((r) => console.log(r));
  };

  return userEducations ? (
    <>
      <SimpleTable
        editIdx={index}
        startEditing={startEditing}
        stopEditing={stopEditing}
        handleChange={handleChange}
        handleRemove={handleRemove}
        handleChangeDate={handleChangeDate}
        data={userEducations}
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
          },
          {
            name: "Start Data",
            prop: "startDate",
          },
        ]}
        title="Educations table"
      />
      <UserEducationsModal userId={props.userId} />
    </>
  ) : null;
}
