import React from "react";
import { useStyles } from "./FooterStyles.js";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export default function CompanyFooter() {
  const classes = useStyles();

  return (
    <footer className={classes.footer}>
      <Container maxWidth="sm">
        <Typography variant="body1">Sticky footer for company</Typography>
      </Container>
    </footer>
  );
}
