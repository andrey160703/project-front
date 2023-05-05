import React, {useMemo, useState} from 'react';
import {Col, Container, Nav, Row} from "react-bootstrap";
import MyInput from "./UI/MyInput";
import Tab from "react-bootstrap/Tab";
import Project from "./Project";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";

const WorkersComponent = () => {

    const navigate = useNavigate(); // инициализируем хук useNavigate

    const [workersList, setWorkersList] = useState([  /// todo Get request by all workers
        {id: 1, name: "Andrey"},
        {id: 2, name: "Semen"},
        {id: 3, name: "Ilya"}
    ])

    const [projectList, setProjectList] = useState([  /// todo Get request by worker id to get his projects
        {
            id: 1, projects: [
                {id: 1, title: "Project 1", description: "None"},
                {id: 2, title: "Project 2", description: "None"},
                {id: 3, title: "Hello world project!", description: "None"}
            ],
        },
        {
            id: 2, projects: [
                {id: 2, title: "Project 2", description: "None"}
            ]
        },
        {
            id: 3, projects:[]
        }
    ])

    const [searchQuery, setSearchQuery] = useState('')

    const selectedList = useMemo(() => {
        if (searchQuery) {
            return workersList.filter(manager => manager.name.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        return workersList
    }, [searchQuery])

    const goToProjectsPage = (id) => {
        console.log("123")
        navigate('/projects/' + id);
    };

    return (
        <Container>
            <MyInput
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search manager"
            />
            <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column mt-2">
                            {selectedList.map(worker =>
                                <Nav.Item>
                                    <Nav.Link eventKey={worker.id}>{worker.name}</Nav.Link>
                                </Nav.Item>
                            )}
                            <Nav.Item>
                                <Nav.Link className="btn btn-outline-success"
                                          eventKey={"NewProj"}>{"Create new manager"}</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content className="mt-3">
                            {projectList.map(worker => // todo GET request
                                <Tab.Pane eventKey={worker.id}>
                                    <h4 className="mt-1 ms-2">
                                        Projects:
                                    </h4>
                                    {worker.projects.map(proj =>
                                        <Project
                                            callBackFunction={goToProjectsPage}
                                            projectId={proj.id}
                                            linkedId={worker.id}
                                            title={proj.title}
                                            description={proj.description}
                                        />
                                    )}
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

export default WorkersComponent;