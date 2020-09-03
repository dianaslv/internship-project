import { gql } from "@apollo/client";

export const AddUserJobApplication = gql`
  mutation AddUserApplication($userId: Int!, $jobId: Int!) {
    createUserJobApplication(userId: $userId, jobId: $jobId) {
      id
      user {
        id
      }
      job {
        id
      }
    }
  }
`;

export const UserJobApplication = gql`
  query UserJobApplication {
    userJobApplications {
      id
      job {
        id
        name
        description
        isAvailable
        company {
          id
          name
          user {
            id
          }
          contactInfo {
            id
            avatarUrl
          }
        }
      }
      user {
        id
        firstName
        lastName
        userSkills {
          id
          rating
          skill {
            id
            name
          }
        }
        contactInfo {
          id
          email
          phone
          city
          country {
            id
            name
          }
          website
          avatarUrl
          about
        }
        userRole {
          id
          name
        }
        userEducations {
          id
          institution
          description
          startDate
          endDate
        }
        userWorkExperiences {
          id
          institution
          description
          startDate
          endDate
        }
      }
      isAccepted
    }
  }
`;

export const UpdateUserApplication = gql`
  mutation UpdateUserApplication($id: Int!, $isAccepted: Boolean) {
    updateUserJobApplication(id: $id, isAccepted: $isAccepted) {
      id
    }
  }
`;
