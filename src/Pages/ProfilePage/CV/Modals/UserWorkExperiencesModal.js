import React from "react";
import AddDataModal from "../../../../Commons/CommonComponents/AddDataModal";
import { useMutation } from "@apollo/client";
import UserAdditionalInfosForm from "../../../../Commons/CommonComponents/Forms/UserAdditionalInfosForm";
import { AddUserWorkExperiences } from "../../../../Apollo/Queries/UserQueries/UserWorkExperiencesQueries";

export default function UserWorkExperiencesModal(props) {
  return (
    <div>
      <AddDataModal buttonText="Add User Work Experience">
        <UserAdditionalInfosForm handleSubmit={props.handleSubmit} />
      </AddDataModal>
    </div>
  );
}
