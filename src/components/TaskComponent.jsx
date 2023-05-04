import React, {useContext, useMemo, useState} from 'react';
import Tab from "react-bootstrap/Tab";
import {Col, Container, Nav, Row} from "react-bootstrap";
import Worker from "./Worker";
import Manager from "./Manager";
import Button from "react-bootstrap/Button";
import MyInput from "./UI/MyInput";
import {AdministratorContext} from "../context";

const TaskComponent = () => {
    const {isAdministrator} = useContext(AdministratorContext)
    const [projectNames, setProjectNames] = useState([
        { id: 1, title: "Project 1" },
        { id: 2, title: "Project 2" },
        { id: 3, title: "Hello world project!" }
    ])
    const [projects, setProjects] = useState([
        { id: 1, title: "Project 1", description: "None", managers: [
                {id: 1, role: "manager", name: "Andrey"}
            ],
            workers: [
            {id: 1, role: "worker", name: "Ivan", total: "10", completed: "5"},
            {id: 2, role: "worker", name: "Artur", total: "10", completed: "5"}
            ]
        },
        { id: 2, title: "Project 2", description: "None", managers: [
                {id: 1, role: "manager", name: "Andrey"}
            ],
            workers: [
                {id: 1, role: "worker", name: "Ivan", total: "10", completed: "5"},
            ]
        },
        { id: 3, title: "Hello world project!", description: "None", managers: [
                {id: 1, role: "manager", name: "Andrey"}
            ],
            workers: [
                {id: 3, role: "worker", name: "Hello world worker", total: "10", completed: "5"}
            ]
        }
    ])

    const deleteWorker = (projectId, workerId) => {
        const updatedProjects = projects.map(project => {
            if (project.id !== projectId) {
                return project;
            }
            const updatedWorkers = project.workers.filter(worker => worker.id !== workerId);
            return Object.assign({}, project, {workers: updatedWorkers});
        });
        setProjects(updatedProjects);
    }

    const deleteManager = (projectId, managerId) => {
        const updatedProjects = projects.map(project => {
            if (project.id !== projectId) {
                return project;
            }
            const updatedManagers = project.managers.filter(manager => manager.id !== managerId);
            return Object.assign({}, project, {managers: updatedManagers});
        });
        setProjects(updatedProjects);
    }

    const [searchQuery, setSearchQuery] = useState('')

    const selectedProjects = useMemo(() => {
        if (searchQuery) {
            return projectNames.filter(proj => proj.title.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        return projectNames
    }, [searchQuery])

    return (
        <Container>
            <MyInput
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search project"
            />
            <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column mt-2">
                            {selectedProjects.map(name =>
                                <Nav.Item>
                                    <Nav.Link eventKey={name.id}>{name.title}</Nav.Link>
                                </Nav.Item>
                            )}
                            {isAdministrator &&
                                <Nav.Item>
                                    <Nav.Link className="btn btn-outline-success" eventKey={"NewProj"}>{"Create new project"}</Nav.Link>
                                </Nav.Item>
                            }
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content className="mt-3">
                            {projects.map(proj =>
                                <Tab.Pane eventKey={proj.id}>
                                    <h2 className="mt-1 ms-2">
                                        {proj.title}
                                    </h2>
                                    <div className="mt-1 ms-2">
                                        {proj.description}
                                    </div>
                                    <h4 className="mt-1 ms-2">
                                        Managers:
                                    </h4>
                                    {proj.managers.map(manager =>
                                        <Manager callBackDeleteFunction={deleteManager} managerId={manager.id} projectId={proj.id} role={manager.role} name={manager.name}/>
                                    )}
                                    <Button variant="light" className="mt-1 ms-2 w-100" style={{borderColor: 'hsl(190, 100%, 50%)', color: 'hsl(190, 100%, 50%)'}}>
                                        Add new manager
                                    </Button>
                                    <h4 className="mt-1 ms-2">
                                        Workers:
                                    </h4>
                                    {proj.workers.map(worker =>
                                        <Worker callBackDeleteFunction={deleteWorker} workerId={worker.id} linkedId={proj.id} role={worker.role} name={worker.name} total={worker.total} completed={worker.completed}/>
                                    )}
                                    <Button className="mt-1 ms-2 w-100" variant="light" style={{borderColor: 'black'}}>
                                        Add new worker
                                    </Button>
                                    <Button className="mt-3 ms-2">
                                        Save changes
                                    </Button>
                                </Tab.Pane>
                            )}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default TaskComponent;