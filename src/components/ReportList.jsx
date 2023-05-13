import React from "react";
import Report from "./Report";
import "./ReportList.css";

const ReportList = ({ onClose, reports }) => {
    return (
        <div className="ReportList">
            <h2 className="ReportList-title">Report List</h2>
            {reports.map((report) => (
                <Report key={report.id} text={report.text} initialRead={report.read} />
            ))}
            <button className="ReportList-closeButton" onClick={onClose}>
                Close
            </button>
        </div>
    );
};

export default ReportList;
