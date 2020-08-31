import CustomTable from "./CustomTable";
import React, { useEffect, useState } from "react";

export default function ContactInfoTable({ data, handleUpdate }) {
  const [index, setIndex] = useState(-1);
  const [contactInfo, setContactInfo] = useState({});

  useEffect(() => {
    if (data) {
      console.log(data);
      setContactInfo({ ...data });
    }
  }, [data]);

  const startEditing = (i) => {
    setIndex(i);
  };

  const stopEditing = () => {
    handleUpdate(contactInfo);
    setIndex(-1);
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
