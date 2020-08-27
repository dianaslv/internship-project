import React, { useEffect, useState } from "react";
import PageLayout from "../../../Commons/PageLayout/PageLayout";
import UserDataTable from "./UserDataTable";
import ContactInfoTable from "./ContactInfoTable";
import { useAppContext } from "../../../Context/ContextProvider";

export default function ProfilePage() {
  return (
    <PageLayout title="My profile page" userType={"user"}>
      <UserDataTable />
      <ContactInfoTable />
    </PageLayout>
  );
}
