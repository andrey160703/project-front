import Login from "../../pages/Login";
import React from "react";
import Tasks from "../../pages/Tasks";
import Projects from "../../pages/Projects";
import Users from "../../pages/Users";
import Report from "../../pages/Report";

export const administratorPrivateRoutes = [
    {path: '/tasksmanager/:projectId/:workerId', element: <Tasks/>},
    {path: '/projects/:id', element: <Projects/>, exact: true},
    {path: '/users', element: <Users/>, exact: true},
    {path: '/workers', element: <Users/>, exact: true},
    {path: '/report/:reportId', element: <Report/>},
    {path: '*', element: <Projects/>},
]

export const managerPrivateRoutes = [
    {path: '/tasksmanager/:projectId/:workerId', element: <Tasks/>},
    {path: '/report/:reportId', element: <Report/>},
    {path: '/projects', element: <Projects/>, exact: true},
    {path: '*', element: <Projects/>},
]

export const publicRoutes = [
    {path: '/login', element: <Login/>, exact: true},
    {path: '*', element: <Login/>}
]
