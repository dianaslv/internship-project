import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import PageLayout from "../../Commons/PageLayout/PageLayout";
import { useAppContext } from "../../Context/ContextProvider";
import {
  UpdateUserApplication,
  UserJobApplication,
} from "../../Apollo/Queries/UserJobApplicationQueries/UserJobApplicationQueries";
import JobCard from "./JobCardInfo";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { Typography } from "@material-ui/core";
import UserCV from "./UserCV";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function JobsApplicationsPage() {
  const classes = useStyles();
  const { user } = useAppContext();
  const {
    data: userJobApplication,
    loading: loadingUserJobApplication,
  } = useQuery(UserJobApplication, { fetchPolicy: "cache-and-network" });
  const [updateUserJobApplications] = useMutation(UpdateUserApplication);
  if (loadingUserJobApplication) return null;

  if (userJobApplication) console.log(userJobApplication);

  const handleAcceptJobApplication = (e, jobAppId) => {
    e.preventDefault();
    updateUserJobApplications({
      variables: {
        id: jobAppId,
        isAccepted: true,
      },
      refetchQueries: [{ query: UserJobApplication }],
    });
  };

  return (
    <PageLayout title="Job Applications">
      {
        <>
          {userJobApplication &&
            userJobApplication.userJobApplications.map((jobApp) => (
              <>
                {jobApp ? (
                  <>
                    {user.userRole.toString() === "company_user" && (
                      <>
                        {jobApp.job &&
                          jobApp.user &&
                          jobApp.job.company &&
                          jobApp.job.company.user &&
                          jobApp.job.company.user.id === user.id && (
                            <>
                              <Card className={classes.root}>
                                <JobCard job={jobApp.job} />
                                <UserCV user={jobApp.user} />
                              </Card>
                              {jobApp.isAccepted ? (
                                <Typography>
                                  Job Application already accepted
                                </Typography>
                              ) : (
                                <Button
                                  onClick={(e) =>
                                    handleAcceptJobApplication(e, jobApp.id)
                                  }
                                >
                                  Accept application
                                </Button>
                              )}
                            </>
                          )}
                      </>
                    )}

                    {user.userRole.toString() === "user" && (
                      <>
                        {jobApp && jobApp.user && jobApp.user.id === user.id && (
                          <>
                            <Card className={classes.root}>
                              <JobCard job={jobApp.job} />
                            </Card>
                            {jobApp.isAccepted ? (
                              <p>Accepted</p>
                            ) : (
                              <p>Not accepted yet/Rejected</p>
                            )}
                          </>
                        )}
                      </>
                    )}
                  </>
                ) : null}
              </>
            ))}
        </>
      }
    </PageLayout>
  );
}
