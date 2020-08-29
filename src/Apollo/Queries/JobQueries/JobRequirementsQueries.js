import { gql } from "@apollo/client";

export const UpdateJobRequirement = gql`
  mutation UpdateJobRequirement($id: Int!, $name: String!, $jobId: Int!) {
    updateJobRequirement(id: $id, name: $name, jobId: $jobId) {
      id
      name
      job {
        id
      }
    }
  }
`;

export const AddJobRequirement = gql`
  mutation AddJobRequirement($jobId: Int!, $name: String!) {
    createJobRequirement(jobId: $jobId, name: $name) {
      id
      name
    }
  }
`;

export const DeleteJobRequirement = gql`
  mutation DeleteJobRequirement($id: Int!) {
    deleteJobRequirement(id: $id)
  }
`;
