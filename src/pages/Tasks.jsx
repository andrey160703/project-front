import React from 'react';
import TaskList from "../components/./TaskList";
import Header from "../components/Header";
import {useNavigate} from "react-router-dom";
import "./styles/BackButton.css";

const Tasks = () => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };


    return (
        <div>
            <Header/>
            <button className="BackButton" onClick={handleGoBack}>
                Go Back
            </button>
            <TaskList/>
        </div>
    );
};

export default Tasks;