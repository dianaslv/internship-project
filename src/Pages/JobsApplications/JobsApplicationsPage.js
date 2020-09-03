import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import PageLayout from "../../Commons/PageLayout/PageLayout";
import { useAppContext } from "../../Context/ContextProvider";
import {
  UpdateUserApplication,
  UserJobApplication,
} from "../../Apollo/Queries/UserJobApplicationQueries/UserJobApplicationQueries";
import JobCard from "./JobCard";
import CardContent from "@material-ui/core/CardContent";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles({
  root: {
    backgroundColor: "pink",
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
                  <Card className={classes.root} variant="outlined">
                    <CardContent>
                      {user.userRole.toString() === "company_user" ? (
                        <>
                          {jobApp &&
                          jobApp.job &&
                          jobApp.job.company &&
                          jobApp.job.company.user &&
                          jobApp.job.company.user.id === user.id ? (
                            <>
                              <JobCard job={jobApp.job} />
                              {jobApp.isAccepted ? (
                                <p>Already Accepted</p>
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
                          ) : null}
                        </>
                      ) : (
                        jobApp &&
                        jobApp.user &&
                        jobApp.user.id === user.id && (
                          <>
                            <JobCard job={jobApp.job} />
                            {jobApp.isAccepted ? (
                              <p>Accepted</p>
                            ) : (
                              <p>Not accepted yet/Rejected</p>
                            )}
                          </>
                        )
                      )}
                    </CardContent>
                  </Card>
                ) : null}
              </>
            ))}
        </>
      }
    </PageLayout>
  );
}
