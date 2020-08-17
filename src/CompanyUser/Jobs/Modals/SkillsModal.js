import React from "react";
import SkillsForm from "../Forms/SkillsForm";
import AddDataModal from "../../../Commons/AddDataModal";

export default function SkillsModal(props) {
    return (
        <div>
            <AddDataModal buttonText="Add Job Skill">
                <SkillsForm jobId={props.jobId}/>
            </AddDataModal>
        </div>
    );
}
