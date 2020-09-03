import JobCard from "./JobCardInfo";
import { useQuery } from "@apollo/client";
import PageLayout from "../../Commons/PageLayout/PageLayout";
import { Jobs } from "../../Apollo/Queries/JobQueries/JobQueries";
import React from "react";
import Button from "@material-ui/core/Button";
import { useAppContext } from "../../Context/ContextProvider";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import JobCardInfo from "./JobCardInfo";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    height: 250,
  },
}));
export default function JobsPage(props) {
  const { data: jobsData, loading: loadingJobs } = useQuery(Jobs, {
    fetchPolicy: "cache-and-network",
  });
  const { user } = useAppContext();
  const classes = useStyles();

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
      <Grid container spacing={5}>
        {jobsData &&
          jobsData.jobs.map((job, key) => (
            <Grid item xs={3}>
              <Card className={classes.root}>
                <JobCardInfo job={job} />
              </Card>
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
            </Grid>
          ))}
      </Grid>
      <br />
    </PageLayout>
  );
}
