import CustomTable from "./CustomTable";
import React from "react";

export default function ContactInfoTable({ data, handleUpdate }) {
  function stopEditing(i, editedData) {
    console.log(i, editedData);
    handleUpdate(editedData);
  }

  return (
    <>
      {data && (
        <CustomTable
          stopEditing={stopEditing}
          data={[data]}
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
              prop: "country.name",
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
