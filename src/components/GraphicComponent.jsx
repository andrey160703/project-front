import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './GraphicComponent.css';

const GraphicComponent = ({ data }) => {
    const [selectedData, setSelectedData] = useState('tasks');
    const [selectedColor, setSelectedColor] = useState('#8884d8');

    const handleDataChange = (event) => {
        setSelectedData(event.target.value);
    };

    const handleColorChange = (event) => {
        setSelectedColor(event.target.value);
    };

    return (
        <div className="graphic-container">
            <div className="control-container">
                <div className="select-container">
                    <label>Select data:</label>
                    <select value={selectedData} onChange={handleDataChange}>
                        <option value="tasks">Number of tasks</option>
                        <option value="hours">Number of hours</option>
                    </select>
                </div>
                <div className="color-container">
                    <label>Select color:</label>
                    <input type="color" value={selectedColor} onChange={handleColorChange} />
                </div>
                <div className="date-container">
                    <label>Select interval:</label>
                    <input type="date" />
                    <input type="date" />
                </div>
            </div>
            <div className="chart-container">
                <BarChart width={600} height={400} data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey={selectedData} fill={selectedColor} />
                </BarChart>
            </div>
        </div>
    );
};

export default GraphicComponent;
