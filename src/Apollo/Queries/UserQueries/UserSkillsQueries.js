import { gql } from "@apollo/client";

export const UserSkills = gql`
  query UserSkills {
    userSkills {
      id
      rating
    }
  }
`;

export const UpdateUserSkillRating = gql`
  mutation UpdateUserSkillRating($id: Int!, $rating: Int) {
    updateUserSkill(id: $id, rating: $rating) {
      id
      rating
    }
  }
`;
