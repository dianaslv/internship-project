import React from "react";
import AddDataModal from "../../../Commons/CommonComponents/AddDataModal";
import ContactInfoForm from "./ContactInfoForm";

export default function AddContactInfoModal(props) {
  return (
    <div>
      <AddDataModal buttonText="Add User Contact Info">
        <ContactInfoForm handleSubmit={props.handleSubmit} />
      </AddDataModal>
    </div>
  );
}
