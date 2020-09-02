import React from "react";
import PageLayout from "../../Commons/PageLayout/PageLayout";
import { useAppContext } from "../../Context/ContextProvider";
import JobsPage from "../JobsApplications/JobsPage";

export default function LandingPage() {
  const { user } = useAppContext();

  return (
    <PageLayout title="Landing page" userType={user.userRole}>
      <JobsPage />
    </PageLayout>
  );
}
