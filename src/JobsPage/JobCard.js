import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

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

export default function JobCard(props) {
  console.log(props);
  const classes = useStyles();
  console.log(props.jobSkills);
  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          {props.job.isAvailable
            ? `Job still available in ${props.job.company.contactInfo.country.name}`
            : "Not available"}
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
        <br />
        {props.jobSkills &&
          props.jobSkills.map((jobSkill) => {
            if (jobSkill.job.id === props.job.id)
              return (
                <Typography variant="body2" component="p">
                  Skill: {jobSkill.skill.name} Rating: {jobSkill.rating}
                </Typography>
              );
          })}
        <br />
        {props.jobRequirements &&
          props.jobRequirements.map((jobRequirement) => {
            if (jobRequirement.job.id === props.job.id)
              return (
                <Typography variant="body2" component="p">
                  {jobRequirement.name}
                </Typography>
              );
          })}
        <br />
        {props.jobBenefits &&
          props.jobBenefits.map((jobBenefit) => {
            if (jobBenefit.job.id === props.job.id)
              return (
                <Typography variant="body2" component="p">
                  {jobBenefit.name}
                </Typography>
              );
          })}
      </CardContent>
      <CardActions>
        <Button size="small">Click to apply now!</Button>
      </CardActions>
    </Card>
  );
}
