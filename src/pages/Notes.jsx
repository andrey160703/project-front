import React from 'react';
import NoteList from "../components/NoteList";
import Header from "../components/Header";

const Notes = () => {
    return (
        <div>
            <Header/>
            <NoteList/>
        </div>
    );
};

export default Notes;