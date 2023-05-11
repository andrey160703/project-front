import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const GraphicComponent = ({ data }) => {
    const [selectedAxis, setSelectedAxis] = useState('tasks');

    const handleAxisChange = (e) => {
        setSelectedAxis(e.target.value);
    };

    return (
        <div>
            <select value={selectedAxis} onChange={handleAxisChange}>
                <option value="tasks">По количеству задач</option>
                <option value="hours">По количеству часов</option>
            </select>
            <LineChart width={600} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey={selectedAxis} stroke="#8884d8" />
            </LineChart>
        </div>
    );
};

export default GraphicComponent;
