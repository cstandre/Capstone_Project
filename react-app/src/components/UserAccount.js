import React from "react";

import './UserAccount.css'

const UserAccountPage = () => {
    return (
        <div>
            <h1>Your Account</h1>
            <div className="box-container">
                <span className="box box-1">Your Store</span>
                <span className="box box-2">Your Reviews</span>
                <span className="box box-2">Your Addresses</span>
            </div>
        </div>
    )
};

export default UserAccountPage;
