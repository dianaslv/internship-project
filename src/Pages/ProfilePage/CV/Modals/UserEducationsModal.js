import React from "react";
import AddDataModal from "../../../../Commons/CommonComponents/AddDataModal";
import { useMutation } from "@apollo/client";
import UserAdditionalInfosForm from "../../../../Commons/CommonComponents/UserAdditionalInfosForm";
import moment from "moment";
import { AddUserEducation } from "../../../../Apollo/Queries/UserQueries/UserEducationsQueries";

export default function UserEducationsModal(props) {
  return (
    <div>
      <AddDataModal buttonText="Add User Educations">
        <UserAdditionalInfosForm handleSubmit={props.handleSubmit} />
      </AddDataModal>
    </div>
  );
}
