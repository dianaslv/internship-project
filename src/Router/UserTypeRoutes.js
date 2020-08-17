import JobsPage from "../JobsPage/JobsPage";
import LandingPage from "../Home/LandingPage";

export const userTypeRoutes =
    {
        "sys_admin":[
                {
                        component: JobsPage,
                        path: '/jobs'
                },
                {
                        component: LandingPage,
                        path: '/home'
                }
        ],

        "company_user": [
            {
                component: JobsPage,
                path: '/jobs'
        }
        ],
        "user": [
            {
                component: JobsPage,
                path: '/jobs'
        }]
    }
