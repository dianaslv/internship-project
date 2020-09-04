import React from "react";
import { useQuery } from "@apollo/client";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import JobRequirementsTable from "./NestedTables/JobRequirementsTable";
import JobBenefitsTable from "./NestedTables/JobBenefitsTable";
import { Jobs } from "../../Apollo/Queries/JobQueries/JobQueries";
import AddJobModal from "./Modals/AddJobModal";
import JobGeneralInfoTable from "./NestedTables/JobGeneralInfoTable";
import JobSkillsTable from "./NestedTables/JobSkillsTable";
import { useAppContext } from "../../Context/ContextProvider";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    backgroundColor: "#EDEDED",
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

export default function CompanyJobsTable() {
  const { data, loading } = useQuery(Jobs);
  const { user } = useAppContext();
  const classes = useStyles();

  if (loading) return <CircularProgress />;

  return data && data.jobs ? (
    <>
      <AddJobModal />
      {data.jobs.map((job, key) => (
        <>
          {job.company && job.company.user && job.company.user.id === user.id && (
            <Card className={classes.root} variant="outlined">
              <CardContent>
                <Typography variant="h5" component="h2">
                  Job No. {key}
                </Typography>
                {job && <JobGeneralInfoTable jobGeneralInfo={job} />}
                {job.jobRequirements && (
                  <JobRequirementsTable
                    jobId={job.id}
                    jobRequirements={job.jobRequirements}
                  />
                )}
                {job.jobBenefits && (
                  <JobBenefitsTable
                    jobId={job.id}
                    jobBenefits={job.jobBenefits}
                  />
                )}
                {job.jobSkills && (
                  <JobSkillsTable jobId={job.id} jobSkills={job.jobSkills} />
                )}
              </CardContent>
            </Card>
          )}
          <br />
          <br />
          <br />
        </>
      ))}
    </>
  ) : (
    <CircularProgress />
  );
}
