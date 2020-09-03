import React from "react";
import { useMutation } from "@apollo/client";
import ContactInfoTable from "../../../Commons/CommonComponents/Tables/ContactInfoTable";
import { Companies } from "../../../Apollo/Queries/CompanyQueries/CompanyQueries";
import { UpdateContactInfo } from "../../../Apollo/Queries/UserQueries/UserQueries";

export default function CompanyContactInfo({ contactInfo }) {
  const [updateContactInfo] = useMutation(UpdateContactInfo);

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
      refetchQueries: [
        {
          query: Companies,
        },
      ],
    });
  };

  return (
    contactInfo && (
      <ContactInfoTable handleUpdate={handleUpdate} data={contactInfo} />
    )
  );
}
