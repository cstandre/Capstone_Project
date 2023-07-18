import React from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

const LoginMessage = () => {
    const history = useHistory();
    const { closeModal } = useModal();

    const loginForm = (e) => {
        e.preventDefault();
        history.push('/login');
        closeModal();
    };

    const signupForm = (e) => {
        e.preventDefault();
        history.push('/signup');
        closeModal();
    };

    return (
        <>
            <div>You must be logged in to continue</div>
            <button onClick={loginForm}>Sign In</button>
            <button onClick={signupForm}>Sign Up</button>
        </>
    )
};

export default LoginMessage;
