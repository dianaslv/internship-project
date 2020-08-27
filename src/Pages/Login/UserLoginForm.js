import React from "react";
import { withRouter } from "react-router-dom";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { useAppContext } from "../../Context/ContextProvider";
import { Users } from "../../Apollo/Queries/UserQueries/UserQueries";

import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

function UserLoginForm(props) {
  const classes = useStyles();
  const { updateUser } = useAppContext();
  const [state, setState] = useState({
    username: "",
    password: "",
  });
  const [getUsers, { data }] = useLazyQuery(Users, {
    onCompleted({ getUsers }) {
      if (data) {
        let founded = 0;
        data.users.find((user) => {
          if (
            user.username === state.username &&
            state.password === user.password
          ) {
            alert("Account exists");
            founded = 1;
            updateUser(user);
            console.log(user.userRole.name);
            history.push("/home");
          }
        });
        if (!founded) {
          alert("Account doesn't exists");
          history.push("/register");
        }
      }
    },
  });
  const history = useHistory();

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    getUsers();
  };

  const handleRouteChange = (event) => {
    event.preventDefault();
    const { history } = props;
    history.push("/register");
  };

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form
            className={classes.form}
            onSubmit={(event) => {
              event.preventDefault();
              handleSubmit(event);
            }}
            noValidate
          >
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="username"
              type="text"
              value={state.username}
              autoComplete="email"
              autoFocus
              onChange={(event) => {
                event.preventDefault();
                handleChange(event);
              }}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Password"
              id="password"
              autoComplete="current-password"
              name="password"
              type="text"
              value={state.password}
              onChange={(event) => {
                event.preventDefault();
                handleChange(event);
              }}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign In
            </Button>

            <Link to="/register">
              <Button onClick={handleRouteChange}>
                Don't have an account? Register now
              </Button>
            </Link>
          </form>
        </div>
      </Container>
    </div>
  );
}

export default withRouter(UserLoginForm);
