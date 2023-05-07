import React, { useState, useEffect } from "react";
import Note from "./Note";
import NewNoteButton from "./UI/NewNoteButton";
import "./NoteList.css";
import note from "./Note";

const NoteList = () => {
    const [notes, setNotes] = useState([
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

    const [currentNotes, setCurrentNotes] = useState(notes)
    const [showClosed, setShowClosed] = useState(false);
    const [sortBy, setSortBy] = useState("newest");

    useEffect(() => {
        sortNotes();
    }, [notes, showClosed, sortBy]);

    function createNewNote() {
        const newNote = {
            id: Date.now(),
            title: "",
            text: "",
            createdDate: new Date(),
            closed: false,
            closedDate: null,
        };
        setNotes([...notes, newNote]);
    }

    function deleteNote(post) {
        setNotes(notes.filter((n) => n.id !== post.id));
    }

    function closeNote(id) {
        let i = 0;
        while (i < notes.length) {
            if (notes.at(i).id === id) {
                notes.at(i).closed = true;
                break;
            }
            i++;
        }
    }

    function toggleShowClosed() {
        setShowClosed(!showClosed);
    }

    function sortNotes() {
        let sortedNotes = notes.slice();
        if (!showClosed) {
            sortedNotes = sortedNotes.filter((n) => !n.closed);
        }

        if (sortBy === "newest") {
            sortedNotes = sortedNotes.sort((a, b) => b.createdDate - a.createdDate);
        } else if (sortBy === "oldest") {
            sortedNotes = sortedNotes.sort((a, b) => a.createdDate - b.createdDate);
        } else if (sortBy === "openFirst") {
            sortedNotes = sortedNotes.sort((a, b) => a.closed - b.closed);
        } else if (sortBy === "closedFirst") {
            sortedNotes = sortedNotes.sort((a, b) => b.closed - a.closed);
        }

        setCurrentNotes(sortedNotes);
    }

    function handleSortChange(event) {
        setSortBy(event.target.value);
    }

    const filteredNotes = currentNotes.filter(
        (note) => showClosed || !note.closed
    );

    return (

        <div className="NoteList">
            <div className="NoteList-header">
                <h2>Notes</h2>
                <NewNoteButton onClick={createNewNote}>Create new note</NewNoteButton>
                <div className="NoteList-header-filters">
                    <div className="NoteList-header-filters-sort">
                        <span>Sort by:</span>
                        <select onChange={handleSortChange}>
                            <option value="newest">Date created: newest first</option>
                            <option value="oldest">Date created: oldest first</option>
                            <option value="openFirst">Open notes first</option>
                            <option value="closedFirst">Closed notes first</option>
                        </select>
                    </div>
                    <div className="NoteList-header-filters-toggle">
                        <label>Show closed notes:</label>
                        <input type="checkbox" onChange={toggleShowClosed} checked={showClosed}/>
                    </div>
                </div>
            </div>
            <div className="NoteList-items">
                {filteredNotes.map((note) => (
                    <Note
                        key={note.id}
                        post={{id: note.id, title: note.title, text: note.text, createdDate: note.createdDate, closed: note.closed, closedDate: note.closedDate}}
                        callBackDeleteFunction={deleteNote}
                        callBackCloseFunction={closeNote}
                    />
                ))}
            </div>
        </div>
    );
}
export default NoteList;