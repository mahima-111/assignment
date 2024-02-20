import { useState, useEffect } from 'react';
import axios from 'axios';
import months from '../utils/months';
import ChartDisplay from './ChartDisplay';
const BarChart = ({ selectedMonth }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        fetchChartData(months[selectedMonth]);
    }, [selectedMonth]);

    const fetchChartData = async (month) => {
        try {
            const response = await axios.get(`http://localhost:5000/bar-chart/${month}`);
            setChartData(response.data);
        } catch (error) {
            console.error('Error fetching chart data:', error);
        }
    };


    return (
        <div>
            <h2 className='text-5xl font-semibold mt-8 mb-6'>{`Bar Chart Stats - ${selectedMonth}`}</h2>
            
            <ChartDisplay chartData={chartData}/>
        </div>
    )
}

export default BarChart