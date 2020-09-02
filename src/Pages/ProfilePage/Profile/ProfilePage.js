import React from "react";
import PageLayout from "../../../Commons/PageLayout/PageLayout";
import UserDataTable from "./UserDataTable";
import UserContactInfo from "./UserContactInfo";
import { useQuery } from "@apollo/client";
import { Users } from "../../../Apollo/Queries/UserQueries/UserQueries";
import { useAppContext } from "../../../Context/ContextProvider";

export default function ProfilePage() {
  const { user } = useAppContext();
  const { data, loading } = useQuery(Users, {
    variables: {
      id: user.id,
    },
  });
  if (loading) return null;

  return (
    <PageLayout title="My profile page" userType={"user"}>
      {data &&
        data.users &&
        data.users.map((currentUser) => {
          return (
            currentUser.id === user.id && (
              <>
                <UserDataTable data={currentUser} />
                <UserContactInfo
                  userId={currentUser.id}
                  contactInfo={currentUser.contactInfo}
                />
              </>
            )
          );
        })}
    </PageLayout>
  );
}
