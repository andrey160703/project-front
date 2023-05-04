import React, {useMemo, useState} from 'react';
import {Col, Container, Nav, Row} from "react-bootstrap";
import MyInput from "./UI/MyInput";
import Tab from "react-bootstrap/Tab";
import Manager from "./Manager";
import Button from "react-bootstrap/Button";
import Worker from "./Worker";

const ManagersComponent = () => {

    const [managersList, setManagersList] = useState([ /// По имени менеджера мы видим список его воркеров
        {id: 1, name: "Andrey"},
        {id: 2, name: "Semen"},
        {id: 3, name: "Ilya"}
    ])

    const [workersList, setWorkersList] = useState([  /// По список воркеров
        {
            id: 1, workers: [
                {id: 1, role: "worker", name: "Ivan", total: "10", completed: "5"},
                {id: 2, role: "worker", name: "Artur", total: "10", completed: "5"}
            ]
        },
        {
            id: 2, workers: [
                {id: 1, role: "worker", name: "Ivan", total: "10", completed: "5"},
            ]
        },
        {
            id: 3, workers: [
                {id: 3, role: "worker", name: "Hello world worker", total: "10", completed: "5"}
            ]
        }
    ])

    const deleteWorker = (managerId, workerId) => {
        const updatedWorkersList = workersList.map(manager => {
            if (manager.id !== managerId) {
                return manager;
            }
            const updatedWorkers = manager.workers.filter(worker => worker.id !== workerId);
            return Object.assign({}, manager, {workers: updatedWorkers});
        });
        setWorkersList(updatedWorkersList);
    }

    const [searchQuery, setSearchQuery] = useState('')

    const [activeKey, setActiveKey] = useState("Projects");

    const selectedList = useMemo(() => {
        if (searchQuery) {
            return managersList.filter(manager => manager.name.toLowerCase().includes(searchQuery.toLowerCase()))
        }
        return managersList
    }, [searchQuery])

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
                            {selectedList.map(manager =>
                                <Nav.Item>
                                    <Nav.Link eventKey={manager.id}>{manager.name}</Nav.Link>
                                </Nav.Item>
                            )}
                            <Nav.Item>
                                <Nav.Link className="btn btn-outline-success"
                                          eventKey={"NewProj"}>{"Create new manager"}</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={9}>
                            <Button className={activeKey === "Projects" ? "bg-light" : "bg-dark" } onClick = {() => setActiveKey("Projects")}>Projects</Button>
                            <Button className={activeKey === "Workers" ? "bg-light" : "bg-dark" } onClick = {() => setActiveKey("Workers")}>Workers</Button>
                        <Tab.Content className="mt-3">
                            {workersList.map(manager =>
                                <Tab.Pane eventKey={manager.id}>
                                    <h4 className="mt-1 ms-2">
                                        Workers:
                                    </h4>
                                    {manager.workers.map(worker =>
                                        <Worker callBackDeleteFunction={deleteWorker} workerId={worker.id}
                                                linkedId={manager.id} role={worker.role} name={worker.name}
                                                total={worker.total} completed={worker.completed}/>
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

export default ManagersComponent;