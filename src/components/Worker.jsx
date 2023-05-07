import React from 'react';
import './Worker.css'
import Button from 'react-bootstrap/Button';
const Worker = ({callBackDeleteFunction, callBackTaskManagementFunction, workerId, linkedId, role, name, total, completed}) => {
    return (
        <div className="Worker">
            <div className="Worker-Photo">
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
                    <div className="Total">
                        Total tasks: {total}
                    </div>
                    <div className="Completed">
                        Completed tasks: {completed}
                    </div>
                </div>
                <div className="Other">
                    Here will be other stat information about this worker
                </div>
            </div>
            <div className="Description">
                Here will be description about this worker (need this case or not?)
            </div>
            <div className="Buttons">
                <Button onClick={() => callBackTaskManagementFunction(linkedId, workerId)} style={{margin: '5px 10px 0px 0px', width: "100%"}}>Task management</Button>
                <Button onClick={() => callBackDeleteFunction(linkedId, workerId)} style={{margin: '5px 10px 0px 0px', width: "100%"}}>Delete this worker</Button>
            </div>
        </div>
    );
};

export default Worker;