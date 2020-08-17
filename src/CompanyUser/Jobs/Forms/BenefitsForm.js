import React from "react";
import {useMutation, useQuery} from "@apollo/client";
import {AddJobBenefit} from "../../../Apollo/Queries/JobQueries/JobBenefitsQueries";
import MultipleInputs from "./MultipleInputs";


export default function BenefitForm(props) {

    const [addJobBenefit, {data: addedJobBenefit}] = useMutation(AddJobBenefit);

    const handleSubmit = (listOfBenefits) => {
        listOfBenefits.map((benefit,key)=>{
            if(benefit.name!=="")
            addJobBenefit({
                variables: {
                    name:benefit.name,
                    jobId: parseInt(props.jobId)
                }
            }).then(r => console.log(r))
        })
    };


    return (
        <MultipleInputs handleSubmit={handleSubmit}/>
    );
}
