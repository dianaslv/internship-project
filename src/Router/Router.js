import React from 'react';
import Login from '../Login/Login.js';
import NotFound from '../FourOhFour/NotFound.js';
import Register from '../Register/Register.js';
import {Switch, Route} from 'react-router-dom';
import {AppContext} from "../Context/AppContext";
import {useAppContext} from "../Context/ContextProvider";
import {userTypeRoutes} from "./UserTypeRoutes";


function Router() {
    const {user} = useAppContext();
    const customRoutes = [];

    function getRoutesForUserType(){
        if(user.userRole){
            customRoutes.push(userTypeRoutes[user.userRole]);
            //console.log(customRoutes[0]["path"])
        }
    }
    getRoutesForUserType();

    return (
        <Switch>
            {user.userRole&&customRoutes.map((route)=>(<Route path={route["path"]} component={route["component"]}/>))}
            <Route path='/register' component={Register}/>
            <Route path='/login' component={Login}/>
            <Route path='/' component={NotFound}/>
        </Switch>
    );
}

export default Router;
