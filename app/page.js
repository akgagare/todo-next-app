"use client"
import Image from "next/image";
import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Todo from "./components/Todo";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter(); 
  const [todos,setTodo] = useState([
    {
      title:"Complete kirat React",
      description:"Project today itself",
      status:true,
    },
    {
      title:"Pratice Communitcation",
      description:"Do more great things upskill a lot ",
      status:true,
    },
    {
      title:"Sit on chair for 2 hr",
      description:"Focus and win the TAGIC award",
      status:true,
    }
  ]);
  const getAllTodo = async() =>{
    const res = await fetch("/api/todos");
    const data = await res.json();
    setTodo(data);
    console.log("Data via get req", data);
  }
  useEffect(()=>{
    getAllTodo();
  },[]);

  const handleDelete = async (_id) => {
  try {
    const res = await fetch(`/api/todos/${_id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      // re-fetch todos after successful deletion
      getAllTodo(); // ✅ this updates the UI
    } else {
      console.error("Failed to delete todo");
    }
  } catch (err) {
    console.error("Error while deleting:", err);
  }
};
const EditTodo = (id) => {
  try{
    const res = fetch(`/api/todos/${id}`);
    if(res.ok){
      console.log("Successfully edited");
    }
  }
  catch(error){
    console.log("Error in edit",error);
  }
}
  
  const goToAddTodo = () => {
    router.push("/new"); // redirects to localhost:3000/new
  };
  const editFunction = (id) =>{
    router.push(`/edit/${id}`);
  }
  return (
    <div>
      <Navbar/>
      {
        todos.map((todo,index)=>{
          return <div className="mb-3" key={index}>
                  <Todo title={todo.title} description={todo.description} status={todo.status}/>
                  <button className='flex h-8 w-28 bg-red-800 items-center justify-center rounded-md' onClick={()=>{handleDelete(todo._id)}}>Delete Todo</button>
                  <button className='flex h-8 w-28 bg-yellow-800 items-center justify-center rounded-md' onClick={()=>editFunction(todo._id)}>Edit Todo</button>
                  <div className="border-1 mt-0.5"></div>
            </div>
        })
      }
      {/* <AddTodo todos={todos}/> */}
      <button  onClick={goToAddTodo} className="h-12 w-30 bg-black text-white rounded-md ml-3">Add Todo</button>
      
    </div>
  );
}
