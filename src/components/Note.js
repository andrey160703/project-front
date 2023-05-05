import React, { useState } from 'react';
import './Note.css';

const Note = ({ callBackDeleteFunction, ...props }) => {
    const [title, changeTittleFunc] = useState(props.post.title);
    const [text, changeTextFunc] = useState(props.post.text);
    const [closed, setClosed] = useState(false);
    const [closedDate, setClosedDate] = useState(null);
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

    function closeNote() {
        setClosed(true);
        setClosedDate(new Date());
    }

    return (
        <div className={`Note ${closed ? 'Note--closed' : ''}`}>
            <div className="NoteWorkSpace">
                {isEditing ? (
                    <>
                        <input
                            className="NoteWorkSpaceHeading"
                            placeholder="Title"
                            value={title}
                            onChange={changeHeadingData}
                        />
                        <textarea
                            className="NoteWorkSpaceText"
                            placeholder="Note text"
                            value={text}
                            onChange={changeTextData}
                        />
                        <button className="NoteButton" onClick={saveFunction}>Save</button>
                    </>
                ) : (
                    <>
                        <h3 className="NoteWorkSpaceHeading">{title}</h3>
                        <p className="NoteWorkSpaceText">{text}</p>
                        {closed ? (
                            <>
                                <div className="NoteClosedDate">
                                    <span className="NoteDate">Created on {new Date(props.post.date).toLocaleDateString()}</span>
                                </div>
                                <div>
                                    <span className="NoteDate">Closed on {closedDate.toLocaleDateString()}</span>
                                </div>
                            </>
                        ) : (
                            <div className="NoteFooter">
                                <div className="NoteDate">Created on {new Date(props.post.date).toLocaleDateString()}</div>
                                <button className="NoteButton" onClick={() => setIsEditing(true)}>Edit note</button>
                                <button className="NoteButton">View report</button>
                                <button className="NoteButton CloseButton" onClick={closeNote}>Close note</button>
                                <button className="NoteButton DeleteButton" onClick={() => callBackDeleteFunction(props.post)}>Delete note</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};

export default Note;
