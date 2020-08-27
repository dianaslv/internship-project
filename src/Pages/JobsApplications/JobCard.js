import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useHistory, withRouter } from "react-router-dom";
import { useAppContext } from "../../Context/ContextProvider";

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

function JobCard(props) {
  console.log(props.job);
  const classes = useStyles();
  const { user, updateUser } = useAppContext();

  function handleClick(e) {
    e.preventDefault();
    const { history } = props;
    console.log(user.id);
    if (user.id) {
      history.push(`/job/${props.job.id}`);
    } else {
      history.push(`/login`);
    }
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.job.isAvailable ? "Job still available" : "Not available"}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.job.name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.job.company.name}
        </Typography>
        <Typography variant="body2" component="p">
          {props.job.description}
        </Typography>
      </CardContent>
      <CardActions>
        {props.job.isAvailable ? (
          <Button onClick={handleClick} size="small">
            See job details
          </Button>
        ) : null}
      </CardActions>
    </Card>
  );
}

export default withRouter(JobCard);
