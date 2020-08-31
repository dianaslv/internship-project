import React from "react";
import PageLayout from "../../../Commons/PageLayout/PageLayout";
import UserDataTable from "./UserDataTable";
import ContactInfoTable from "../../../Commons/CommonComponents/Tables/ContactInfoTable";
import UserContactInfo from "./UserContactInfo";

export default function ProfilePage() {
  return (
    <PageLayout title="My profile page" userType={"user"}>
      <UserDataTable />
      <UserContactInfo />
    </PageLayout>
  );
}
