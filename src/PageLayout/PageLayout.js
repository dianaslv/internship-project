import React from 'react';
import PersistentDrawerLeft from './Drawer/Drawer.js';
import {useStyles} from './Drawer/DrawerStyles.js';
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import CompanyFooter from "./Footer/CompanyFooter";
import AdminFooter from "./Footer/AdminFooter";
import UserFooter from "./Footer/UserFooter";

export default function PageLayout({children, title, userType}) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <PersistentDrawerLeft title={title}/>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {children}
              <UserFooter/>
            </main>
        </div>
    );
}