import {gql} from '@apollo/client';


export const Users = gql`
query users {
   users{
    id,
    username,
    password,
    firstName,
    lastName,
    userRole{
      id,
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
    { id,
    username,
    password,
    firstName,
    lastName,
    userRole{
      id,
      name
    }}
    }
`;


export const UpdateUser = gql`
mutation UpdateUser(
    $id: Int!,
    $username: String!,
    $firstName: String!,
    $lastName: String!,
    $password: String!) {
    updateUser(
        id: $id,
        username: $username,
        firstName: $firstName,
        lastName: $lastName,
        password: $password
    )
    { id,username,password,firstName,lastName,userRole{id,name}}
    }
`;

export const DeleteUser = gql`
mutation DeleteUser($id: [Int!]!) {
    deleteUser(
        id: $id
    )
    }
`;
