import { gql } from "@apollo/client";

export const Jobs = gql`
  query jobs {
    jobs {
      id
      name
      description
      isAvailable
      company {
        id
        name
      }
      jobSkills {
        id
        rating
        skill {
          id
          name
        }
      }
      jobBenefits {
        id
        name
      }
      jobRequirements {
        id
        name
      }
    }
  }
`;

export const UpdateJob = gql`
  mutation UpdateJob(
    $id: Int!
    $name: String!
    $description: String!
    $isAvailable: Boolean!
  ) {
    updateJob(
      id: $id
      name: $name
      description: $description
      isAvailable: $isAvailable
    ) {
      id
      name
      description
      isAvailable
    }
  }
`;

export const DeleteJob = gql`
  mutation DeleteJob($id: Int!) {
    deleteJob(id: $id)
  }
`;

export const AddJob = gql`
  mutation AddJob(
    $name: String!
    $description: String!
    $isAvailable: Boolean!
    $companyId: Int!
  ) {
    createJob(
      name: $name
      description: $description
      isAvailable: $isAvailable
      companyId: $companyId
    ) {
      id
      name
      description
      isAvailable
    }
  }
`;

export const GetJobById = gql`
  query GetJobById($id: Int!) {
    job(id: $id) {
      id
      name
      description
      isAvailable
      company {
        id
        name
      }
      jobSkills {
        id
        rating
        skill {
          id
          name
        }
      }
      jobBenefits {
        id
        name
      }
      jobRequirements {
        id
        name
      }
    }
  }
`;
