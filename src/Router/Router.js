import React from "react";
import Login from "../Pages/Login/Login.js";
import NotFound from "../Pages/FourOhFour/NotFound.js";
import Register from "../Pages/Register/Register.js";
import { Switch, Route } from "react-router-dom";
import { useAppContext } from "../Context/ContextProvider";
import { userTypeRoutes } from "./UserTypeRoutes";
import LandingPage from "../Pages/Home/LandingPage";
import CompanyJobs from "../Pages/CompanyUser/CompanyJobs";
import JobsPage from "../Pages/JobsApplications/JobsPage";
import ProfilePage from "../Pages/ProfilePage/Profile/ProfilePage";

function Router() {
  const { user } = useAppContext();
  const customRoutes = [];

  function getRoutesForUserType() {
    if (user.userRole) {
      console.log(user, userTypeRoutes);
      let routes = userTypeRoutes[user.userRole];
      routes.map((route, key) => customRoutes.push(route));
      console.log(customRoutes);
    }
  }
  getRoutesForUserType();

  return (
    <Switch>
      {user &&
        customRoutes.map((route) => (
          <Route path={route["path"]} component={route["component"]} />
        ))}
      <Route path="/home" component={JobsPage} />
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/" component={NotFound} />
    </Switch>
  );
}

export default Router;
