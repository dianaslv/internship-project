import JobCard from "./JobCard";
import { useQuery } from "@apollo/client";
import PageLayout from "../../Commons/PageLayout/PageLayout";
import { Jobs } from "../../Apollo/Queries/JobQueries/JobQueries";
import React from "react";
import Button from "@material-ui/core/Button";
import { useAppContext } from "../../Context/ContextProvider";

export default function JobsPage(props) {
  const { data: jobsData, loading: loadingJobs } = useQuery(Jobs);
  const { user } = useAppContext();

  if (loadingJobs) return null;

  function handleClick(jobId) {
    const { history } = props;
    if (user.id) {
      history.push(`/job/${jobId}`);
    } else {
      history.push(`/login`);
    }
  }
  return (
    <PageLayout title="Jobs  page" userType={"user"}>
      {jobsData &&
        jobsData.jobs.map((job, key) => (
          <>
            <JobCard job={job} />
            {job.isAvailable && (
              <Button
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(job.id);
                }}
                size="small"
              >
                See job details
              </Button>
            )}
          </>
        ))}
    </PageLayout>
  );
}
