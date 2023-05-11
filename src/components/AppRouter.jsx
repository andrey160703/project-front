import React, {useContext, useEffect, useMemo, useState} from 'react';
import {administratorPrivateRoutes, managerPrivateRoutes, publicRoutes} from "./router";

import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import {AuthContext, AdministratorContext} from "../context";


const RouterWrapper = () => {
    const { isAuth } = useContext(AuthContext);
    const { isAdministrator } = useContext(AdministratorContext);

    const router = useMemo(() => {
        if (isAuth) {
            if (isAdministrator) {
                return createBrowserRouter(administratorPrivateRoutes);
            }
            return createBrowserRouter(managerPrivateRoutes);
        }
        return createBrowserRouter(publicRoutes);
    }, [isAuth]);

    if (isAuth === null) {
        return null;
    }

    return (
        <RouterProvider router={router} />
    );
}


const AppRouter = () => {
    return <RouterWrapper />;
};

export default AppRouter;