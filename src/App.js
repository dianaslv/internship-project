import React from 'react';
import Login from './Login/Login.js';
import NotFound from './FourOhFour/NotFound.js';
import Register from './Register/Register.js';
import JobsPage from './JobsPage/JobsPage.js';
import {client} from './Utils/ApolloClient.js';
import PersistentDrawerLeft from './PageLayout/Drawer/Drawer.js';
import {Switch, Route} from 'react-router-dom';
import {ApolloProvider} from '@apollo/client';
import Router from "./Router/Router";
import ContextProvider from "./Context/ContextProvider";

function App() {
    return (
        <ApolloProvider client={client}>
            <ContextProvider>
            <Router/>
            </ContextProvider>
        </ApolloProvider>
    );
}

export default App;
