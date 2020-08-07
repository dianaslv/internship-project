import { gql} from '@apollo/client';

export const Jobs = gql`
query jobs {
    jobs {
    name
    description
    isAvailable
    company {
      name
      contactInfo {
        city
        country {
          name
        }
      }
    }
  }
}`;


export const Users = gql`
query users {
   users{
    username,
    password,
    firstName,
    lastName,
    userRole{
      name
    }
  }
}`;


export const AddUser = gql`
mutation AddUser(
    $username: String!
    $firstName: String!
    $lastName: String!
    $password: String!) {
    createUser(
        username: $username,
        firstName: $firstName,
        lastName: $lastName,
        password: $password,
        userRoleId: 3
    )
    { id, username, password}
    }
`;


