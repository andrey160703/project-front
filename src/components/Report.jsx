import React, { useState } from "react";
import "./Report.css";

const Report = ({ id, title, text, initialRead, wasMarkedCallBackFunction }) => {
    const [isReportRead, setIsReportRead] = useState(initialRead);

    const handleReportRead = () => {
        setIsReportRead(true);
        wasMarkedCallBackFunction(id);
    };

    return (
        <div className={`Report ${isReportRead ? "Report-read" : ""}`}>
            <div className="Report-content">
                <h2 className="Report-title">{title}</h2>
                <p className="Report-text">{text}</p>
            </div>
            {!isReportRead && (
                <button className="Report-readButton" onClick={handleReportRead}>
                    Mark as Read
                </button>
            )}
        </div>
    );
};

export default Report;
