import React from "react";
import PageLayout from "../../Commons/PageLayout/PageLayout";
import { useAppContext } from "../../Context/ContextProvider";
import UsersTable from "./Users/UsersTable";
import CompaniesTable from "./Companies/CompaniesTable";

export default function AdminPage() {
  const { user } = useAppContext();

  return (
    <PageLayout title="Landing page" userType={user.userRole}>
      <UsersTable />
      <CompaniesTable />
    </PageLayout>
  );
}
