import React, {useContext, useState} from 'react';
import './Manager.css'
import Button from 'react-bootstrap/Button';
import {AdministratorContext} from "../context";
const Manager = ({callBackDeleteFunction, projectId, managerId, name, role}) => {
    const {isAdministrator, setIsAdministrator} = useContext(AdministratorContext)
    return (
        <div className="Manager">
            <div className="Photo">
                <img
                    src="http://static.physoc.org/app/uploads/2019/10/09133258/Honorary-Members-placeholder.jpg"
                    width="100%"
                    height="100%"
                />
            </div>
            <div className="Data">
                <div className="Tasks">
                    <div className="Role">
                        Role: {role}
                    </div>
                    <div className="Name">
                        Name: {name}
                    </div>
                </div>
                <div className="Other">
                    Here will be other stat information about this manager
                </div>
            </div>
            <div className="Description">
                Here will be description about this manager (need this case or not?)
            </div>
            <div className="Buttons">
                {isAdministrator && <Button style={{margin: '5px 10px 0px 0px', width: "100%"}} onClick={() => callBackDeleteFunction(projectId, managerId)}>Delete this manager</Button>}
            </div>
        </div>
    );
};

export default Manager;