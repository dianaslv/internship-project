import React from "react";
import { useQuery } from "@apollo/client";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import JobGeneralInfoTable from "./NestedTables/JobGeneralInfoTable";
import JobRequirementsTable from "./NestedTables/JobRequirementsTable";
import JobBenefitsTable from "./NestedTables/JobBenefitsTable";
import JobSkillsTable from "./NestedTables/JobSkillsTable";
import { Jobs } from "../../Apollo/Queries/JobQueries/JobQueries";
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

export default function CompanyJobsTable() {
  const { data, loading } = useQuery(Jobs);
  const classes = useStyles();

  if (loading) return null;

  return data && data.jobs ? (
    <>
      <AddJobModal companyId={1} />
      {data.jobs.map((job, key) => (
        <>
          <Card className={classes.root} variant="outlined">
            <CardContent>
              <Typography variant="h5" component="h2">
                Job No. {key}
              </Typography>
              <JobGeneralInfoTable jobId={job.id} />
              <JobRequirementsTable jobId={job.id} />
              <JobBenefitsTable jobId={job.id} />
              <JobSkillsTable jobId={job.id} />
            </CardContent>
          </Card>

          <br />
          <br />
          <br />
        </>
      ))}
    </>
  ) : null;
}
