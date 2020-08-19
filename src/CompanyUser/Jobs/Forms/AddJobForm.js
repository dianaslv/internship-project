import React, {useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import GeneralInfoForm from "./GeneralInfoForm";
import RequirementForm from "./RequirementsForm";
import BenefitsForm from "./BenefitsForm";
import SkillsForm from "./SkillsForm";
import {useMutation} from "@apollo/client";
import {AddJob} from "../../../Apollo/Queries/JobQueries/JobQueries";
import {AddJobRequirement} from "../../../Apollo/Queries/JobQueries/JobRequirementsQueries";
import {AddJobBenefit} from "../../../Apollo/Queries/JobQueries/JobBenefitsQueries";
import {AddJobSkill} from "../../../Apollo/Queries/JobQueries/JobSkillsQueries";
import {AddSkill} from "../../../Apollo/Queries/SkillsQueries";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
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
    const [addJob, {data: addedJob}] = useMutation(AddJob);
    const [job, setJob] = useState({});
    const [addJobRequirement, {data: addedJobRequirement}] = useMutation(AddJobRequirement);
    const [addJobBenefit, {data: addedJobBenefit}] = useMutation(AddJobBenefit);
    const [addJobSkill, {data: addedJobSkill}] = useMutation(AddJobSkill);
    const [addSkill, {data: addedSkill}] = useMutation(AddSkill);

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
        return ['Add General Infos', 'Add Job Requirements', 'Add Job Benefits', 'Add Job Skills'];
    }


    const handleSubmitGeneralInfo = (name, description) => {
        const updatedJob = {...job}
        console.log("before updated in general info", updatedJob, job);

        updatedJob.name = name;
        updatedJob.description = description;
        updatedJob.isAvailable = true;
        updatedJob.companyId = props.companyId;
        setJob(updatedJob);
        console.log("after updated in general info", updatedJob, job);
        handleNext();
        console.log(activeStep, getSteps().length);
    }

    const handleSubmitRequirements = (listOfRequirements) => {
        const updatedJob = {...job};
        console.log("before updated in requirements", updatedJob, job);
        const requirementsNameList = [];
        listOfRequirements.map((requirement, key) => {
            if (requirement.name !== "") {
                requirementsNameList.push(requirement.name);
            }
        })
        console.log(requirementsNameList);
        updatedJob['requirements'] = requirementsNameList;
        setJob(updatedJob)
        console.log("after updated in requirements", updatedJob, job);
        handleNext();
        console.log(activeStep, getSteps().length);
    };

    const handleSubmitBenefits = (listOfBenefits) => {
        const updatedJob = {...job};
        console.log("before updated in benefits", updatedJob, job);
        const benefitsNameList = [];
        listOfBenefits.map((benefit, key) => {
            if (benefit.name !== "") {
                benefitsNameList.push(benefit.name);
            }
        })
        console.log(benefitsNameList);
        updatedJob['benefits'] = benefitsNameList;
        setJob(updatedJob)
        console.log("after updated in benefits", updatedJob, job);
        handleNext();
        console.log(activeStep, getSteps().length);
    }

    const handleSubmitSkills = (skillName, skillId, rating) => {
        const updatedJob = {...job};
        console.log("before updated in skills", updatedJob, job);
        const skillsList = [];
        if (skillId === -1) {
            console.log("will add a new skill with value", skillName);
            skillsList.push({'name': skillName, 'rating': rating})
        } else {
            console.log("will add an existing skill with id", skillId, " and with value", skillName);
            skillsList.push({'id': skillId, 'name': skillName, 'rating': rating})
        }
        console.log(skillsList);
        updatedJob['skills'] = skillsList;
        setJob(updatedJob);
        console.log("after updated in skills", updatedJob, job);
        handleNext();
        console.log(activeStep, getSteps().length);
    }


    const getStepContent = (step) => {
        switch (step) {
            case 0:
                return <GeneralInfoForm handleSubmit={handleSubmitGeneralInfo}/>;
            case 1:
                return <RequirementForm handleSubmit={handleSubmitRequirements}/>;
            case 2:
                return <BenefitsForm handleSubmit={handleSubmitBenefits}/>;
            default:
                return <SkillsForm handleSubmit={handleSubmitSkills}/>;
        }
    }

    const handleSendData = (e) => {
        e.preventDefault();
        console.log(job);
        addJob({
            variables: {
                name: job.name,
                description: job.description,
                isAvailable: true,
                companyId: job.companyId
            }
        }).then(r => {
            console.log(r.data.createJob.id);
            job.requirements.map((requirement, key) => {
                addJobRequirement({
                    variables: {
                        name: requirement,
                        jobId: r.data.createJob.id
                    }
                })
            });
            job.benefits.map((benefit, key) => {
                addJobBenefit({
                    variables: {
                        name: benefit,
                        jobId: r.data.createJob.id
                    }
                })
            });
            job.skills.map((skill, key) => {
                if (!skill.id) {
                    addSkill({
                        variables: {
                            name: skill.name
                        }
                    })
                        .then(addSkillResult => {
                            console.log(addSkillResult.data.createSkill.id);
                            addJobSkill({
                                variables: {
                                    skillId: addSkillResult.data.createSkill.id,
                                    jobId: r.data.createJob.id,
                                    rating: parseInt(skill.rating)
                                }
                            });
                        });
                } else {
                    addJobSkill({
                        variables: {
                            skillId: parseInt(skill.id),
                            jobId:  r.data.createJob.id,
                            rating: parseInt(skill.rating)
                        }
                    });

                }
            })
        });
    }
    return (
        <>
            <Stepper activeStep={activeStep}>
                {getSteps().map((label, index) => {
                    const stepProps = {};
                    const labelProps = {};
                    if (isStepOptional(index)) {
                        labelProps.optional = <Typography variant="caption">Optional</Typography>;
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
            <Typography className={classes.instructions}>{getStepContent(activeStep)}</Typography>
            {activeStep === getSteps().length ? <Button onClick={handleSendData}>Finish</Button> : null}
        </>
    );
}
