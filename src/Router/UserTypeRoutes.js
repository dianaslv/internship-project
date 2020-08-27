import JobsPage from "../Pages/JobsApplications/JobsPage";
import LandingPage from "../Pages/Home/LandingPage";
import ProfilePage from "../Pages/ProfilePage/Profile/ProfilePage";
import { Route } from "react-router-dom";
import React from "react";
import UsersPage from "../Pages/Administrator/UsersPage";
import CompanyJobs from "../Pages/CompanyUser/CompanyJobs";
import CVPage from "../Pages/ProfilePage/CV/CVPage";
import JobsDetailsPage from "../Pages/JobsApplications/JobsDetailsPage";
import JobsApplicationsPage from "../Pages/JobsApplications/JobsApplicationsPage";

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
      name: "Posted JobsApplications Page",
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
