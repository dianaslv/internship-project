import React, { useEffect, useState } from "react";
import PageLayout from "../../../Commons/PageLayout/PageLayout";
import UserSkills from "./UserCVInfos/UserSkills";
import UserEducations from "./UserCVInfos/UserEducations";
import UserWorkExperiences from "./UserCVInfos/UserWorkExperiences";

export default function CVPage() {
  return (
    <PageLayout title="My CV page" userType={"user"}>
      <UserSkills />
      <UserEducations />
      <UserWorkExperiences />
    </PageLayout>
  );
}
