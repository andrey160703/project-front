import React from 'react';
import classes from './NewNoteButtom.module.css'

const NewTaskButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    );
};

export default NewTaskButton;