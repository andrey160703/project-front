import React, {useContext, useMemo, useState} from 'react';
import Tab from "react-bootstrap/Tab";
import {Col, Container, Nav, Row} from "react-bootstrap";
import Worker from "./Worker";
import Manager from "./Manager";
import Button from "react-bootstrap/Button";
import MyInput from "./UI/MyInput";
import {AdministratorContext} from "../context";
import {useNavigate, useParams} from "react-router-dom";
import NewProjectForm from "./NewProjectForm";
import GraphicComponent from "./GraphicComponent";
import NewMemberForm from "./NewMemberForm";

const ProjectsComponent = () => {
    const {isAdministrator} = useContext(AdministratorContext)
    const params = useParams()
    const navigate = useNavigate(); // инициализируем хук useNavigate
    const [editableProject, setEditableProject] = useState(null);
    const [projectNames, setProjectNames] = useState([  /// todo Get request by all projects(for administrator)/only current manager's projects
        {id: 1, title: "Project 1"},
        {id: 2, title: "Project 2"},
        {id: 3, title: "Hello world project!"}
    ])
    const [projects, setProjects] = useState([  /// todo Get request by project id to get project's information
        {
            id: 1, title: "Project 1", description: "None", managers: [
                {id: 1, role: "manager", name: "Andrey"}
            ],
            workers: [
                {id: 1, role: "worker", name: "Ivan", total: "10", completed: "5"},
                {id: 2, role: "worker", name: "Artur", total: "10", completed: "5"},
                {id: 5, role: "worker", name: "Semen", total: "10", completed: "3"},
                {id: 6, role: "worker", name: "Grisha", total: "10", completed: "8"}
            ],
            graphicData: [
                { name: 'Ivan', tasks: 5, hours: 80 },
                { name: 'Artur', tasks: 5, hours: 140 },
                { name: 'Semen', tasks: 3, hours: 30 },
                { name: 'Grisha', tasks: 8, hours: 100 },
            ]
        },
        {
            id: 2, title: "Project 2", description: "None", managers: [
                {id: 1, role: "manager", name: "Andrey"},
                {id: 2, role: "manager", name: "Semen"}
            ],
            workers: [
                {id: 1, role: "worker", name: "Ivan", total: "10", completed: "5"},
            ],
            graphicData: [
                { name: 'Ivan', tasks: 5, hours: 80 },
            ]
        },
        {
            id: 3, title: "Hello world project!", description: "None", managers: [
                {id: 1, role: "manager", name: "Andrey"}
            ],
            workers: [
                {id: 3, role: "worker", name: "Hello world worker", total: "10", completed: "5"}
            ],
            graphicData: [
                { name: 'Hello world worker', tasks: 5, hours: 300 },
            ]
        }
    ])

    const updateProject = (projectId, updatedData) => {
        const updatedProjects = projects.map((project) => {
            if (project.id === projectId) {
                return {...project, ...updatedData};
            }
            return project;
        });
        setProjects(updatedProjects);
        const updatedProjectsName = projectNames.map((project) => {
            if (project.id === projectId) {
                project.title = updatedData.title
            }
            return project;
        });
        setEditableProject(null);
    };

    const deleteWorker = (projectId, workerId) => {
        const updatedProjects = projects.map((project) => {
            if (project.id !== projectId) {
                return project;
            }
            const updatedWorkers = project.workers.filter(
                (worker) => worker.id !== workerId
            );
            const updatedProject = { ...project, workers: updatedWorkers };
            if (editableProject && editableProject.id === projectId) {
                setEditableProject(updatedProject);
            }
            return updatedProject;
        });
        setProjects(updatedProjects);
    };

    const deleteManager = (projectId, managerId) => {
        const updatedProjects = projects.map((project) => {
            if (project.id !== projectId) {
                return project;
            }
            const updatedManagers = project.managers.filter(
                (manager) => manager.id !== managerId
            );
            const updatedProject = { ...project, managers: updatedManagers };
            if (editableProject && editableProject.id === projectId) {
                setEditableProject(updatedProject);
            }
            return updatedProject;
        });
        setProjects(updatedProjects);
    };

    const goToTaskManagement = (projectId, workerId) => {
        navigate('/tasksmanager/' + projectId + '/' + workerId);
    }

    const [searchQuery, setSearchQuery] = useState('')

    const selectedProjects = useMemo(() => {
        if (searchQuery) {
            return projectNames.filter(proj => proj.title.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        return projectNames
    }, [searchQuery, projects])

    const [newProjectTitle, setNewProjectTitle] = useState('');
    const [newProjectDescription, setNewProjectDescription] = useState('');

    const handleCreateProject = () => {
        // Check if the title field is empty
        if (newProjectTitle.trim() === '') {
            alert('Please enter a project title.');
            return;
        }

        // Generate a unique ID for the new project
        const newProjectId = projects.length + 1;

        // Create a new project object
        const newProject = {
            id: newProjectId,
            title: newProjectTitle,
            description: newProjectDescription,
            managers: [],
            workers: [],
            graphicData: []
        };

        // Add the new project to projectNames array
        setProjectNames([...projectNames, { id: newProjectId, title: newProjectTitle }]);

        // Add the new project to projects array
        setProjects([...projects, newProject]);

        setNewProjectTitle('')
        setNewProjectDescription('')

        alert('Project created successfully.');
    };

    const [selectedProjectId, setSelectedProjectId] = useState('');
    const [showNewMemberForm, setShowNewMemberForm] = useState(false);

    const handleMemberAdded = () => {
        setShowNewMemberForm(false);
    };

    const handleAddWorker = () => {
        setSelectedProjectId('');
        setShowNewMemberForm(true);
    };

    const handleAddManager = () => {
        setShowForm(!showForm);
    };

    const addNewManager = (data) => {
        if (!data) {
            setShowForm(!showForm);
        }
    };

    const [showForm, setShowForm] = useState(false);


    const handleProjectSelect = (projectId) => {
        setSelectedProjectId(projectId);
        setShowNewMemberForm(false);
    };

    return (
        <Container>
            <MyInput
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search project"
            />
            <Tab.Container id="left-tabs-example" defaultActiveKey={params.id ? params.id : '1'}>
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
                                    <Nav.Link className="btn btn-outline-success"
                                              eventKey={"NewProj"}>{"Create new project"}</Nav.Link>
                                </Nav.Item>
                            }
                        </Nav>
                    </Col>
                    <Col sm={9}>
                        <Tab.Content className="mt-3">
                            {projects.map(proj =>
                                    <Tab.Pane eventKey={proj.id}>
                                        {editableProject && editableProject.id === proj.id ? (
                                            <>
                                                <h2 className="mt-1 ms-2">
                                                    <input
                                                        type="text"
                                                        value={editableProject.title}
                                                        onChange={(e) =>
                                                            setEditableProject({
                                                                ...editableProject,
                                                                title: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </h2>
                                                <div className="mt-1 ms-2">
                                                    <textarea
                                                        value={editableProject.description}
                                                        onChange={(e) =>
                                                            setEditableProject({
                                                                ...editableProject,
                                                                description: e.target.value,
                                                            })
                                                        }
                                                    />
                                                </div>
                                                <Button
                                                    className="mt-3 ms-2"
                                                    onClick={() =>
                                                        updateProject(editableProject.id, {
                                                            title: editableProject.title,
                                                            description: editableProject.description,
                                                        })
                                                    }
                                                >
                                                    Save changes
                                                </Button>
                                            </>
                                        ) : (
                                            <>
                                                <h2 className="mt-1 ms-2">{proj.title}</h2>
                                                <div className="mt-1 ms-2">{proj.description}</div>
                                                {isAdministrator && (
                                                    <Button
                                                        variant="light"
                                                        className="mt-3 ms-2"
                                                        onClick={() =>
                                                            setEditableProject({
                                                                id: proj.id,
                                                                title: proj.title,
                                                                description: proj.description,
                                                            })
                                                        }
                                                    >
                                                        Edit project
                                                    </Button>
                                                )}
                                                <GraphicComponent data={proj.graphicData}/>
                                                <h4 className="mt-1 ms-2">
                                                    Managers:
                                                </h4>
                                                {proj.managers.map(manager =>
                                                    <Manager callBackDeleteFunction={deleteManager} managerId={manager.id}
                                                             projectId={proj.id} role={manager.role} name={manager.name}/>
                                                )}
                                                {isAdministrator &&
                                                    <>
                                                    <Button
                                                        variant="light"
                                                        className="mt-1 ms-2 w-100"
                                                        style={{
                                                            borderColor: 'hsl(190, 100%, 50%)',
                                                            color: 'hsl(190, 100%, 50%)',
                                                        }}
                                                        onClick={handleAddManager}
                                                    >
                                                        Add new manager
                                                    </Button>
                                                        {showForm && (
                                                            <div className="form-overlay">
                                                                <div className="form-container">
                                                                    <NewMemberForm projectUsers={proj.workers} onMemberAdded={addNewManager} cancelCallBackFunction={addNewManager}/>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                }
                                                <h4 className="mt-1 ms-2">
                                                    Workers:
                                                </h4>
                                                {proj.workers.map(worker =>
                                                    <Worker callBackDeleteFunction={deleteWorker}
                                                            callBackTaskManagementFunction={goToTaskManagement}
                                                            workerId={worker.id} linkedId={proj.id} role={worker.role}
                                                            name={worker.name} total={worker.total}
                                                            completed={worker.completed}/>
                                                )}

                                                {isAdministrator &&
                                                    <Button
                                                        className="mt-1 ms-2 w-100"
                                                        variant="light"
                                                        style={{ borderColor: 'black' }}
                                                        onClick={handleAddWorker}
                                                    >
                                                        Add new worker
                                                    </Button>
                                                }
                                            </>
                                        )}

                                    </Tab.Pane>
                            )}
                            {isAdministrator && (
                                <Tab.Pane eventKey={"NewProj"}>
                                    <NewProjectForm
                                        newProjectTitle={newProjectTitle}
                                        newProjectDescription={newProjectDescription}
                                        setNewProjectTitle={setNewProjectTitle}
                                        setNewProjectDescription={setNewProjectDescription}
                                        handleCreateProject={handleCreateProject}
                                    />
                                </Tab.Pane>
                            )}
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>
        </Container>
    );
};

export default ProjectsComponent;