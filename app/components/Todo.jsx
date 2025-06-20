import React, { useEffect, useState } from 'react'

const Todo = ({title,description,status}) => {
    const [taskStatus, setTaskStatus] = useState(status); // ✅ no conflict
    const handleStatus = () =>{
        setTaskStatus(!taskStatus);
    }
    
    
  return (
    <div className='flex items-center justify-between gap-1 mt-3 px-4'>
        <div className='flex-col'>
            <div className='flex gap-2'>
                <h1 className='text-2xl'>Title</h1>
                <h2 className='flex text-blue-500 text-2xl'>{title}</h2>
            </div>
            
            <div className='flex items-center gap-3'>
                <h1 className="text-2xl">Description</h1>
                <h2 className='text-gray-400 align-center justify-center text-4xl'>{description}</h2>
            </div>
        </div>
        <div className='flex gap-2'>

        
        {
            taskStatus === true ? (<button className='flex h-8 w-28 bg-green-500 items-center justify-center rounded-md' onClick={handleStatus}>Completed</button>):
            (<button className='flex h-8 w-28 bg-red-500 items-center justify-center rounded-md' onClick={handleStatus}>Incomplete</button>)
        }
        
        </div>
    </div>
  )
}

export default Todo
