import { gql } from "@apollo/client";

export const Users = gql`
  query users {
    users {
      id
      username
      password
      firstName
      lastName
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
    }
  }
`;

export const AddUser = gql`
  mutation AddUser(
    $username: String!
    $firstName: String!
    $lastName: String!
    $password: String!
    $userRoleId: Int!
  ) {
    createUser(
      username: $username
      firstName: $firstName
      lastName: $lastName
      password: $password
      userRoleId: $userRoleId
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
      email
      phone
      city
      website
      avatarUrl
      about
      country {
        id
        name
      }
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
