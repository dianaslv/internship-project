import {gql} from "@apollo/client";

export const JobSkills = gql`
query JobSkills{
    jobSkills{
        id,
            rating,
            skill{id,name},
        job{id,name,description}
    }
}`;



export const AddJobSkill  = gql`
mutation AddJobSkill($skillId: Int!, $jobId: Int!, $rating: Int) {
    createJobSkill(skillId: $skillId, jobId: $jobId, rating: $rating) {
        id
        skill {
            id
            name
        }
        job {
            id
        }
        rating
    }
}`;



export const DeleteJobSkill = gql`
mutation DeleteJobSkill($id:Int!) {
    deleteJobSkill(
        id: $id
    )
    }
`;


export const UpdateJobSkillRating = gql`
mutation UpdateJobSkillRating(
    $id: Int!,
    $rating: Int
) {
    updateJobSkill(
        id: $id,
    rating: $rating
) {
        id,rating
    }
}`;
