import React from "react";
import PageLayout from "../../Commons/PageLayout/PageLayout";
import { useAppContext } from "../../Context/ContextProvider";
import UsersTable from "./UsersTable";
import CompaniesTable from "./CompaniesTable";

export default function AdminPage() {
  const { user } = useAppContext();

  return (
    <PageLayout title="Landing page" userType={user.userRole}>
      <UsersTable />
      <CompaniesTable />
    </PageLayout>
  );
}
