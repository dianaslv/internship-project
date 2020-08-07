import React from 'react';
import {Jobs} from '../Utils/Queries';
import {useQuery} from '@apollo/client';
import PageLayout from '../PageLayout/PageLayout';
import {useAppContext} from "../Context/ContextProvider";

export default function LandingPage() {
    const {user} = useAppContext();


    return (
        <PageLayout title="Landing page" userType={user.userRole}>
        </PageLayout>
    );
}