import { gql } from "@apollo/client";

export const UpdateJobBenefit = gql`
  mutation UpdateJobBenefit($id: Int!, $name: String!, $jobId: Int!) {
    updateJobBenefit(id: $id, name: $name, jobId: $jobId) {
      id
      name
      job {
        id
      }
    }
  }
`;

export const AddJobBenefit = gql`
  mutation AddJobBenefit($jobId: Int!, $name: String!) {
    createJobBenefit(jobId: $jobId, name: $name) {
      id
      name
    }
  }
`;

export const DeleteJobBenefit = gql`
  mutation DeleteJobBenefit($id: Int!) {
    deleteJobBenefit(id: $id)
  }
`;
