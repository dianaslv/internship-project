import React from "react";
import AddDataModal from "../../../../Commons/CommonComponents/AddDataModal";
import { useMutation } from "@apollo/client";
import UserAdditionalInfosForm from "../Forms/UserAdditionalInfosForm";
import moment from "moment";
import { AddUserEducation } from "../../../../Apollo/Queries/UserQueries/UserEducationsQueries";

export default function UserEducationsModal(props) {
  const [addUserEducation, { data: addedUserEducation }] = useMutation(
    AddUserEducation
  );

  const handleSubmit = (listOfEducations) => {
    console.log(listOfEducations, props.userId);
    listOfEducations.map((education, key) => {
      addUserEducation({
        variables: {
          institution: education.institution,
          description: education.description,
          userId: props.userId,
          startDate: education.startDate,
          endDate: education.endDate,
        },
      }).then((r) => console.log(r));
    });
  };

  return (
    <div>
      <AddDataModal buttonText="Add User Educations">
        <UserAdditionalInfosForm handleSubmit={handleSubmit} />
      </AddDataModal>
    </div>
  );
}
