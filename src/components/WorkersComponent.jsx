import React, {useMemo, useState} from 'react';
import {Col, Container, Nav, Row} from "react-bootstrap";
import MyInput from "./UI/MyInput";
import Tab from "react-bootstrap/Tab";
import Project from "./Project";
import Button from "react-bootstrap/Button";
import {useNavigate} from "react-router-dom";
import NewProjectForm from "./NewProjectForm";
import NewUserForm from "./NewUserForm";

const WorkersComponent = () => {

    const navigate = useNavigate(); // инициализируем хук useNavigate

    const [usersList, setUsersList] = useState([  /// todo Get request by all users
        {id: 1, name: "Andrey"},
        {id: 2, name: "Semen"},
        {id: 3, name: "Ilya"}
    ])

    const [projectList, setProjectList] = useState([  /// todo Get request by user id to get his projects
        {
            id: 1, name: "Andrey", login: "andrey101010", email: "avgusev_6@edu.hse.ru", projects: [
                {id: 1, title: "Project 1", description: "None"},
                {id: 2, title: "Project 2", description: "None"},
                {id: 3, title: "Hello world project!", description: "None"}
            ],
        },
        {
            id: 2, name: "Semen", login: "Semen12312", email: "prosemen@mail.ru", projects: [
                {id: 2, title: "Project 2", description: "None"}
            ]
        },
        {
            id: 3, name: "Ilya", login: "Ilyyyya", email: "superIlyaKU2222@mail.ru", projects:[]
        }
    ])

    const [searchQuery, setSearchQuery] = useState('')

    const selectedList = useMemo(() => {
        if (searchQuery) {
            return usersList.filter(user => user.name.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        return usersList
    }, [searchQuery, projectList])

    const goToProjectsPage = (id) => {
        navigate('/projects/' + id);
    };

    const handleCreateUser = (userData) => {
        console.log(userData)
        const newUser = {
            id: userData.user_id,
            name: userData.fullName,
        };
        const newProj = {
            id: userData.user_id,
            name: userData.fullName,
            login: userData.login,
            mail: userData.email,
            projects: []
        }
        setUsersList([...usersList, newUser]);
        setProjectList([...projectList, newProj]);
    };

    return (
        <Container>
            <MyInput
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search user"
            />
            <Tab.Container id="left-tabs-example" defaultActiveKey="1">
                <Row>
                    <Col sm={3}>
                        <Nav variant="pills" className="flex-column mt-2">
                            {selectedList.map(user =>
                                <Nav.Item>
                                    <Nav.Link eventKey={user.id}>{user.name}</Nav.Link>
                                </Nav.Item>
                            )}
                            <Nav.Item>
                                <Nav.Link className="btn btn-outline-success"
                                          eventKey={"NewUser"}>{"Create new user"}</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content className="mt-3">
                            {projectList.map(user => ( /// todo Get request by user id to get his projects
                                <Tab.Pane eventKey={user.id}>
                                    <h4 className="mt-1 ms-2">
                                        {user.name}
                                    </h4>
                                    <p className="ms-2">
                                        Login: {user.login}
                                    </p>
                                    <p className="ms-2">
                                        Email: {user.email}
                                    </p>
                                    <h4 className="mt-1 ms-2">
                                        Projects:
                                    </h4>
                                    {user.projects.map(proj =>
                                        <Project
                                            callBackFunction={goToProjectsPage}
                                            projectId={proj.id}
                                            linkedId={user.id}
                                            title={proj.title}
                                            description={proj.description}
                                        />
                                    )}
                                    <Button className="mt-3 ms-2">
                                        Save changes
                                    </Button>
                                </Tab.Pane>
                            ))}

                            <Tab.Pane eventKey="NewUser">
                                <NewUserForm handleCreateUser={handleCreateUser} />
                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default WorkersComponent;