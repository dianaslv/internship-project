import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import red from "@material-ui/core/colors/red";
import moment from "moment";

const useStyles = makeStyles((theme) => ({
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function JobCardInfo(props) {
  console.log(props.job);
  const classes = useStyles();

  return (
    <>
      <CardHeader
        avatar={
          <Avatar
            aria-label="recipe"
            className={classes.avatar}
            src={props.job.company.contactInfo.avatarUrl}
          />
        }
        title={props.job.company.name}
        subheader={
          props.job.isAvailable ? (
            <>
              {props.job.updatedAt ? (
                <p>
                  Posted on{" "}
                  {moment.unix(props.job.updatedAt).format("DD.MM.YYYY")}
                </p>
              ) : (
                <p>Job still available</p>
              )}
            </>
          ) : (
            "Not available"
          )
        }
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {props.job.name}
        </Typography>
        <Typography variant="body2" color="textSecondary" component="p">
          {props.job.description}
        </Typography>
      </CardContent>
    </>
  );
}
