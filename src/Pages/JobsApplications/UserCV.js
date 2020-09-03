import React from "react";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";

import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { red } from "@material-ui/core/colors";
import FavoriteIcon from "@material-ui/icons/Favorite";
import ShareIcon from "@material-ui/icons/Share";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import makeStyles from "@material-ui/core/styles/makeStyles";
import moment from "moment";
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
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

export default function UserCV({ user }) {
  const [expanded, setExpanded] = React.useState(false);
  const classes = useStyles();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <>
      <CardContent>
        <Typography>
          Applicant: {user.firstName}, {user.lastName}.
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Applicant Skills</Typography>
          {user.userSkills.map((skill) => {
            return (
              <Typography paragraph>
                {skill.skill.name} - level {skill.rating}
              </Typography>
            );
          })}
          <Typography paragraph>Applicant Education</Typography>
          {user.userEducations.map((education) => {
            return (
              <Typography paragraph>
                {education.institution} {education.description}{" "}
                {moment.unix(education.startDate).format("DD.MM.YYYY")}-
                {moment.unix(education.endDate).format("DD.MM.YYYY")}
              </Typography>
            );
          })}
          <Typography paragraph>Applicant Work Experience</Typography>

          {user.userWorkExperiences.map((work) => {
            return (
              <Typography paragraph>
                {work.institution} {work.description}{" "}
                {moment.unix(work.startDate).format("DD.MM.YYYY")}-
                {moment.unix(work.endDate).format("DD.MM.YYYY")}
              </Typography>
            );
          })}
        </CardContent>
      </Collapse>
    </>
  );
}
