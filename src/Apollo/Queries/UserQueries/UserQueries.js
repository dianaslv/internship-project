import { gql } from "@apollo/client";

export const Users = gql`
  query users {
    users {
      id
      username
      password
      firstName
      lastName
      userRole {
        id
        name
      }
    }
  }
`;

export const AddUser = gql`
  mutation AddUser(
    $username: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    createUser(
      username: $username
      firstName: $firstName
      lastName: $lastName
      password: $password
      userRoleId: 3
    ) {
      id
      username
      password
      firstName
      lastName
      userRole {
        id
        name
      }
    }
  }
`;

export const UpdateUser = gql`
  mutation UpdateUser(
    $id: Int!
    $username: String!
    $firstName: String!
    $lastName: String!
    $password: String!
  ) {
    updateUser(
      id: $id
      username: $username
      firstName: $firstName
      lastName: $lastName
      password: $password
    ) {
      id
      username
      password
      firstName
      lastName
      userRole {
        id
        name
      }
    }
  }
`;

export const DeleteUser = gql`
  mutation DeleteUser($id: [Int!]!) {
    deleteUser(id: $id)
  }
`;

export const GetUserEducationsDataForCV = gql`
  query GetUserEducationsDataForCV($id: Int!) {
    user(id: $id) {
      userEducations {
        id
        institution
        description
        startDate
        endDate
        createdAt
        updatedAt
      }
    }
  }
`;

export const GetUserWorkExperiencesDataForCV = gql`
  query GetUserWorkExperiencesDataForCV($id: Int!) {
    user(id: $id) {
      userWorkExperiences {
        id
        institution
        description
        startDate
        endDate
        createdAt
        updatedAt
      }
    }
  }
`;
export const GetUserSkillsDataForCV = gql`
  query GetUserSkillsDataForCV($id: Int!) {
    user(id: $id) {
      userSkills {
        id
        rating
        skill {
          id
          name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  }
`;
export const UpdateContactInfo = gql`
  mutation UpdateContactInfo(
    $id: Int!
    $email: String!
    $phone: String!
    $city: String!
    $website: String!
    $avatarUrl: String!
    $about: String!
    $countryId: Int!
  ) {
    updateContactInfo(
      id: $id
      email: $email
      phone: $phone
      city: $city
      website: $website
      avatarUrl: $avatarUrl
      about: $about
      countryId: $countryId
    ) {
      id
    }
  }
`;

export const GetUsersDataForCV = gql`
  query GetUsersDataForCV($id: Int!) {
    user(id: $id) {
      userEducations {
        id
        institution
        description
        startDate
        endDate
        createdAt
        updatedAt
      }
      userWorkExperiences {
        id
        institution
        description
        startDate
        endDate
        createdAt
        updatedAt
      }
      userSkills {
        id
        rating
        skill {
          id
          name
          createdAt
          updatedAt
        }
        createdAt
        updatedAt
      }
    }
  }
`;

export const UsersContactInfo = gql`
  query GetUsersContactInfo($id: Int!) {
    user(id: $id) {
      id
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
    }
  }
`;

export const GetUserContactInfo = gql`
  query GetUserContactInfo($id: Int!) {
    user(id: $id) {
      contactInfo {
        id
      }
    }
  }
`;

export const GetUsersUsernames = gql`
  query GetUsersUsernames {
    users {
      id
      username
    }
  }
`;

export const AddContactInfo = gql`
  mutation AddContactInfo(
    $email: String!
    $phone: String!
    $city: String!
    $countryId: Int!
    $website: String
    $avatarUrl: String
    $about: String
  ) {
    createContactInfo(
      email: $email
      phone: $phone
      city: $city
      countryId: $countryId
      website: $website
      avatarUrl: $avatarUrl
      about: $about
    ) {
      id
    }
  }
`;

export const UpdateUserContactInfo = gql`
  mutation UpdateUserContactInfo($id: Int!, $contactInfoId: Int!) {
    updateUser(id: $id, contactInfoId: $contactInfoId) {
      id
    }
  }
`;
