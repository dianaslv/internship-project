import JobCard from "./JobCard";
import { useQuery } from "@apollo/client";
import PageLayout from "../../Commons/PageLayout/PageLayout";
import { Jobs } from "../../Apollo/Queries/JobQueries/JobQueries";
import React from "react";

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
