import React, {useState} from 'react';
import Header from "../components/Header";
import {useParams} from "react-router-dom";
import Report from "../components/Report";
import ReportList from "../components/ReportList";

const Reports = () => {
    const params = useParams(); /// todo get request by taskId
    const reports = [
        { id: 1, text: "Report 1", read: true },
        { id: 2, text: "Report 2", read: false },
        { id: 3, text: "Report 3", read: false },
    ];
    const [isReportListOpen, setIsReportListOpen] = useState(false);

    const openReportList = () => {
        setIsReportListOpen(true);
    };

    const closeReportList = () => {
        setIsReportListOpen(false);
    };

    return (
        <div>
            <button onClick={openReportList}>Open Report List</button>
            {isReportListOpen && <ReportList onClose={closeReportList} reports={reports}/>}
        </div>
    );
};

export default Reports;