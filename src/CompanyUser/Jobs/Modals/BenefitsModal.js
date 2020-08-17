import React from "react";
import AddDataModal from "../../../Commons/AddDataModal";
import BenefitsForm from "../Forms/BenefitsForm";

export default function BenefitsModal(props) {
    return (
        <div>
            <AddDataModal buttonText="Add Job Benefit">
                <BenefitsForm jobId={props.jobId}/>
            </AddDataModal>
        </div>
    );
}
