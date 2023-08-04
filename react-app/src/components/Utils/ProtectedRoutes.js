import React from "react";
import { useSelector } from 'react-redux';
import { Redirect } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const user = useSelector((state) => state?.session?.user);

    if (!user) {
        return <Redirect to='/login'/>
    };

    return children;
}

export default ProtectedRoute;
