import React from 'react';
import {useState} from "react";
import {useMutation} from "@apollo/client";
import {AddUser} from '../Utils/Queries';
import {withRouter} from 'react-router-dom';


function UserRegisterForm() {
    const [state, setState] = useState({
        username: '',
        password: '',
        firstName: '',
        lastName: ''
    })
    const [addUser, {data}] = useMutation(AddUser);

    const handleChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        addUser({
            variables: {
                username: state.username,
                password: state.password,
                firstName: state.firstName,
                lastName: state.lastName
            }
        }).then(r =>console.log(data));
    }


    return (
        <div>
            <form onSubmit={event => {
                event.preventDefault();
                handleSubmit(event);
            }}>
                <label>
                    First Name
                    <input
                        name="firstName"
                        type="text"
                        value={state.firstName}
                        onChange={event => {
                            event.preventDefault();
                            handleChange(event);
                        }}/>
                </label>
                <br/>
                <label>
                    Last Name
                    <input
                        name="lastName"
                        type="text"
                        value={state.lastName}
                        onChange={event => {
                            event.preventDefault();
                            handleChange(event);
                        }}/>
                </label>
                <br/>
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

export default withRouter(UserRegisterForm);