import React from 'react';
import {Jobs} from '../Utils/Queries';
import JobCard from "./JobCard";
import {useQuery} from '@apollo/client';
import PageLayout from '../PageLayout/PageLayout';

export default function JobsPage() {
    const {data} = useQuery(Jobs);

    return (
        <PageLayout title="Jobs  page" userType={"user"}>
            {data &&
                data.jobs.map((job,key)=><JobCard job={job}/>)
            }
        </PageLayout>
    );
}