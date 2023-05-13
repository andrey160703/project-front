import React, { useState } from 'react';
import './Task.css';

const Task = ({ callBackDeleteFunction, callBackCloseFunction, callBackMoveFunction, ...props }) => {
    const [title, changeTittleFunc] = useState(props.post.title);
    const [text, changeTextFunc] = useState(props.post.text);
    const [closed, setClosed] = useState(props.post.closed);
    const [closedDate, setClosedDate] = useState(props.post.closedDate);
    const [isEditing, setIsEditing] = useState(false);

    function saveFunction() {
        setIsEditing(false);
        // TODO: Implement save functionality
    }

    function changeHeadingData(event) {
        changeTittleFunc(event.target.value);
    }

    function changeTextData(event) {
        changeTextFunc(event.target.value);
    }

    function closeTask() {
        setClosed(true);
        setClosedDate(new Date());
        callBackCloseFunction(props.post.id)
    }

    return (
        <div className={`Task ${closed ? 'Task--closed' : ''}`}>
            <div className="TaskWorkSpace">
                {isEditing ? (
                    <>
                        <input
                            className="TaskWorkSpaceHeading"
                            placeholder="Title"
                            value={title}
                            onChange={changeHeadingData}
                        />
                        <textarea
                            className="TaskWorkSpaceText"
                            placeholder="Task text"
                            value={text}
                            onChange={changeTextData}
                        />
                        <button className="TaskButton" onClick={saveFunction}>Save</button>
                    </>
                ) : (
                    <>
                        <h3 className="TaskWorkSpaceHeading">{title}</h3>
                        <p className="TaskWorkSpaceText">{text}</p>
                        {closed ? (
                            <>
                                <div className="TaskClosedDate">
                                    <span className="TaskDate">Created on {props.post.createdDate.toLocaleDateString()}</span>
                                </div>
                                <div>
                                    <span className="TaskDate">Closed on {closedDate.toLocaleDateString()}</span>
                                </div>
                            </>
                        ) : (
                            <div className="TaskFooter">
                                <div className="TaskDate">Created on {props.post.createdDate.toLocaleDateString()}</div>
                                <button className="TaskButton" onClick={() => setIsEditing(true)}>Edit task</button>
                                <button className="TaskButton" onClick={() => callBackMoveFunction(props.post)}>View report</button>
                                <button className="TaskButton CloseButton" onClick={closeTask}>Close task</button>
                                <button className="TaskButton DeleteButton" onClick={() => callBackDeleteFunction(props.post)}>Delete Task</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Task;
