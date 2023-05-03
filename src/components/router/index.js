import Login from "../pages/Login";
import NoteList from "../components/NoteList";

export const privateRoutes = [
    {path: '/note', component: NoteList, exact: true},
]

export const publicRoutes = [
    {path: '/login', component: Login, exact: true},
]