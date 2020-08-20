import React, { useEffect, useState } from "react";
import PageLayout from "../../PageLayout/PageLayout";
import UserDataTable from "../Profile/UserDataTable";
import CVTable from "./CVTable";

export default function CVPage() {
  return (
    <PageLayout title="My CV page" userType={"user"}>
      <CVTable />
    </PageLayout>
  );
}
