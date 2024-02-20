import { useState, useEffect } from 'react';
import axios from 'axios';
import months from '../utils/months';
import { monthsArray } from '../utils/months';
import DisplayTransactionTable from './DisplayTransactionTable';
import TransactionStatistics from './TransactionStatistics';
import BarChart from './BarChart';

const TransactionTable = () => {
    const [loading,setLoading]=useState(false);
    const [productList, setProductList] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState('March');
    const [searchText, setSearchText] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages,setTotalPages]=useState(1);
    const [perPage,setPerPage]=useState(2);
    const [err,setErr]=useState({});

    useEffect(() => {
        fetchData(months[selectedMonth]);
    }, [selectedMonth, currentPage, searchText,perPage]);

    const fetchData = async (month) => {
        try {
            setLoading(true);
            const {data} = await axios.get(`http://localhost:5000/products/${month}?page=${currentPage}&perPage=${perPage}&q=${searchText}`);
            setProductList(data.productList);
            setTotalPages(data.totalPages);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setErr(error);
            console.error('Error fetching data:', error);
        }
    };

    const handleSearch = (e) => {
        setSearchText(e.target.value);
        setCurrentPage(1);
    };

    const handleNextPage = () => {
        if(currentPage<totalPages){
            setCurrentPage(currentPage+1);
        }
    };

    const handlePrevPage = () => {
        if(currentPage>1){
            setCurrentPage(currentPage-1);
        }
    };
    if(Object.keys(err).length){
        return <h1>some error occured</h1>
    }
    else if(loading){
        return <h1>Loading data...</h1>
    }
    else if(productList.length===0){
        return <h1>cannot find the item</h1>
    }
    return (
    <div>
        <div>
            <h1 className='text-5xl font-semibold mt-8 mb-6'>Transactions Table</h1>

            <div className='flex justify-between mb-4'>
                <input type="text" value={searchText} onChange={handleSearch} placeholder="Search for a product" className='border-2 outline-none border-blue-400 rounded-md text-lg px-2 py-1'/>

                <div>
                <label htmlFor='per-page'>Products per page: </label>
                <select id='per-page' value={perPage} className='border-2 outline-none border-blue-400 rounded-md text-lg px-2 py-1' onChange={(e) => 
                    {setPerPage(e.target.value)
                        setCurrentPage(1);
                    }}>
                    <option value={1}>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                    <option value='6'>6</option>
                    <option value='7'>7</option>
                    <option value='8'>8</option>
                    <option value='9'>9</option>
                    <option value='10'>10</option>
                </select>
                </div>

                <select value={selectedMonth} className='border-2 outline-none border-blue-400 rounded-md text-lg px-2 py-1' onChange={(e) =>{
                    setSelectedMonth(e.target.value);
                    setCurrentPage(1);
                }}>
                    {monthsArray.map((elem,index)=>{
                        return <option value={elem} key={index}>{elem}</option>
                    })}
                </select>
            </div>
            
            <DisplayTransactionTable productList={productList} />

            <div className='flex justify-between text-2xl font-semibold my-4'>
            <button onClick={handlePrevPage} className='border-2 border-blue-400 rounded-md px-4 py-1'>Previous</button>
            <h2 className=''>{`Page No : ${currentPage} of ${totalPages}`}</h2>
            <button onClick={handleNextPage} className='border-2 border-blue-400 rounded-md px-4 py-1'>Next</button>
            </div>
        </div>

        <TransactionStatistics selectedMonth={selectedMonth}/>
        <BarChart selectedMonth={selectedMonth}/>
    </div>
    );
}

export default TransactionTable