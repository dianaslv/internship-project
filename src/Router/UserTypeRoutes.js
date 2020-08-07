import React from 'react';
import {Switch, Route} from 'react-router-dom';
import PersistentDrawerLeft from "../PageLayout/Drawer/Drawer";
import Login from "../Login/Login";
import Register from "../Register/Register";
import JobsPage from "../JobsPage/JobsPage";
import NotFound from "../FourOhFour/NotFound";

export const userTypeRoutes =
    {
        "sys_admin":
            {
                component: JobsPage,
                path: '/jobs'
            },
        "company_user": {
                component: JobsPage,
                path: '/jobs'
        },
        "user": {
                component: JobsPage,
                path: '/jobs'
        }
    }
