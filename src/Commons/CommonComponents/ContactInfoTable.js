import CustomTable from "./CustomTable";
import React, { useEffect, useState } from "react";
import { UpdateContactInfo } from "../../Apollo/Queries/UserQueries/UserQueries";
import { useMutation } from "@apollo/client";

export default function ContactInfoTable({ data }) {
  const [index, setIndex] = useState(-1);
  const [contactInfo, setContactInfo] = useState({});
  const [updateContactInfo] = useMutation(UpdateContactInfo);

  useEffect(() => {
    if (data) {
      setContactInfo({ ...data });
    }
  }, [data]);

  const startEditing = (i) => {
    setIndex(i);
  };

  const stopEditing = () => {
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
    }).then((r) => {
      console.log(r);
      setIndex(-1);
    });
  };

  const handleChange = (options) => {
    const updatedContactInfo = { ...contactInfo };
    updatedContactInfo[options.name] = options.value;
    if (options.options) {
      const selectedIndex = options.options.selectedIndex;
      updatedContactInfo["countryId"] = options.options[
        selectedIndex
      ].getAttribute("data-key");
    }
    setContactInfo(updatedContactInfo);
  };

  return (
    <>
      {data && Object.keys(contactInfo).length !== 0 && (
        <CustomTable
          startEditing={startEditing}
          stopEditing={stopEditing}
          handleChange={handleChange}
          editIdx={index}
          data={[contactInfo]}
          disableDelete={true}
          header={[
            {
              name: "Email",
              prop: "email",
            },
            {
              name: "Phone",
              prop: "phone",
            },
            {
              name: "City",
              prop: "city",
            },
            {
              name: "Avatar",
              prop: "avatarUrl",
              specialFormatForDisplaying: "photoUrl",
            },
            {
              name: "Country Name",
              prop: "countryName",
              componentForEditing: "CountrySelector",
            },
            {
              name: "Website",
              prop: "website",
              specialFormatForDisplaying: "url",
            },
            {
              name: "About",
              prop: "about",
            },
          ]}
          title="Contact Info"
        />
      )}
    </>
  );
}
