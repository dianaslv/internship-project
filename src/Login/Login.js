import React from 'react';
import UserLoginForm from './UserLoginForm.js';
import {Link} from "react-router-dom";


export default class Login extends React.Component {

    handleRouteChange(event) {
        event.preventDefault();
        const {history} = this.props;
        history.push('/register');
    }

    render() {
        return (
            <>
                <UserLoginForm/>
                <Link to="/register">
                    <button onClick={(e) => this.handleRouteChange(e)}>Don't have an account? Register now</button>
                </Link>
            </>
        );
    }
}
