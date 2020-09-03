import React from "react";
import {
  AddContactInfo,
  UpdateContactInfo,
  UpdateUserContactInfo,
  Users,
} from "../../../Apollo/Queries/UserQueries/UserQueries";
import { useMutation } from "@apollo/client";
import AddContactInfoModal from "./AddContactInfoModal";
import ContactInfoTable from "../../../Commons/CommonComponents/Tables/ContactInfoTable";

export default function UserContactInfo({ contactInfo, userId }) {
  const [updateUserContactInfo] = useMutation(UpdateUserContactInfo);
  const [addContactInfo] = useMutation(AddContactInfo);
  const [updateContactInfo] = useMutation(UpdateContactInfo);

  const handleSubmit = (contactInfo) => {
    addContactInfo({
      variables: {
        email: contactInfo.email,
        phone: contactInfo.phone,
        city: contactInfo.city,
        countryId: parseInt(contactInfo.countryId),
        website: contactInfo.website,
        avatarUrl: contactInfo.avatarUrl,
        about: contactInfo.about,
      },
      refetchQueries: [{ query: Users }],
    }).then((r1) => {
      updateUserContactInfo({
        variables: {
          id: userId,
          contactInfoId: r1.data.createContactInfo.id,
        },
      });
    });
  };

  const handleUpdate = (contactInfo) => {
    updateContactInfo({
      variables: {
        id: contactInfo.id,
        email: contactInfo.email,
        phone: contactInfo.phone,
        city: contactInfo.city,
        website: contactInfo.website,
        avatarUrl: contactInfo.avatarUrl,
        about: contactInfo.about,
        countryId: contactInfo.country.id,
      },
      refetchQueries: [{ query: Users }],
    });
  };

  return (
    <>
      {contactInfo ? (
        <ContactInfoTable data={contactInfo} handleUpdate={handleUpdate} />
      ) : (
        <AddContactInfoModal handleSubmit={handleSubmit} />
      )}
    </>
  );
}
