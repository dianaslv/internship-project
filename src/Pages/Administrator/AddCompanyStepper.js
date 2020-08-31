import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { useMutation } from "@apollo/client";
import ContactInfoForm from "../ProfilePage/Profile/ContactInfoForm";
import { AddCompany } from "../../Apollo/Queries/CompanyQueries/CompanyQueries";
import CompanyGeneralInfoForm from "./Forms/CompanyGeneralInfoForm";
import { AddContactInfo } from "../../Apollo/Queries/UserQueries/UserQueries";

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

  const handleSubmitGeneralInfo = (company) => {
    let updatedCompany = {};
    updatedCompany["name"] = company.name;
    updatedCompany["userId"] = company.userId;
    updatedCompany["userName"] = company.userName;
    setCompany(updatedCompany);
    handleNext();
  };

  const handleSubmitContactInfo = (contactInfo) => {
    console.log(contactInfo);
    let updatedCompany = { ...company };
    updatedCompany.about = contactInfo.about;
    updatedCompany.avatarUrl = contactInfo.avatarUrl;
    updatedCompany.city = contactInfo.city;
    updatedCompany.countryId = contactInfo.countryId;
    updatedCompany.countryName = contactInfo.countryName;
    updatedCompany.email = contactInfo.email;
    updatedCompany.phone = contactInfo.phone;
    updatedCompany.website = contactInfo.website;
    setCompany(updatedCompany);
    handleNext();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <CompanyGeneralInfoForm handleSubmit={handleSubmitGeneralInfo} />
        );
      case 1:
        return <ContactInfoForm handleSubmit={handleSubmitContactInfo} />;
    }
  };

  const handleSendData = (e) => {
    e.preventDefault();
    console.log(company);
    props.handleSubmit(company);
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
        <Button onClick={handleSendData}>Finish</Button>
      ) : null}
    </>
  );
}
