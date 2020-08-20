import { gql } from "@apollo/client";

export const Skills = gql`
  query Skills {
    skills {
      id
      name
    }
  }
`;

export const AddSkill = gql`
  mutation AddSkill($name: String!) {
    createSkill(name: $name) {
      id
      name
    }
  }
`;
