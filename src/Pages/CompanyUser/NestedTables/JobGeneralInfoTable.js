import React, { useEffect, useState } from "react";
import CustomTable from "../../../Commons/CommonComponents/CustomTable";
import { useMutation, useQuery } from "@apollo/client";
import {
  GetJobGeneralInfoById,
  UpdateJob,
} from "../../../Apollo/Queries/JobQueries/JobQueries";

export default function JobGeneralInfoTable(props) {
  const [index, setIndex] = useState(-1);
  const [getUpdatedJobs] = useMutation(UpdateJob);
  const [jobGeneralInfo, setJobGeneralInfo] = useState({});
  const { data, loading } = useQuery(GetJobGeneralInfoById, {
    variables: { id: props.jobId },
  });

  useEffect(() => {
    if (data) {
      let updatedJobGeneralInfo = {};
      updatedJobGeneralInfo.id = data.job["id"];
      updatedJobGeneralInfo.name = data.job["name"];
      updatedJobGeneralInfo.description = data.job["description"];
      updatedJobGeneralInfo.isAvailable = data.job["isAvailable"];
      setJobGeneralInfo(updatedJobGeneralInfo);
    }
  }, [data]);

  if (loading) return null;

  const startEditing = (i) => {
    setIndex(i);
  };

  const stopEditing = (i) => {
    const jobAvailability = jobGeneralInfo.isAvailable === "Available";
    getUpdatedJobs({
      variables: {
        id: jobGeneralInfo.id,
        name: jobGeneralInfo.name,
        description: jobGeneralInfo.description,
        isAvailable: jobAvailability,
      },
    }).then((r) => {
      setIndex(-1);
    });
  };

  const handleChange = (options) => {
    const updatedJobs = { ...jobGeneralInfo };
    updatedJobs[options.name] = options.value;
    console.log(updatedJobs);
    setJobGeneralInfo(updatedJobs);
  };

  return jobGeneralInfo ? (
    <CustomTable
      startEditing={startEditing}
      editIdx={index}
      stopEditing={stopEditing}
      handleChange={handleChange}
      data={[jobGeneralInfo]}
      header={[
        {
          name: "Name",
          prop: "name",
        },
        {
          name: "description",
          prop: "description",
        },
        {
          name: "isAvailable",
          prop: "isAvailable",
          specialFormatForDisplaying: "jobAvailability",
        },
      ]}
      title="Users table"
      disableDelete={true}
    />
  ) : null;
}
