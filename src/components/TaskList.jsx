import React, { useState, useEffect } from "react";
import Task from "./Task";
import NewTaskButton from "./UI/NewTaskButton";
import "./TaskList.css";
import { useNavigate, useParams } from "react-router-dom";
import UserChart from "./UserChart";

const TaskList = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([ /// todo get request params.projectId params.workerId
        {
            id: 1,
            title: "Test note 1",
            text: "Task 123123123 test",
            createdDate: new Date("2022-02-01"),
            closed: false,
            closedDate: null,
        },
        {
            id: 2,
            title: "Test note 2",
            text: "Task jjjjjj test",
            createdDate: new Date("2022-02-03"),
            closed: false,
            closedDate: null,
        },
        {
            id: 3,
            title: "Hello world note!",
            text: "Hello world!",
            createdDate: new Date("2022-01-25"),
            closed: false,
            closedDate: null,
        },
        {
            id: 4,
            title: "Closed note 1",
            text: "This is a closed note",
            createdDate: new Date("2022-01-10"),
            closed: true,
            closedDate: new Date("2022-01-15"),
        },
        {
            id: 5,
            title: "Closed note 2",
            text: "This is another closed note",
            createdDate: new Date("2022-02-05"),
            closed: true,
            closedDate: new Date("2022-02-10"),
        },
    ]);

    const [currentTasks, setCurrentTasks] = useState(tasks);
    const [showClosed, setShowClosed] = useState(false);
    const [sortBy, setSortBy] = useState("newest");
    const [showChart, setShowChart] = useState(false);

    useEffect(() => {
        sortTasks();
    }, [tasks, showClosed, sortBy]);

    function createNewTask() {
        const newTask = {
            id: Date.now(),
            title: "",
            text: "",
            createdDate: new Date(),
            closed: false,
            closedDate: null,
        };
        setTasks([newTask, ...tasks]);
    }

    function deleteTask(post) {
        setTasks(tasks.filter((n) => n.id !== post.id));
    }

    function closeTask(id) {
        let i = 0;
        while (i < tasks.length) {
            if (tasks.at(i).id === id) {
                tasks.at(i).closedDate = new Date();
                console.log(tasks.at(i).closedDate)
                tasks.at(i).closed = true;
                break;
            }
            i++;
        }
    }

    function goToReports(data) {
        navigate('/reports/' + data.id);
    }

    function toggleShowClosed() {
        setShowClosed(!showClosed);
    }

    function sortTasks() {
        let sortedTasks = tasks.slice();
        if (!showClosed) {
            sortedTasks = sortedTasks.filter((n) => !n.closed);
        }

        if (sortBy === "newest") {
            sortedTasks = sortedTasks.sort((a, b) => b.createdDate - a.createdDate);
        } else if (sortBy === "oldest") {
            sortedTasks = sortedTasks.sort((a, b) => a.createdDate - b.createdDate);
        } else if (sortBy === "openFirst") {
            sortedTasks = sortedTasks.sort((a, b) => a.closed - b.closed);
        } else if (sortBy === "closedFirst") {
            sortedTasks = sortedTasks.sort((a, b) => b.closed - a.closed);
        }

        setCurrentTasks(sortedTasks);
    }

    function handleSortChange(event) {
        setSortBy(event.target.value);
    }

    const filteredTasks = currentTasks.filter(
        (task) => showClosed || !task.closed
    );

    /// todo show worker's information before notes
    return (
        <div className="TaskList">
            <div className="TaskList-header-chart">
                <button onClick={() => setShowChart(!showChart)}>Toggle Chart</button>
                {showChart && <UserChart data={tasks} />}
            </div>
            <div className="TaskList-header">
                <h2>Tasks</h2>
                <div className="TaskList-header-controls">
                    <div className="TaskList-header-buttons">
                        <NewTaskButton onClick={createNewTask}>Create new task</NewTaskButton>
                        <div className="TaskList-header-filters">
                            <div className="TaskList-header-filters-sort">
                                <span>Sort by:</span>
                                <select onChange={handleSortChange}>
                                    <option value="newest">Date created: newest first</option>
                                    <option value="oldest">Date created: oldest first</option>
                                    <option value="openFirst">Open notes first</option>
                                    <option value="closedFirst">Closed notes first</option>
                                </select>
                            </div>
                            <div className="TaskList-header-filters-toggle">
                                <label>Show closed notes:</label>
                                <input
                                    type="checkbox"
                                    onChange={toggleShowClosed}
                                    checked={showClosed}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="TaskList-items">
                {filteredTasks.map((task) => (
                    <Task
                        key={task.id}
                        post={{id: task.id, title: task.title, text: task.text, createdDate: task.createdDate, closed: task.closed, closedDate: task.closedDate}}
                        callBackDeleteFunction={deleteTask}
                        callBackCloseFunction={closeTask}
                        callBackMoveFunction={goToReports}
                    />
                ))}
            </div>
        </div>
    );
}
export default TaskList;