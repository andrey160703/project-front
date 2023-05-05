import React, { useState } from 'react';
import './Note.css';

const Note = ({ callBackDeleteFunction, ...props }) => {

    const [title, changeTitle] = useState(props.post.title);
    const [text, changeText] = useState(props.post.text);
    const date = new Date().toLocaleDateString();

    function saveNote() {
        // TODO: Implement save functionality
    }

    function handleTitleChange(event) {
        changeTitle(event.target.value);
    }

    function handleTextChange(event) {
        changeText(event.target.value);
    }

    return (
        <div className="note">
            <div className="note-header">
                <input
                    className="note-title"
                    placeholder="Title"
                    value={title}
                    onChange={handleTitleChange}
                />
                <div className="note-date">{date}</div>
            </div>
            <textarea
                className="note-text"
                placeholder="Note text"
                value={text}
                onChange={handleTextChange}
            />
            <div className="note-footer">
                <button className="note-button">View report</button>
                <button
                    className="note-button delete-button"
                    onClick={() => callBackDeleteFunction(props.post)}
                >
                    Delete note
                </button>
            </div>
        </div>
    );
};

export default Note;
