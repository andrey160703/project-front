import React, {useState} from 'react';
import Header from "../components/Header";
import {useParams} from "react-router-dom";
import Report from "../components/Report";
import ReportList from "../components/ReportList";

const Reports = () => {
    const params = useParams(); /// todo get request by taskId
    const reports = [
        {
            id: 1,
            title: "Title 1",
            text: "Short report",
            read: true,
        },
        {
            id: 2,
            title: "Title 2",
            text: "Medium-length report with some additional details and information.",
            read: false,
        },
        {
            id: 3,
            title: "Title 3",
            text:
                "Long report that contains a lot of text. It includes multiple paragraphs and covers various aspects of the subject matter. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec velit non metus congue facilisis. Quisque quis lectus justo. Aliquam erat volutpat. Donec sed odio non lectus vulputate aliquet. Etiam vitae neque at justo interdum volutpat. Morbi pulvinar sapien vel sem tristique semper. Fusce nec finibus turpis, vitae placerat tortor. Curabitur ac varius nisl. Mauris nec vulputate ligula. Aliquam suscipit diam ac nibh egestas iaculis. Donec consequat tellus vitae gravida fermentum. Pellentesque id pulvinar lorem. Aliquam pharetra lacinia risus, id vestibulum tellus viverra in.",
            read: false,
        },
        {
            id: 4,
            title: "Title 4",
            text: "Very short report",
            read: true,
        },
        {
            id: 5,
            title: "Title 5",
            text: "Another medium-length report for demonstration purposes.",
            read: false,
        },
        {
            id: 6,
            title: "Title 6",
            text: "Another short report",
            read: false,
        },
        {
            id: 7,
            title: "Title 7",
            text:
                "Another long report with a significant amount of text. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nec velit non metus congue facilisis. Quisque quis lectus justo. Aliquam erat volutpat. Donec sed odio non lectus vulputate aliquet. Etiam vitae neque at justo interdum volutpat. Morbi pulvinar sapien vel sem tristique semper. Fusce nec finibus turpis, vitae placerat tortor. Curabitur ac varius nisl. Mauris nec vulputate ligula. Aliquam suscipit diam ac nibh egestas iaculis. Donec consequat tellus vitae gravida fermentum. Pellentesque id pulvinar lorem. Aliquam pharetra lacinia risus, id vestibulum tellus viverra in.",
            read: true,
        },
    ];


    return (
        <div>
             <ReportList reports={reports}/>}
        </div>
    );
};

export default Reports;