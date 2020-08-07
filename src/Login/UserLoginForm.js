import React, {useContext} from 'react';
import {withRouter} from 'react-router-dom';
import {useState} from "react";
import {useHistory} from 'react-router-dom'
import {useLazyQuery} from "@apollo/client";
import {Users} from '../Utils/Queries';
import {AppContext} from "../Context/AppContext";
import {useAppContext} from "../Context/ContextProvider";

function UserLoginForm() {
    const {user, updateUser} = useAppContext();
    const [state, setState] = useState({
        username: '',
        password: ''
    })
    const [getUsers, {data}] = useLazyQuery(Users,
        {
            onCompleted({getUsers}) {
                if (data) {
                    let founded = 0;
                    data.users.find(
                        // eslint-disable-next-line array-callback-return
                        (user) => {
                            if (user.username === state.username && state.password === user.password) {
                                alert('Account exists');
                                founded = 1;
                                let newUser = {
                                    username: user.username,
                                    password: user.password,
                                    firstName: user.firstName,
                                    lastName: user.lastName,
                                    userRole: {
                                        name: user.name
                                    }
                                }
                                updateUser(user.userRole.name);
                                console.log(user.userRole.name);
                                history.push('/jobs');
                            }
                        }
                    );
                    if (!founded) {
                        alert('Account doesn\'t exists');
                        history.push('/register');
                    }
                }
            }
        })
    ;
    const history = useHistory();

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }


    const handleSubmit = (event) => {
        getUsers();
    }


    return (
        <div>
            <form onSubmit={event => {
                event.preventDefault();
                handleSubmit(event);
            }}>
                <label>
                    Email
                    <input
                        name="username"
                        type="text"
                        value={state.username}
                        onChange={event => {
                            event.preventDefault();
                            handleChange(event);
                        }}/>
                </label>
                <br/>
                <label>
                    Password
                    <input
                        name="password"
                        type="text"
                        value={state.password}
                        onChange={event => {
                            event.preventDefault();
                            handleChange(event);
                        }}/>
                </label>
                <br/>
                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default withRouter(UserLoginForm);