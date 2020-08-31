import { useAppContext } from "../../../Context/ContextProvider";
import React, { useEffect, useState } from "react";
import {
  AddContactInfo,
  UpdateContactInfo,
  UpdateUserContactInfo,
  UsersContactInfo,
} from "../../../Apollo/Queries/UserQueries/UserQueries";
import { useMutation, useQuery } from "@apollo/client";
import AddContactInfoModal from "./AddContactInfoModal";
import ContactInfoTable from "../../../Commons/CommonComponents/Tables/ContactInfoTable";
import { ContactInfoById } from "../../../Apollo/Queries/CompanyQueries/CompanyQueries";

export default function UserContactInfo() {
  const { user } = useAppContext();
  const [contactInfo, setContactInfo] = useState({});
  const [updateUserContactInfo] = useMutation(UpdateUserContactInfo);
  const [addContactInfo] = useMutation(AddContactInfo);
  const [updateContactInfo] = useMutation(UpdateContactInfo);
  const { data, loading } = useQuery(UsersContactInfo, {
    variables: {
      id: user.id,
    },
  });

  useEffect(() => {
    if (data && data.user && data.user.contactInfo) {
      console.log(data);
      let updateContactInfo = { ...data.user.contactInfo };
      updateContactInfo["countryId"] = data.user.contactInfo.country.id;
      updateContactInfo["countryName"] = data.user.contactInfo.country.name;
      console.log(updateContactInfo);
      setContactInfo(updateContactInfo);
    }
  }, [data]);

  if (loading) return null;

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
    }).then((r1) => {
      updateUserContactInfo({
        variables: {
          id: user.id,
          contactInfoId: r1.data.createContactInfo.id,
        },
      }).then((r2) => {
        let updatedContactInfo = { ...contactInfo };
        updatedContactInfo["id"] = r1.data.createContactInfo.id;
        setContactInfo({ ...contactInfo });
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
        countryId: parseInt(contactInfo.countryId),
      },
      refetchQueries: [
        {
          query: UsersContactInfo,
          variables: {
            id: user.id,
          },
        },
      ],
    }).then((r) => {
      console.log(r);
    });
  };

  return (
    <>
      {user.id && data && Object.keys(contactInfo).length !== 0 ? (
        <ContactInfoTable data={contactInfo} handleUpdate={handleUpdate} />
      ) : (
        <AddContactInfoModal handleSubmit={handleSubmit} />
      )}
    </>
  );
}
