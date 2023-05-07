import React from 'react';
import NoteList from "../components/NoteList";
import Header from "../components/Header";
import {useNavigate} from "react-router-dom";

const TaskManagement = () => {
    return (
        <div>
            <Header/>
            <NoteList/>
        </div>
    );
};

export default TaskManagement;