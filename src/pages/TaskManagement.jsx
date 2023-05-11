import React from 'react';
import TaskList from "../components/./TaskList";
import Header from "../components/Header";
import {useNavigate} from "react-router-dom";

const TaskManagement = () => {
    return (
        <div>
            <Header/>
            <TaskList/>
        </div>
    );
};

export default TaskManagement;