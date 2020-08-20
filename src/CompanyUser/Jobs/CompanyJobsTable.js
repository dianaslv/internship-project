import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import JobGeneralInfoTable from "./NestedTables/JobGeneralInfoTable";
import JobRequirementsTable from "./NestedTables/JobRequirementsTable";
import JobBenefitsTable from "./NestedTables/JobBenefitsTable";
import JobSkillsTable from "./NestedTables/JobSkillsTable";
import JobSkillsModal from "./Modals/JobSkillsModal";
import RequirementsModal from "./Modals/RequirementsModal";
import {
  AddJob,
  DeleteJob,
  Jobs,
  UpdateJob,
} from "../../Apollo/Queries/JobQueries/JobQueries";
import BenefitsModal from "./Modals/BenefitsModal";
import MultipleInputs from "./Forms/MultipleInputs";
import AddJobForm from "./Forms/AddJobForm";
import AddJobModal from "./Modals/AddJobModal";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: "pink",
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

export default function CompanyJobsTable({ user }) {
  const { data, loading } = useQuery(Jobs);
  const [jobs, setJobs] = useState();
  const [index, setIndex] = useState(-1);
  const [getUpdatedJobs, { data: updatedJobs }] = useMutation(UpdateJob);
  const [deleteJob] = useMutation(DeleteJob);
  const [addJob, { data: addJobReceivedData }] = useMutation(AddJob);
  const classes = useStyles();

  useEffect(() => {
    if (data) {
      console.log("data", data);
      transformData(data.jobs);
    }
  }, [data]);

  if (loading) return null;

  const transformData = (newData) => {
    const newArr = [];
    console.log(newData);
    newData.map((job, key) => {
      let newJob = {};
      console.log(job);

      newJob.id = job["id"];
      newJob.name = job["name"];
      newJob.description = job["description"];
      newJob.isAvailable = job["isAvailable"];

      newJob.requirements = [];
      job.jobRequirements.map((requirement, key) =>
        newJob.requirements.push({ id: requirement.id, name: requirement.name })
      );

      newJob.benefits = [];
      job.jobBenefits.map((benefit, key) =>
        newJob.benefits.push({ id: benefit.id, name: benefit.name })
      );

      newJob.skills = [];
      job.jobSkills.map((currentSkill, key) => {
        console.log("currentSkill", currentSkill);
        newJob.skills.push({
          id: currentSkill.id,
          rating: currentSkill.rating,
          skillId: currentSkill.skill.id,
          skillName: currentSkill.skill.name,
        });
      });
      newArr.push(newJob);
    });
    console.log(newArr);
    setJobs([...newArr]);
  };

  const startEditing = (i) => {
    setIndex(i);
    console.log("start editing", index);
  };

  const stopEditing = (i) => {
    let updatedJob = jobs[i];
    const jobAvailability = updatedJob.isAvailable === "Available";
    getUpdatedJobs({
      variables: {
        id: updatedJob.id,
        name: updatedJob.name,
        description: updatedJob.description,
        isAvailable: jobAvailability,
      },
    }).then((r) => {
      const updatedJobs = [...jobs];
      updatedJobs[i] = updatedJob;
      setJobs(updatedJobs);
      setIndex(-1);
    });
  };

  const handleChange = (e, name, i) => {
    const { value } = e.target;
    jobs.map((job, userKey) => {
      if (i === userKey) {
        console.log(job, value, e.target.name, jobs[i], jobs[i][e.target.name]);
        const updatedJobs = [...jobs];
        updatedJobs[i][e.target.name] = value;
        setJobs(updatedJobs);
        console.log(jobs, data);
      }
    });
  };

  const createJobForWriteQuery = (job, id) => {
    return {
      name: job.name,
      id: id,
      description: job.description,
      isAvailable: job.isAvailable,
      __typename: "Job",
    };
  };

  const handleSubmit = (job) => {
    console.log(job);
    addJob({
      variables: {
        name: job.name,
        description: job.description,
        isAvailable: true,
        companyId: 1,
      },
      update: (cache, { data: job }) => {
        console.log("cache job", job);
        const existingJobs = cache.readQuery({ query: Jobs });
        console.log("existingJobs", existingJobs);
        const newJobs = Object.assign([], existingJobs.jobs);
        newJobs.push(job.createJob);
        console.log("newJobs", newJobs);
        cache.writeQuery({
          query: Jobs,
          data: { jobs: newJobs, __typename: "Job" },
        });

        console.log(data, newJobs);
      },
    });
  };

  const handleRemove = async (i) => {
    console.log("handle remove", i, jobs[i].id);
    await deleteJob({
      variables: { id: jobs[i].id },
      update: (cache) => {
        const existingJobs = cache.readQuery({ query: Jobs });
        console.log("existingUsers", existingJobs);
        const newJobs = existingJobs.jobs.filter((t) => t.id !== jobs[i].id);
        console.log("newJobs", newJobs);
        cache.writeQuery({
          query: Jobs,
          data: { jobs: newJobs, __typename: "Job" },
        });
        console.log(data, newJobs);
      },
    });
  };

  const handleUpdateJobGeneralInfo = (value, name, pos) => {
    console.log(value, name, pos);
    const updatedJobs = [...jobs];
    updatedJobs[pos][name] = value;
    console.log(updatedJobs);
    setJobs(updatedJobs);
    console.log(jobs);
  };

  const handleSubmitJobGeneralInfo = (job, pos) => {
    console.log("job in submit", job, pos);
    const newJobs = [...jobs];
    newJobs[pos] = job;
    setJobs(newJobs);
    console.log("after update", jobs);
  };

  const handleUpdateJobRequirement = (value, name, jobPos, skillPos) => {
    console.log(value, name, jobPos, skillPos);
    const updatedJobs = [...jobs];
    console.log(updatedJobs);
    console.log(updatedJobs[jobPos]);
    console.log(updatedJobs[jobPos]["requirements"]);
    console.log(updatedJobs[jobPos]["requirements"][skillPos]);
    console.log(updatedJobs[jobPos]["requirements"][skillPos][name]);
    updatedJobs[jobPos]["requirements"][skillPos][name] = value;
    setJobs(updatedJobs);
    console.log(jobs);
  };

  const handleSubmitJobRequirement = (requirement, pos) => {
    console.log("Requirement in submit", requirement, pos);
  };

  const handleUpdateJobBenefit = (value, name, jobPos, skillPos) => {
    console.log(value, name, jobPos, skillPos);
    const updatedJobs = [...jobs];
    updatedJobs[jobPos]["benefits"][skillPos][name] = value;
    setJobs(updatedJobs);
    console.log(jobs);
  };

  const handleSubmitJobBenefit = (benefit, pos) => {
    console.log("Benefits in submit", benefit, pos);
  };

  const handleUpdateJobSkill = (value, name, jobPos, skillPos) => {
    console.log(value, name, jobPos, skillPos);
    const updatedJobs = [...jobs];
    updatedJobs[jobPos]["skills"][skillPos][name] = value;
    setJobs(updatedJobs);
    console.log(jobs);
  };

  const handleSubmitJobSkill = (skill, pos) => {
    console.log("skills in submit", skill, pos);
  };

  return jobs ? (
    <>
      <AddJobModal companyId={1} />
      {jobs.map((job, key) => (
        <>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                Job No. {key}
              </Typography>
            </CardContent>

            <JobGeneralInfoTable
              job={job}
              positionInJobsTable={key}
              handleUpdateJobGeneralInfo={handleUpdateJobGeneralInfo}
              handleSubmitJobGeneralInfo={handleSubmitJobGeneralInfo}
            />
            <JobRequirementsTable
              jobId={job.id}
              requirements={job.requirements}
              positionInJobRequirementsTable={key}
              handleUpdateJobRequirement={handleUpdateJobRequirement}
              handleSubmitJobRequirement={handleSubmitJobRequirement}
            />

            <JobBenefitsTable
              jobId={job.id}
              benefits={job.benefits}
              positionInJobBenefitsTable={key}
              handleUpdateJobBenefit={handleUpdateJobBenefit}
              handleSubmitJobBenefit={handleSubmitJobBenefit}
            />
            <JobSkillsTable
              jobId={job.id}
              skills={job.skills}
              positionInJobSkillsTable={key}
              handleUpdateJobSkill={handleUpdateJobSkill}
              handleSubmitJobSkill={handleSubmitJobSkill}
            />
          </Card>
          <br />
          <br />
          <br />
        </>
      ))}
    </>
  ) : null;
}
