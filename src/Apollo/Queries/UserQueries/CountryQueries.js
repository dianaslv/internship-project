import { gql } from "@apollo/client";

export const Countries = gql`
  query countries {
    counties {
      id
      name
    }
  }
`;
