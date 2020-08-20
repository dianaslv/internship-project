import JobsPage from "../JobsPage/JobsPage";
import LandingPage from "../Home/LandingPage";
import ProfilePage from "../ProfilePage/Profile/ProfilePage";
import { Route } from "react-router-dom";
import React from "react";
import UsersPage from "../Administrator/UsersPage";
import CompanyJobs from "../CompanyUser/Jobs/CompanyJobs";
import CVPage from "../ProfilePage/CV/CVPage";

export const userTypeRoutes = {
  sys_admin: [
    {
      component: UsersPage,
      path: "/users",
      name: "Users Page",
    },
    {
      component: LandingPage,
      path: "/home",
      name: "Home Page",
    },
    {
      component: ProfilePage,
      path: "/myprofile",
      name: "My Profile Page",
    },
  ],

  company_user: [
    {
      component: LandingPage,
      path: "/home",
      name: "Home Page",
    },
    {
      component: ProfilePage,
      path: "/myprofile",
      name: "My Profile Page",
    },
    {
      component: CompanyJobs,
      path: "/companyjobs",
      name: "Posted Jobs Page",
    },
  ],
  user: [
    {
      component: LandingPage,
      path: "/home",
      name: "Home Page",
    },
    {
      component: ProfilePage,
      path: "/myprofile",
      name: "My Profile Page",
    },
    {
      component: CVPage,
      path: "/mycv",
      name: "My CV Page",
    },
  ],
};
