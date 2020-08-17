import React from 'react';
import {useStyles} from './FooterStyles.js';
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

export default function UserFooter() {
    const classes = useStyles();

    return (
        <footer className={classes.footer}>
            <Container maxWidth="sm">
                <Typography variant="body1">Sticky footer for user.</Typography>
            </Container>
        </footer>
    );
}