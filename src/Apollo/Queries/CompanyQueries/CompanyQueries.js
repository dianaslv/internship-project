import { gql } from "@apollo/client";

export const AddCompany = gql`
  mutation AddCompany($name: String!, $userId: Int!, $contactInfoId: Int!) {
    createCompany(name: $name, userId: $userId, contactInfoId: $contactInfoId) {
      id
    }
  }
`;

export const UpdateCompany = gql`
  mutation UpdateCompany($id: Int!, $name: String!, $userId: Int!) {
    updateCompany(id: $id, name: $name, userId: $userId) {
      id
    }
  }
`;

export const Companies = gql`
  query Companies {
    companies {
      id
      name
      user {
        id
        username
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
    }
  }
`;

export const CompanyGeneralInfo = gql`
  query CompanyGeneralInfo($id: Int!) {
    company(id: $id) {
      id
      name
      user {
        id
        username
      }
    }
  }
`;

export const ContactInfoById = gql`
  query ContactInfoById($id: Int!) {
    contactInfo(id: $id) {
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
`;

export const DeleteCompany = gql`
  mutation DeleteCompany($id: Int!) {
    deleteCompany(id: $id)
  }
`;
