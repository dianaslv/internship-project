import { gql } from "@apollo/client";

export const UpdateUserSkillRating = gql`
  mutation UpdateUserSkillRating($id: Int!, $rating: Int) {
    updateUserSkill(id: $id, rating: $rating) {
      id
      rating
    }
  }
`;

export const DeleteUserSkill = gql`
  mutation DeleteUserSkill($id: [Int!]!) {
    deleteUserSkill(id: $id)
  }
`;

export const AddUserSkill = gql`
  mutation AddUserSkill($skillId: Int!, $userId: Int!, $rating: Int!) {
    createUserSkill(skillId: $skillId, userId: $userId, rating: $rating) {
      id
      skill {
        id
        name
      }
      user {
        id
      }
      rating
    }
  }
`;
