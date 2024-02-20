import React from 'react'
import TransactionTable from './TransactionTable'

const HomePage = () => {
    return (
    <div className='flex justify-center '>
        <div className='w-[80vw]'>
        <TransactionTable/>
        </div>
    </div>
    )
}

export default HomePage