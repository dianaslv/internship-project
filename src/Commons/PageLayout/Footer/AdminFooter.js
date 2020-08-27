import React from "react";
import { useStyles } from "./FooterStyles.js";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export default function AdminFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1">Sticky footer for admin</Typography>
      </Container>
    </footer>
  );
}
