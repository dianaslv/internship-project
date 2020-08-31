import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import ContactInfoTable from "../../Commons/CommonComponents/Tables/ContactInfoTable";
import { ContactInfoById } from "../../Apollo/Queries/CompanyQueries/CompanyQueries";
import {
  GetUserWorkExperiencesDataForCV,
  UpdateContactInfo,
} from "../../Apollo/Queries/UserQueries/UserQueries";

export default function CompanyContactInfo({ contactInfoId }) {
  const { data: contactInfoData, loading } = useQuery(ContactInfoById, {
    variables: { id: contactInfoId },
  });
  const [contactInfo, setContactInfo] = useState({});
  const [updateContactInfo] = useMutation(UpdateContactInfo);

  useEffect(() => {
    if (contactInfoData && contactInfoData.contactInfo) {
      let updatedContactInfo = { ...contactInfoData.contactInfo };
      updatedContactInfo.countryId =
        contactInfoData.contactInfo["country"]["id"];
      updatedContactInfo.countryName =
        contactInfoData.contactInfo["country"]["name"];
      setContactInfo(updatedContactInfo);
    }
  }, [contactInfoData]);

  if (loading) return null;

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
          query: ContactInfoById,
          variables: {
            id: contactInfoId,
          },
        },
      ],
    }).then((r) => {
      console.log(r);
    });
  };

  return (
    contactInfoId &&
    contactInfoData &&
    contactInfoData.contactInfo &&
    contactInfo && (
      <ContactInfoTable handleUpdate={handleUpdate} data={contactInfo} />
    )
  );
}
