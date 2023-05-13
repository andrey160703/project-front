import React, { useState } from "react";
import Report from "./Report";
import "./ReportList.css";

const ReportList = ({ reports }) => {
    const [sortOrder, setSortOrder] = useState("unread");
    const [showReadReports, setShowReadReports] = useState(true);

    const sortReports = (reports) => {
        if (sortOrder === "unread") {
            return reports.sort((a, b) => (a.read === b.read ? 0 : a.read ? 1 : -1));
        } else {
            return reports.sort((a, b) => (a.read === b.read ? 0 : a.read ? -1 : 1));
        }
    };

    const filterReadReports = (reports) => {
        if (showReadReports) {
            return reports;
        } else {
            return reports.filter((report) => !report.read);
        }
    };

    const sortedReports = sortReports(reports);
    const filteredReports = filterReadReports(sortedReports);

    function reportWasMarked(id) {
        let i = 0;
        while (i < reports.length) {
            if (reports.at(i).id === id) {
                reports.at(i).read = 1;
            }
            ++i;
        }
    }

    return (
        <div className="ReportList-container">
            <h2 className="ReportList-title">Report List</h2>
            <div className="ReportList-actions">
                <ul className="ReportList-sort">
                    <li
                        className={`ReportList-sortItem ${sortOrder === "unread" ? "active" : ""}`}
                        onClick={() => setSortOrder("unread")}
                    >
                        Sort Unread
                    </li>
                    <li
                        className={`ReportList-sortItem ${sortOrder === "read" ? "active" : ""}`}
                        onClick={() => setSortOrder("read")}
                    >
                        Sort Read
                    </li>
                </ul>
                <label className="ReportList-checkbox">
                    <input
                        type="checkbox"
                        checked={!showReadReports}
                        onChange={() => setShowReadReports(!showReadReports)}
                    />
                    Hide Read Reports
                </label>
            </div>
            <div className="ReportList-items">
                {filteredReports.map((report) => (
                    <div className="ReportList-item" key={report.id}>
                        <Report id={report.id} title={report.title} text={report.text} initialRead={report.read} wasMarkedCallBackFunction={reportWasMarked} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ReportList;
