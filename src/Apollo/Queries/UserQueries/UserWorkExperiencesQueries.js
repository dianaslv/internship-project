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
