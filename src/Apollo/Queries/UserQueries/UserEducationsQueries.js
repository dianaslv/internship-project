import { gql } from "@apollo/client";

export const UserEducations = gql`
  query UserEducations {
    userEducations {
      id
      institution
      description
      user {
        id
        username
        userRole {
          id
          name
        }
      }
      startDate
      endDate
    }
  }
`;

export const UpdateUserEducation = gql`
  mutation UpdateUserEducation(
    $id: Int!
    $institution: String!
    $description: String!
    $userId: Int!
    $startDate: String!
    $endDate: String!
  ) {
    updateUserEducation(
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

export const DeleteUserEducation = gql`
  mutation DeleteUserEducation($id: [Int!]!) {
    deleteUserEducation(id: $id)
  }
`;

export const AddUserEducation = gql`
  mutation AddUserEducation(
    $institution: String!
    $description: String!
    $userId: Int!
    $startDate: String!
    $endDate: String!
  ) {
    createUserEducation(
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
