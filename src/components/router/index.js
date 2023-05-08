import Login from "../../pages/Login";
import React from "react";
import Notes from "../../pages/Notes";
import Index from "../../pages/Index";
import Projects from "../../pages/Projects";
import Workers from "../../pages/Workers";
import Managers from "../../pages/Managers";
import Users from "../../pages/Users";

export const administratorPrivateRoutes = [
    {path: '/tasksmanager/:projectId/:workerId', element: <Notes/>},
    {path: '/index', element: <Index/>, exact: true},
    {path: '/projects/:id', element: <Projects/>, exact: true},
    {path: '/users', element: <Users/>, exact: true},
    {path: '/workers', element: <Workers/>, exact: true},
    {path: '*', element: <Projects/>},
]

export const managerPrivateRoutes = [
    {path: '/tasksmanager/:projectId/:workerId', element: <Notes/>},
    {path: '/index', element: <Index/>, exact: true},
    {path: '/projects', element: <Projects/>, exact: true},
    {path: '*', element: <Projects/>},
]

export const publicRoutes = [
    {path: '/login', element: <Login/>, exact: true},
    {path: '*', element: <Login/>}
]
