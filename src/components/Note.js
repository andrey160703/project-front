import React, {useState} from 'react';
import './Note.css'

const Note = ({callBackDeleteFunction, ...props}) => {

    let placeholderTextValue = "Your note text"
    let placeholderHeadingValue = "Your heading"

    const [title, changeTittleFunc] = useState(props.post.title)
    const [text, changeTextFunc] = useState(props.post.text)

    function saveFunction() {

    }

    function changeHeadingData(args) {
        changeTittleFunc(args.value)
    }

    function changeTextData(args) {
        changeTextFunc(args.value)
    }

    return (
        <div className="Note">
            <div className="NoteWorkSpace">
                <input
                    className="NoteWorkSpaceHeading"
                    placeholder={placeholderHeadingValue}
                    value={title}
                    onChange={changeHeadingData}
                />
                <input
                    className="NoteWorkSpaceText"
                    placeholder={placeholderTextValue}
                    value={text}
                    onChange={changeTextData}
                />
            </div>
            <button
                className={"NoteButton"}
                onClick={saveFunction}
            >
                Save note
            </button>
            <button
                className={"NoteButton"}
                onClick={() => callBackDeleteFunction(props.post)}
            >
                Delete note
            </button>
    </div>);
};

export default Note;