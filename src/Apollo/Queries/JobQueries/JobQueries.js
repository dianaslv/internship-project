import { gql } from "@apollo/client";

export const Jobs = gql`
  query jobs {
    jobs {
      id
      name
      description
      createdAt
      updatedAt
      isAvailable
      company {
        id
        name
        contactInfo {
          id
          avatarUrl
        }
      }
      jobSkills {
        id
        rating
        skill {
          id
          name
        }
        job {
          id
        }
      }
      jobBenefits {
        id
        name
        job {
          id
        }
      }
      jobRequirements {
        id
        name
        job {
          id
        }
      }
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
      isAvailable
      company {
        id
        name
        contactInfo {
          id
          avatarUrl
        }
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
