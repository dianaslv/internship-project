import React from "react";
import PersistentDrawerLeft from "./Header/Header.js";
import { useStyles } from "./Header/HeaderStyles.js";
import UserFooter from "./Footer/UserFooter";

export default function PageLayout({ children, title, userType }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PersistentDrawerLeft title={title} />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {children}
        <br />
        <UserFooter />
      </main>
    </div>
  );
}
