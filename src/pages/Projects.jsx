import React, {Component} from 'react';
import {Col, Container, Nav, Row} from "react-bootstrap";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import TaskComponent from "../components/TaskComponent";
import Header from "../components/Header";
import TestComponent from "../components/TestComponent";

const Projects = () => {
    return (
        <div>
            <Header/>
            <TaskComponent/>
        </div>
    );
};

export default Projects;