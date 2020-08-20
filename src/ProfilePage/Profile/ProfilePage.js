import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout/PageLayout";
import UserDataTable from "./UserDataTable";
import ContactInfoTable from "./ContactInfoTable";

export default function ProfilePage() {
  return (
    <PageLayout title="My profile page" userType={"user"}>
      <UserDataTable />
      <ContactInfoTable />
    </PageLayout>
  );
}
