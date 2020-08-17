import React from 'react';
import Login from '../Login/Login.js';
import NotFound from '../FourOhFour/NotFound.js';
import Register from '../Register/Register.js';
import {Switch, Route} from 'react-router-dom';
import {useAppContext} from "../Context/ContextProvider";
import {userTypeRoutes} from "./UserTypeRoutes";
import LandingPage from "../Home/LandingPage";
import CompanyJobs from "../CompanyUser/Jobs/CompanyJobs";
import JobsPage from "../JobsPage/JobsPage";

function Router() {
    const {user} = useAppContext();
    const customRoutes = [];

    function getRoutesForUserType(){
        if(user.userRole){
            let routes = userTypeRoutes[user.userRole.name];
            routes.map((route,key)=>customRoutes.push(route))
            //customRoutes.push(userTypeRoutes[user.userRole.name]);
            console.log(customRoutes)
        }
    }
    getRoutesForUserType();

    return (
        <Switch>
            {user&&customRoutes.map((route)=>(<Route path={route["path"]} component={route["component"]}/>))}
            <Route path='/home' component={LandingPage}/>
            <Route path='/companyjobs' component={CompanyJobs}/>
            <Route path='/jobs' component={JobsPage}/>
            <Route path='/register' component={Register}/>
            <Route path='/login' component={Login}/>
            <Route path='/' component={NotFound}/>
        </Switch>
    );
}

export default Router;
