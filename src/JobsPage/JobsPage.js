import React, { useEffect, useState } from "react";
import JobCard from "./JobCard";
import { useQuery } from "@apollo/client";
import PageLayout from "../PageLayout/PageLayout";
import { Jobs } from "../Apollo/Queries/JobQueries/JobQueries";
import { JobSkills } from "../Apollo/Queries/JobQueries/JobSkillsQueries";
import { JobRequirements } from "../Apollo/Queries/JobQueries/JobRequirementsQueries";
import { JobBenefits } from "../Apollo/Queries/JobQueries/JobBenefitsQueries";

export default function JobsPage() {
  const { data: jobsData, loading: loadingJobs } = useQuery(Jobs);
  const { data: jobsSkillsData, loading: loadingJobSkills } = useQuery(
    JobSkills
  );
  const {
    data: jobRequirementsData,
    loading: loadingJobRequirements,
  } = useQuery(JobRequirements);
  const { data: jobBenefitsData, loading: loadingJobBenefits } = useQuery(
    JobBenefits
  );

  if (loadingJobSkills) return null;
  if (loadingJobs) return null;
  if (loadingJobBenefits) return null;

  return (
    <PageLayout title="Jobs  page" userType={"user"}>
      {jobsData &&
        jobsSkillsData &&
        jobRequirementsData &&
        jobBenefitsData &&
        jobsData.jobs.map((job, key) => (
          <JobCard
            job={job}
            jobSkills={jobsSkillsData.jobSkills}
            jobRequirements={jobRequirementsData.jobRequirements}
            jobBenefits={jobBenefitsData.jobBenefits}
          />
        ))}
    </PageLayout>
  );
}
