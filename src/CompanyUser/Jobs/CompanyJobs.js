import React from 'react';
import PageLayout from '../../PageLayout/PageLayout';
import {useAppContext} from "../../Context/ContextProvider";
import CompanyJobsTable from "./CompanyJobsTable";

export default function CompanyJobs() {
    const {user} = useAppContext();

    return (
        <PageLayout title="Company jobs table" userType={user.userRole}>
            <CompanyJobsTable user={user}/>
        </PageLayout>
    );
}
