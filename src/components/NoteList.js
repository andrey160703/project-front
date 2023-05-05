import React, { useState } from 'react';
import Note from "./Note";
import NewNoteButton from "./UI/NewNoteButton";
import './NoteList.css';

const NoteList = () => {
    const [notes, setNotes] = useState([
        { id: 1, title: "Test note 1", text: "Task 123123123 test", closed: false},
        { id: 2, title: "Test note 2", text: "Task jjjjjj test", closed: false },
        { id: 3, title: "Hello world note!", text: "Hello world!", closed: false }
    ]);

    function createNewNote() {
        const newNote = { id: Date.now(), title: "", text: "" };
        setNotes([...notes, newNote]);
    }

    const deleteNode = (post) => {
        setNotes(notes.filter(n => n.id !== post.id));
    };

    return (
        <div className="NoteList">
            <div className="NoteList-header">
                <h2>Notes</h2>
                <NewNoteButton onClick={createNewNote}>Create new note</NewNoteButton>
            </div>
            <div className="NoteList-items">
                {notes.map(note =>
                    <Note callBackDeleteFunction={deleteNode} post={{id: note.id, title: note.title, text: note.text, closed: note.closed}} key={note.id}/>
                )}
            </div>
        </div>
    );
};

export default NoteList;
