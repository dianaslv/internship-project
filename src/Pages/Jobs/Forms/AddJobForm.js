import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import GeneralInfoForm from "./GeneralInfoForm";
import { useMutation, useQuery } from "@apollo/client";
import { AddJob, Jobs } from "../../../Apollo/Queries/JobQueries/JobQueries";
import { AddJobRequirement } from "../../../Apollo/Queries/JobQueries/JobRequirementsQueries";
import { AddJobBenefit } from "../../../Apollo/Queries/JobQueries/JobBenefitsQueries";
import { AddJobSkill } from "../../../Apollo/Queries/JobQueries/JobSkillsQueries";
import { AddSkill } from "../../../Apollo/Queries/SkillsQueries";
import MultipleSkillsForm from "./MultipleSkillsForm";
import NameInput from "../../../Commons/CommonComponents/Forms/NameInput";
import { useAppContext } from "../../../Context/ContextProvider";
import { Companies } from "../../../Apollo/Queries/CompanyQueries/CompanyQueries";
import CircularProgress from "@material-ui/core/CircularProgress";

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

export default function AddJobForm(props) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const [addJob] = useMutation(AddJob);
  const [job, setJob] = useState({});
  const [addJobRequirement] = useMutation(AddJobRequirement);
  const [addJobBenefit] = useMutation(AddJobBenefit);
  const [addJobSkill] = useMutation(AddJobSkill);
  const [addSkill] = useMutation(AddSkill);
  const { user } = useAppContext();
  const { data, loading } = useQuery(Companies);
  let companyId = 1;

  useEffect(() => {
    if (data && data.companies)
      data.companies.map((company) => {
        if (company.user.id === user.id) companyId = company.id;
      });
  }, [data]);

  if (loading) return <CircularProgress />;

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
    return [
      "Add General Infos",
      "Add Job Requirements",
      "Add Job Benefits",
      "Add Job Skills",
    ];
  };

  const handleSubmitGeneralInfo = (name, description) => {
    const updatedJob = { ...job };
    console.log("before updated in general info", updatedJob, job);

    updatedJob.name = name;
    updatedJob.description = description;
    updatedJob.isAvailable = true;
    updatedJob.companyId = companyId;
    setJob(updatedJob);
    console.log("after updated in general info", updatedJob, job);
    handleNext();
    console.log(activeStep, getSteps().length);
  };

  const handleSubmitRequirements = (listOfRequirements) => {
    const updatedJob = { ...job };
    const requirementsNameList = [];
    listOfRequirements.map((requirement, key) => {
      if (requirement.name !== "") {
        requirementsNameList.push(requirement.name);
      }
    });
    updatedJob["requirements"] = requirementsNameList;
    setJob(updatedJob);
    handleNext();
  };

  const handleSubmitBenefits = (listOfBenefits) => {
    const updatedJob = { ...job };
    console.log("before updated in benefits", updatedJob, job);
    const benefitsNameList = [];
    listOfBenefits.map((benefit, key) => {
      if (benefit.name !== "") {
        benefitsNameList.push(benefit.name);
      }
    });
    console.log(benefitsNameList);
    updatedJob["benefits"] = benefitsNameList;
    setJob(updatedJob);
    console.log("after updated in benefits", updatedJob, job);
    handleNext();
    console.log(activeStep, getSteps().length);
  };

  const handleSubmitSkills = (skills) => {
    const updatedJob = { ...job };
    const skillsList = [];
    skills.map((skill, key) => {
      if (skill.id === -1) {
        skillsList.push({ name: skill.name, rating: skill.rating });
      } else {
        skillsList.push({
          id: skill.id,
          name: skill.name,
          rating: skill.rating,
        });
      }
    });
    updatedJob["skills"] = skillsList;
    setJob(updatedJob);
    handleNext();
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <GeneralInfoForm handleSubmit={handleSubmitGeneralInfo} />;
      case 1:
        return <NameInput handleSubmit={handleSubmitRequirements} />;
      case 2:
        return <NameInput handleSubmit={handleSubmitBenefits} />;
      default:
        return <MultipleSkillsForm handleSubmit={handleSubmitSkills} />;
    }
  };

  const handleSendData = (e) => {
    e.preventDefault();
    addJob({
      variables: {
        name: job.name,
        description: job.description,
        isAvailable: true,
        companyId: job.companyId,
      },
    }).then((r) => {
      console.log(r.data.createJob.id);
      job.requirements.map((requirement, key) => {
        addJobRequirement({
          variables: {
            name: requirement,
            jobId: r.data.createJob.id,
          },
        });
      });
      job.benefits.map((benefit, key) => {
        addJobBenefit({
          variables: {
            name: benefit,
            jobId: r.data.createJob.id,
          },
        });
      });
      job.skills.map((skill, key) => {
        if (!skill.id) {
          addSkill({
            variables: {
              name: skill.name,
            },
          }).then((addSkillResult) => {
            console.log(addSkillResult.data.createSkill.id);
            addJobSkill({
              variables: {
                skillId: addSkillResult.data.createSkill.id,
                jobId: r.data.createJob.id,
                rating: parseInt(skill.rating),
              },
              refetchQueries: [{ query: Jobs }],
            });
          });
        } else {
          addJobSkill({
            variables: {
              skillId: parseInt(skill.id),
              jobId: r.data.createJob.id,
              rating: parseInt(skill.rating),
            },
            refetchQueries: [{ query: Jobs }],
          });
        }
      });
    });
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
