import { gql } from "@apollo/client";

export const UserWorkExperiences = gql`
  query UserWorkExperiences {
    userWorkExperiences {
      id
      institution
      description
      startDate
      endDate
      user {
        id
        username
        userRole {
          id
          name
        }
      }
    }
  }
`;

export const AddUserWorkExperiences = gql`
  mutation AddUserWorkExperience(
    $institution: String!
    $description: String!
    $userId: Int!
    $startDate: String!
    $endDate: String!
  ) {
    createUserWorkExperience(
      institution: $institution
      description: $description
      userId: $userId
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      startDate
      endDate
    }
  }
`;

export const UpdateUserWorkExperiences = gql`
  mutation UpdateUserWorkExperiences(
    $id: Int!
    $institution: String!
    $description: String!
    $userId: Int!
    $startDate: String!
    $endDate: String!
  ) {
    updateUserWorkExperience(
      id: $id
      institution: $institution
      description: $description
      userId: $userId
      startDate: $startDate
      endDate: $endDate
    ) {
      id
      startDate
      endDate
    }
  }
`;

export const DeleteUserWorkExperiences = gql`
  mutation DeleteUserWorkExperience($id: [Int!]!) {
    deleteUserWorkExperience(id: $id)
  }
`;
