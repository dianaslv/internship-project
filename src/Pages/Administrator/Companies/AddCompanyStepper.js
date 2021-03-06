import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import ContactInfoForm from "../../ProfilePage/Profile/ContactInfoForm";
import CompanyGeneralInfoForm from "./CompanyGeneralInfoForm";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  button: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

export default function AddCompanyStepper(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const [company, setCompany] = useState({});

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const getSteps = () => {
    return ["Add General Info", "Add Contact Info"];
  };

  const handleSubmit = (companyData) => {
    let updatedCompany = { ...company };
    for (const [key, value] of Object.entries(companyData)) {
      console.log(`${key}: ${value}`);
      updatedCompany[key] = value;
    }
    console.log(updatedCompany);
    setCompany(updatedCompany);
    handleNext();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <CompanyGeneralInfoForm handleSubmit={handleSubmit} />;
      case 1:
        return <ContactInfoForm handleSubmit={handleSubmit} />;
    }
  };

  return (
    <>
      <Stepper activeStep={activeStep}>
        {getSteps().map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          if (isStepOptional(index)) {
            labelProps.optional = (
              <Typography variant="caption">Optional</Typography>
            );
          }
          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Typography className={classes.instructions}>
        {getStepContent(activeStep)}
      </Typography>
      {activeStep === getSteps().length ? (
        <Button onClick={(e) => props.handleSubmit(company)}>Finish</Button>
      ) : null}
    </>
  );
}
