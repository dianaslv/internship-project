import React from "react";
import AddDataModal from "../../../Commons/AddDataModal";
import RequirementsForm from "../Forms/RequirementsForm";

export default function RequirementsModal(props) {
    return (
        <div>
            <AddDataModal buttonText="Add Job Requirement">
                <RequirementsForm jobId={props.jobId}/>
            </AddDataModal>
        </div>
    );
}
