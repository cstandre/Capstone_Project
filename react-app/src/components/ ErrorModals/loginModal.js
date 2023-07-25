import React from "react";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal";

import './loginModal.css'

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
        <div className="error-modal">
            <div className="error-msg-header">You must be logged in to continue</div>
            <div className="modal-btns">
                <button className="modal-login-btn" onClick={loginForm}>Sign In</button>
                <button className="modal-signup-btn" onClick={signupForm}>Sign Up</button>
            </div>
        </div>
    )
};

export default LoginMessage;
