import { useState, useEffect } from 'react';
import axios from 'axios';
import months from '../utils/months';
const TransactionStatistics = ({ selectedMonth }) => {
    const [statistics, setStatistics] = useState({
        totalSaleAmount: 0,
        totalSoldItems: 0,
        totalNotSoldItems: 0
    });

    useEffect(() => {
        fetchStatistics(months[selectedMonth]);
    }, [selectedMonth]);

    const fetchStatistics = async (month) => {
        try {
            const response = await axios.get(`http://localhost:5000/statistics/${month}`);
            setStatistics(response.data);
        } catch (error) {
            console.error('Error fetching statistics:', error);
        }
    };

    return (
        <div>
            <h2 className='text-5xl font-semibold mt-8 mb-6'>{`Statistics - ${selectedMonth}`}</h2>
            <div className='border-2 rounded-md border-blue-400 px-4 py-4 w-fit text-xl font-medium'>
                <p>Total Sale :  ₹ {statistics.totalSaleAmount}</p>
                <p>Total Sold Items :  {statistics.totalSoldItems}</p>
                <p>Total Not Sold Items :  {statistics.totalNotSoldItems}</p>
            </div>
        </div>
    )
}

export default TransactionStatistics