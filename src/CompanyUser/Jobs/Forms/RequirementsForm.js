import React from "react";
import {useMutation} from "@apollo/client";
import {AddJobRequirement} from "../../../Apollo/Queries/JobQueries/JobRequirementsQueries";
import MultipleInputs from "./MultipleInputs";

export default function RequirementForm(props) {
    const [addJobRequirement, {data: addedJobRequirement}] = useMutation(AddJobRequirement);

    const handleSubmit = (listOfRequirements) => {
        props.handleSubmit(listOfRequirements);
       /* listOfRequirements.map((requirement,key)=>{
            if(requirement.name!=="")
            addJobRequirement({
                variables: {
                    name:requirement.name,
                    jobId: parseInt(props.jobId)
                }
            }).then(r => console.log(r))
        })*/
    };


    return (
        <MultipleInputs handleSubmit={handleSubmit}/>
    );
}
