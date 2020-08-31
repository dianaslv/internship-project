import React from "react";
import PageLayout from "../../Commons/PageLayout/PageLayout";
import { useMutation, useQuery } from "@apollo/client";
import { GetJobById } from "../../Apollo/Queries/JobQueries/JobQueries";
import Typography from "@material-ui/core/Typography";
import { useAppContext } from "../../Context/ContextProvider";
import { AddUserJobApplication } from "../../Apollo/Queries/UserJobApplicationQueries/UserJobApplicationQueries";
import Button from "@material-ui/core/Button";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Card from "@material-ui/core/Card";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

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

export default function JobsDetailsPage(props) {
  const {
    match: { params },
  } = props;
  const { user } = useAppContext();
  const { data, loading } = useQuery(GetJobById, {
    variables: {
      id: parseInt(params.id),
    },
  });
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const [addUserJobApplication] = useMutation(AddUserJobApplication);

  if (data) console.log(data);

  if (loading) return null;

  if (!params.id) return null;
  console.log(user);

  const handleSubmit = () => {
    addUserJobApplication({
      variables: {
        userId: user.id,
        jobId: parseInt(data.job.id),
      },
    }).then((r) => setOpen(true));
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") return null;
    setOpen(false);
  };

  return (
    data && (
      <PageLayout title="Job Details  page" userType={"user"}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography
              className={classes.title}
              color="textSecondary"
              gutterBottom
            >
              {data.job.isAvailable ? "Job still available" : "Not available"}
            </Typography>
            <Typography variant="h5" component="h2">
              {data.job.name}
            </Typography>
            <Typography className={classes.pos} color="textSecondary">
              {data.job.company.name}
            </Typography>
            <Typography variant="body2" component="p">
              {data.job.description}
            </Typography>
          </CardContent>

          {data.job &&
            data.job.jobBenefits &&
            data.job.jobBenefits.map((jobBenefit) => {
              return (
                <Typography variant="body2" component="p">
                  {jobBenefit.name}
                </Typography>
              );
            })}
          <br />
          <br />
          <br />
          {data.job &&
            data.job.jobRequirements &&
            data.job.jobRequirements.map((jobRequirement) => {
              return (
                <Typography variant="body2" component="p">
                  {jobRequirement.name}
                </Typography>
              );
            })}
          <br />
          <br />
          <br />
          {data.job &&
            data.job.jobSkills &&
            data.job.jobSkills.map((jobSkill) => {
              return (
                <Typography variant="body2" component="p">
                  {jobSkill.skill.name}
                </Typography>
              );
            })}

          <CardActions>
            {user.userRole === "user" ? (
              <Button onClick={handleSubmit}>Apply to this job</Button>
            ) : null}
            <Snackbar open={open} autoHideDuration={1000} onClose={handleClose}>
              <Alert onClose={handleClose} severity="success">
                This is a success message!
              </Alert>
            </Snackbar>
          </CardActions>
        </Card>
      </PageLayout>
    )
  );
}
