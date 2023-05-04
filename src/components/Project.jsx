import React from 'react';
import './Project.css'
import Button from 'react-bootstrap/Button';
const Project = ({callBackDeleteFunction, projectId, linkedId, title, description}) => {
    return (
        <div className="Project">
            <div className="Project-Photo">
                <img
                    src="http://static.physoc.org/app/uploads/2019/10/09133258/Honorary-Members-placeholder.jpg"
                    width="100%"
                    height="100%"
                />
            </div>
            <div className="Data">
                <div className="Title">
                    Title: {title}
                </div>
                <div className="Description">
                    Description: {description}
                </div>
            </div>
            <div className="Description">
                Here will be description about this worker (need this case or not?)
            </div>
            <div className="Buttons">
                <Button style={{margin: '5px 10px 0px 0px', width: "100%"}}>View project</Button>
            </div>
        </div>
    );
};

export default Project;