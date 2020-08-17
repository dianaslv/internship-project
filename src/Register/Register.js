import React from 'react';
import {useMutation} from "@apollo/client";
import RegisterUserForm from "../Commons/RegisterUserForm";
import {withRouter} from "react-router-dom";
import {AddUser} from "../Apollo/Queries/UserQueries/UserQueries";

function Register() {
    const [addUser, {data}] = useMutation(AddUser);


    const handleSubmit = (user) => {
        addUser({
            variables: {
                username: user.username,
                password: user.password,
                firstName: user.firstName,
                lastName: user.lastName
            }
        }).then(r =>console.log(r));
    }


    return (
        <RegisterUserForm handleSubmitData={handleSubmit}/>
    );
}

export default withRouter(Register);
