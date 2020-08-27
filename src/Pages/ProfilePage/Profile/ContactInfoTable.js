import { useAppContext } from "../../../Context/ContextProvider";
import CustomTable from "../../../Commons/CommonComponents/CustomTable";
import React, { useEffect, useState } from "react";
import {
  GetUsersDataForCV,
  UpdateContactInfo,
  UpdateUser,
  UsersContactInfo,
} from "../../../Apollo/Queries/UserQueries/UserQueries";
import { useMutation, useQuery } from "@apollo/client";

export default function ContactInfoTable() {
  const { user } = useAppContext();
  const [index, setIndex] = useState(-1);
  const [contactInfo, setContactInfo] = useState({});
  const [getUpdatedContactInfo] = useMutation(UpdateContactInfo);
  const { data, loading } = useQuery(UsersContactInfo, {
    variables: {
      id: user.id,
    },
  });

  useEffect(() => {
    if (data) {
      console.log(data);
      let updateContactInfo = { ...data.user.contactInfo };
      updateContactInfo["countryId"] = data.user.contactInfo.country.id;
      updateContactInfo["countryName"] = data.user.contactInfo.country.name;
      console.log(updateContactInfo);
      setContactInfo(updateContactInfo);
    }
  }, [data]);

  if (loading) return null;

  const startEditing = (i) => {
    setIndex(i);
  };

  const stopEditing = () => {
    const updatedContactInfo = { ...contactInfo };
    getUpdatedContactInfo({
      variables: {
        id: updatedContactInfo.id,
        email: updatedContactInfo.email,
        phone: updatedContactInfo.phone,
        city: updatedContactInfo.city,
        website: updatedContactInfo.website,
        avatarUrl: updatedContactInfo.avatarUrl,
        about: updatedContactInfo.about,
        countryId: parseInt(updatedContactInfo.countryId),
      },
    }).then((r) => {
      console.log(r);
      setIndex(-1);
    });
  };

  const handleChange = (options) => {
    console.log(options.name, options.value);
    const updatedContactInfo = { ...contactInfo };
    updatedContactInfo[options.name] = options.value;
    if (options.options) {
      const selectedIndex = options.options.selectedIndex;
      const key = options.options[selectedIndex].getAttribute("data-key");
      updatedContactInfo["countryId"] = key;
      console.log(selectedIndex, key);
    }
    console.log(updatedContactInfo);
    setContactInfo(updatedContactInfo);
  };

  return user.id && data && contactInfo ? (
    <>
      <CustomTable
        startEditing={startEditing}
        stopEditing={stopEditing}
        handleChange={handleChange}
        editIdx={index}
        data={[contactInfo]}
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
            name: "Country Name",
            prop: "countryName",
            componentForEditing: "CountrySelector",
          },
          {
            name: "Website",
            prop: "website",
          },
          {
            name: "About",
            prop: "about",
          },
        ]}
        title="User Contact Info"
      />
    </>
  ) : null;
}
