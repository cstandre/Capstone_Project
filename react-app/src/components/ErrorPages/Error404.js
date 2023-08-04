import React from "react";
import { Link } from "react-router-dom/";

import './Error404.css'

const Error404Page = () => {
    return (
        <div className="error-page-container">
            <img alt="" className="error-img" src="https://caitlyn.s3.us-west-2.amazonaws.com/error-404-pic.png"></img>
            <div className="error-body-msg">
                <p>Try searching for a product or go to</p>
                <Link className='error-link' to='/'>the home page</Link>
            </div>
        </div>
    )
};

export default Error404Page;
