import React from 'react';
import { Button } from 'react-bootstrap';
import './NewProjectForm.css'; // Import the CSS file

const NewProjectForm = ({
                            newProjectTitle,
                            newProjectDescription,
                            setNewProjectTitle,
                            setNewProjectDescription,
                            handleCreateProject,
                        }) => {
    return (
        <div className="new-project-form">
            <h2 className="mt-1 ms-2">Create New Project</h2>
            <div className="mt-1 ms-2">
                <label>Title:</label>
                <input
                    type="text"
                    value={newProjectTitle}
                    onChange={(e) => setNewProjectTitle(e.target.value)}
                />
            </div>
            <div className="mt-1 ms-2">
                <label>Description:</label>
                <textarea
                    value={newProjectDescription}
                    onChange={(e) => setNewProjectDescription(e.target.value)}
                ></textarea>
            </div>
            <Button className="mt-3 ms-2" onClick={handleCreateProject}>
                Create Project
            </Button>
        </div>
    );
};

export default NewProjectForm;
