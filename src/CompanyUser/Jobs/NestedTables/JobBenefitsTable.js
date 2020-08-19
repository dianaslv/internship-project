import React, {useState} from 'react';
import SimpleTable from "../../../Commons/SimpleTable";
import {useMutation} from "@apollo/client";
import {DeleteJobBenefit, UpdateJobBenefit} from "../../../Apollo/Queries/JobQueries/JobBenefitsQueries";
import {DeleteJobRequirement} from "../../../Apollo/Queries/JobQueries/JobRequirementsQueries";
import BenefitsModal from "../Modals/BenefitsModal";


export default function JobBenefitsTable(props) {
    const [index, setIndex] = useState(-1);
    const [getUpdatedJobBenefits, {data: updatedJobBenefits}] = useMutation(UpdateJobBenefit);
    const [deleteJobBenefits, {data: deletedJobBenefits}] = useMutation(DeleteJobBenefit);

    const {benefits} = props;

    console.log("Benefit in table", benefits)
    const startEditing = i => {
        setIndex(i);
        console.log("start editing", index);
    };

    const stopEditing = (i) => {
        let updatedBenefit = benefits[i];
        console.log("submit", updatedBenefit.id, updatedBenefit.name, props.jobId);
        getUpdatedJobBenefits({
            variables: {
                id: updatedBenefit.id,
                name: updatedBenefit.name,
                jobId: props.jobId
            }
        }).then(r => {
            console.log(r);
            console.log(updatedJobBenefits, updatedBenefit)
            setIndex(-1);
        });
    };

    const handleChange = (e, name, i) => {
        const {value} = e.target;
        console.log(value, name, i);
        props.handleUpdateJobBenefit(e.target.value, e.target.name, props.positionInJobBenefitsTable, i);
    };

    const handleRemove = (i) => {
        deleteJobBenefits({
            variables: {id: benefits[i].id}
        }).then(r => console.log(r));
    };


    return benefits ?
        <>
            <SimpleTable
                startEditing={startEditing}
                editIdx={index}
                stopEditing={stopEditing}
                handleChange={handleChange}
                handleRemove={handleRemove}
                data={benefits}
                header={[
                    {
                        name: "Id",
                        prop: "id"
                    },
                    {
                        name: "Name",
                        prop: "name"
                    }
                ]}
                title="Benefits table"/>
            <BenefitsModal jobId={props.jobId}/>

        </>
        :
        null;
}


