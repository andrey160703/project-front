import React, {useEffect, useState} from 'react';
import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line} from 'recharts';
import './UserChart.css';

const UserChart = () => {
    const [selectedData, setSelectedData] = useState('tasks');
    const [selectedColor, setSelectedColor] = useState('#8884d8');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const generateTestData = () => {
        const data = [];
        const startDate = new Date('2023-04-01');
        const endDate = new Date('2023-05-20');

        let currentDate = startDate;
        while (currentDate <= endDate) {
            const date = currentDate.toISOString().split('T')[0];
            const tasks = Math.floor(Math.random() * 10) + 1;
            const clicks = Math.floor(Math.random() * 400) + 50;

            data.push({ date, tasks, clicks });

            currentDate.setDate(currentDate.getDate() + 1);
        }

        return data;
    };

    const [data, setData] = useState([]);

    useEffect(() => {
        if (data.length === 0) {
            const generatedData = generateTestData();
            setData(generatedData);
        }
    }, [data]);

    const handleDataChange = (event) => {
        setSelectedData(event.target.value);
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    const handleStartDateChange = (event) => {
        setStartDate(event.target.value);
    };

    const handleEndDateChange = (event) => {
        setEndDate(event.target.value);
    };

    const filteredData = data.filter((item) => {
        if (startDate && endDate) {
            return item.date >= startDate && item.date <= endDate;
        }
        return true;
    });

    return (
        <div className="user-chart-container">
            <div className="control-container">
                <div className="select-container">
                    <label>Select data:</label>
                    <select value={selectedData} onChange={handleDataChange}>
                        <option value="tasks">Number of tasks</option>
                        <option value="clicks">Number of clicks</option>
                    </select>
                </div>
                <div className="color-container">
                    <label>Select color:</label>
                    <input type="color" value={selectedColor} onChange={handleColorChange} />
                </div>
                <div className="date-container">
                    <label>Select interval:</label>
                    <input type="date" value={startDate} onChange={handleStartDateChange} />
                    <input type="date" value={endDate} onChange={handleEndDateChange} />
                </div>
            </div>
            <div className="chart-container">
                <LineChart width={600} height={400} data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey={selectedData} stroke={selectedColor} />
                </LineChart>

            </div>
        </div>
    );
};

export default UserChart;
