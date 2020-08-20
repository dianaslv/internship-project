import React from "react";
import PageLayout from "../PageLayout/PageLayout";
import { useAppContext } from "../Context/ContextProvider";
import UsersTable from "./UsersTable";

export default function LandingPage() {
  const { user } = useAppContext();

  return (
    <PageLayout title="Landing page" userType={user.userRole}>
      <UsersTable />
    </PageLayout>
  );
}
