import React from "react";
import PageLayout from "../../../Commons/PageLayout/PageLayout";
import UserSkills from "./UserCVInfos/UserSkills";
import UserEducations from "./UserCVInfos/UserEducations";
import UserWorkExperiences from "./UserCVInfos/UserWorkExperiences";
import { useAppContext } from "../../../Context/ContextProvider";
import { useQuery } from "@apollo/client";
import { Users } from "../../../Apollo/Queries/UserQueries/UserQueries";
import CircularProgress from "@material-ui/core/CircularProgress";

export default function CVPage() {
  const { user } = useAppContext();
  const { data, loading } = useQuery(Users, {
    variables: {
      id: user.id,
    },
  });
  if (loading) return <CircularProgress />;

  return (
    <PageLayout title="My CV page" userType={"user"}>
      {data &&
        data.users &&
        data.users.map((currentUser) => {
          return (
            <>
              {currentUser.id === user.id ? (
                <>
                  {currentUser.userEducations && (
                    <UserEducations
                      userEducations={currentUser.userEducations}
                      userId={user.id}
                    />
                  )}
                  {currentUser.userWorkExperiences && (
                    <UserWorkExperiences
                      userWorkExperiences={currentUser.userWorkExperiences}
                      userId={user.id}
                    />
                  )}
                  {currentUser.userSkills && (
                    <UserSkills
                      userSkills={currentUser.userSkills}
                      userId={user.id}
                    />
                  )}
                </>
              ) : null}
            </>
          );
        })}
    </PageLayout>
  );
}
