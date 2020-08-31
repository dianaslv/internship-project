import React, { useEffect, useState } from "react";
import CustomTable from "../../../Commons/CommonComponents/Tables/CustomTable";
import { useMutation, useQuery } from "@apollo/client";
import {
  AddJobBenefit,
  DeleteJobBenefit,
  UpdateJobBenefit,
} from "../../../Apollo/Queries/JobQueries/JobBenefitsQueries";
import BenefitsModal from "../Modals/BenefitsModal";
import { GetJobBenefitsById } from "../../../Apollo/Queries/JobQueries/JobQueries";

export default function JobBenefitsTable(props) {
  const [index, setIndex] = useState(-1);
  const [getUpdatedJobBenefits, { data: updatedJobBenefits }] = useMutation(
    UpdateJobBenefit
  );
  const [deleteJobBenefits] = useMutation(DeleteJobBenefit);
  const { data, loading } = useQuery(GetJobBenefitsById, {
    variables: { id: props.jobId },
  });
  const [jobBenefits, setJobBenefits] = useState([]);
  const [addJobBenefit] = useMutation(AddJobBenefit);

  useEffect(() => {
    if (data) {
      let updatedJobBenefits = [];
      data.job.jobBenefits.map((benefit, key) =>
        updatedJobBenefits.push({ id: benefit.id, name: benefit.name })
      );

      setJobBenefits(updatedJobBenefits);
      console.log(updatedJobBenefits, jobBenefits);
    }
  }, [data]);

  if (loading) return null;

  const startEditing = (i) => {
    setIndex(i);
    console.log("start editing", index);
  };

  const stopEditing = (i) => {
    let updatedBenefit = jobBenefits[i];
    console.log("submit", updatedBenefit.id, updatedBenefit.name, props.jobId);
    getUpdatedJobBenefits({
      variables: {
        id: updatedBenefit.id,
        name: updatedBenefit.name,
        jobId: props.jobId,
      },
    }).then((r) => {
      console.log(r);
      console.log(updatedJobBenefits, updatedBenefit);
      setIndex(-1);
    });
  };

  const handleChange = (options) => {
    console.log(options);
    const updatedJobBenefits = [...jobBenefits];
    console.log(
      updatedJobBenefits,
      updatedJobBenefits[options.index],
      updatedJobBenefits[options.index][options.name]
    );
    updatedJobBenefits[options.index][options.name] = options.value;
    console.log(updatedJobBenefits);
    setJobBenefits(updatedJobBenefits);
  };

  const handleRemove = (i) => {
    deleteJobBenefits({
      variables: { id: jobBenefits[i].id },
      refetchQueries: [
        {
          query: GetJobBenefitsById,
          variables: {
            id: props.jobId,
          },
        },
      ],
    }).then((r) => console.log(r));
  };

  const handleSubmit = (listOfBenefits) => {
    listOfBenefits.map((benefit, key) => {
      if (benefit.name !== "")
        addJobBenefit({
          variables: {
            name: benefit.name,
            jobId: parseInt(props.jobId),
          },
          refetchQueries: [
            {
              query: GetJobBenefitsById,
              variables: {
                id: props.jobId,
              },
            },
          ],
        }).then((r) => console.log(r));
    });
  };

  return (
    jobBenefits && (
      <>
        {jobBenefits.length > 0 && (
          <CustomTable
            startEditing={startEditing}
            editIdx={index}
            stopEditing={stopEditing}
            handleChange={handleChange}
            handleRemove={handleRemove}
            data={jobBenefits}
            header={[
              {
                name: "Name",
                prop: "name",
              },
            ]}
            title="Benefits table"
          />
        )}
        <BenefitsModal jobId={props.jobId} handleSubmit={handleSubmit} />
      </>
    )
  );
}
