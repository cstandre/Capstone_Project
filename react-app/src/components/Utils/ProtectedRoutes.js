import React from "react";
import { useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const sessionUser = useSelector(state=>state?.session?.user)

    if (!sessionUser) {
        return <Redirect to='/login'/>
    };

    return children;
}

export default ProtectedRoute;
