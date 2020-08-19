import React from "react";
import SkillsForm from "../Forms/SkillsForm";
import AddDataModal from "../../../Commons/AddDataModal";
import RequirementsForm from "../Forms/RequirementsForm";
import {useMutation} from "@apollo/client";
import {AddJobSkill} from "../../../Apollo/Queries/JobQueries/JobSkillsQueries";
import {AddSkill} from "../../../Apollo/Queries/SkillsQueries";

export default function SkillsModal(props) {
    const [addJobSkill, {data: addedJobSkill}] = useMutation(AddJobSkill);
    const [addSkill, {data: addedSkill}] = useMutation(AddSkill);

    const handleSubmit = (skillName,skillId,rating) => {
        if (skillId === -1) {
            console.log("will add a new skill with value", skillName, "for job with id:", props.jobId)
            addSkill({
                variables: {
                    name: skillName
                }
            })
                .then(r => {
                    console.log(r.data.createSkill.id);
                    addJobSkill({
                        variables: {
                            skillId: r.data.createSkill.id,
                            jobId: parseInt(props.jobId),
                            rating: parseInt(rating)
                        }
                    }).then(r => console.log(r))
                });
        } else {
            console.log("will add an existing skill with id", skillId, " and with value", skillName, "for job with id:", props.jobId)
            addJobSkill({
                variables: {
                    skillId: parseInt(skillId),
                    jobId: parseInt(props.jobId),
                    rating: parseInt(rating)
                }
            }).then(r => {
                console.log(addedJobSkill);
            });

        }
    }
    return (
        <div>
            <AddDataModal buttonText="Add Job Skill">
                <SkillsForm handleSubmit={handleSubmit}  jobId={props.jobId}/>
            </AddDataModal>
        </div>
    );
}
