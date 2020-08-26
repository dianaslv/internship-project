import JobsPage from "../Jobs/JobsPage";
import LandingPage from "../Home/LandingPage";
import ProfilePage from "../ProfilePage/Profile/ProfilePage";
import { Route } from "react-router-dom";
import React from "react";
import UsersPage from "../Administrator/UsersPage";
import CompanyJobs from "../CompanyUser/Jobs/CompanyJobs";
import CVPage from "../ProfilePage/CV/CVPage";
import JobsDetailsPage from "../Jobs/JobsDetailsPage";
import JobsApplicationsPage from "../Jobs/JobsApplicationsPage";

export const userTypeRoutes = {
  sys_admin: [
    {
      component: JobsPage,
      path: "/home",
      name: "Home",
    },
    {
      component: UsersPage,
      path: "/users",
      name: "Users Page",
    },
    {
      component: ProfilePage,
      path: "/myprofile",
      name: "My Profile Page",
    },
    {
      component: JobsDetailsPage,
      path: "/job/:id",
      name: "Job Details Page",
      customRoute: true,
    },
  ],

  company_user: [
    {
      component: JobsApplicationsPage,
      path: "/myapplications",
      name: "My Applications",
    },
    {
      component: JobsPage,
      path: "/home",
      name: "Home",
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
    {
      component: JobsDetailsPage,
      path: "/job/:id",
      name: "Job Details Page",
      customRoute: true,
    },
  ],
  user: [
    {
      component: JobsApplicationsPage,
      path: "/myapplications",
      name: "My Applications",
    },
    {
      component: JobsPage,
      path: "/home",
      name: "Home",
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
    {
      component: JobsDetailsPage,
      path: "/job/:id",
      name: "Job Details Page",
      customRoute: true,
    },
  ],
};
