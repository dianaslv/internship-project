import React, {useState} from 'react';
import SimpleTable from "../../../Commons/SimpleTable";
import { useMutation} from "@apollo/client";
import {UpdateJob} from "../../../Apollo/Queries/JobQueries/JobQueries";


export default function JobGeneralInfoTable(props) {
    const [index, setIndex] = useState(-1);
    const [getUpdatedJobs, {data: updatedJobs}] = useMutation(UpdateJob);
    const {job} = props;

    console.log("job in table", job)
    const startEditing = i => {
        setIndex(i);
        console.log("start editing", index);
    };

    const stopEditing = (i) => {
        console.log("submit",job);
        let updatedJob = job;
        const jobAvailability = updatedJob.isAvailable === "Available";
        getUpdatedJobs({
            variables: {
                id: updatedJob.id,
                name: updatedJob.name,
                description: updatedJob.description,
                isAvailable: jobAvailability
            }
        }).then(r => {
            props.handleSubmitJobGeneralInfo(updatedJob,props.positionInJobsTable);
            setIndex(-1);
        });

    };

    const handleChange = (e, name, i) => {
        const {value} = e.target;
        console.log(value,name,i);
        props.handleUpdateJobGeneralInfo(e.target.value, e.target.name,props.positionInJobsTable);
    };


    return job?<SimpleTable
        startEditing={startEditing}
        editIdx={index}
        stopEditing={stopEditing}
        handleChange={handleChange}
        data={[job]}
        header={[
            {
                name: "Name",
                prop: "name"
            },
            {
                name: "description",
                prop: "description"
            },
            {
                name: "isAvailable",
                prop: "isAvailable"
            }
        ]}
        title="Users table"
        disableDelete={true}/>:null;
}


