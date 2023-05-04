import React from 'react';
import classes from "./MyButton.module.css";
const MyButton = ({children, ...props}) => {
    return (
        <button {...props} className={classes.myBtn}>
            <span className={classes.button__line + ' ' + classes.button__lineTop}></span>
            <span className={classes.button__line + ' ' + classes.button__lineRight}></span>
            <span className={classes.button__line + ' ' + classes.button__lineBottom}></span>
            <span className={classes.button__line + ' ' + classes.button__lineLeft}></span>
            {children}
        </button>
    );
};

export default MyButton;