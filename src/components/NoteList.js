import React, {useState} from 'react';
import Note from "./Note";
import "./NoteList.css"
import NewNoteButton from "./UI/NewNoteButton";

const NoteList = () => {
     const [notes, setNotes] = useState([
         { id: 1, title: "Test node 1", text: "Task 123123123 test" },
         { id: 2, title: "Test node 2", text: "Task jjjjjj test" },
         { id: 3, title: "Hello world note!", text: "Hello world!" }
     ])
    console.log("first download")

    function createNewNote() {
        const newNote = {id: Date.now(), tittle: "", text: ""}
        console.log(newNote)
        setNotes([...notes, newNote])
    }

    const deleteNode = (post) => {
        setNotes(notes.filter(n => n.id !== post.id))
    }

    return (
        <div className={"NoteList"}>
            {notes.map(note =>
                <Note callBackDeleteFunction={deleteNode} post={{id: note.id, title: note.title, text: note.text}} key={note.id}/>
            )}
            <NewNoteButton onClick={createNewNote}>
                Create new task
            </NewNoteButton>
        </div>
    );
};

export default NoteList;