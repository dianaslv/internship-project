import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { useQuery } from "@apollo/client";
import PageLayout from "../PageLayout/PageLayout";
import { Jobs } from "../Apollo/Queries/JobQueries/JobQueries";
import { JobSkills } from "../Apollo/Queries/JobQueries/JobSkillsQueries";
import { JobRequirements } from "../Apollo/Queries/JobQueries/JobRequirementsQueries";
import { JobBenefits } from "../Apollo/Queries/JobQueries/JobBenefitsQueries";
import { useAppContext } from "../Context/ContextProvider";

export default function JobsPage() {
  const { data: jobsData, loading: loadingJobs } = useQuery(Jobs);
  if (loadingJobs) return null;
  if (jobsData) console.log(jobsData.jobs);

  return (
    <PageLayout title="Jobs  page" userType={"user"}>
      {jobsData && jobsData.jobs.map((job, key) => <JobCard job={job} />)}
    </PageLayout>
  );
}
