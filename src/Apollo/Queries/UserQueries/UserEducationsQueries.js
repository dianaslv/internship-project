import {gql} from '@apollo/client';



export const UserEducations = gql`
query UserEducations{
  userEducations{
    id,
    institution,
    description,
    user{
      id,username,userRole{id,name}
    },
    startDate,
    endDate
  }
}
`;
