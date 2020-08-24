import React from "react";
import AddDataModal from "../../../Commons/AddDataModal";
import { useMutation } from "@apollo/client";
import UserAdditionalInfosForm from "../Forms/UserAdditionalInfosForm";
import { AddUserWorkExperiences } from "../../../Apollo/Queries/UserQueries/UserWorkExperiencesQueries";

export default function UserWorkExperiencesModal(props) {
  const [
    addUserWorkExperience,
    { data: addedUserWorkExperience },
  ] = useMutation(AddUserWorkExperiences);

  const handleSubmit = (listOfWorkExperiences) => {
    console.log(listOfWorkExperiences, props.userId);
    listOfWorkExperiences.map((work, key) => {
      addUserWorkExperience({
        variables: {
          institution: work.institution,
          description: work.description,
          userId: props.userId,
          startDate: work.startDate,
          endDate: work.endDate,
        },
      }).then((r) => console.log(r));
    });
  };

  return (
    <div>
      <AddDataModal buttonText="Add User Work Experience">
        <UserAdditionalInfosForm handleSubmit={handleSubmit} />
      </AddDataModal>
    </div>
  );
}
