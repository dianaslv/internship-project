import {gql} from "@apollo/client";

export const UserSkills = gql`
query UserSkills{
  userSkills{
    id,
    rating
  }
}
`;
