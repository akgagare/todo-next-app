"use client"

import React from 'react'
import { useState,useEffect } from 'react'

const page = ({params}) => {
      const { id } = params;
      console.log("id in edit page",id);
      const [formData,setFormData] = useState(null);

     useEffect(() => {
      const fetchTodo = async () => {
        const res = await fetch(`/api/todos/${id}`);
        if(res.ok){
          console.log("res",res);
        }
        else{
          console.log("no proper response ");
        }
        const data = await res.json();
        setFormData(data);
      };

      fetchTodo();
    }, [id]);

    if (!formData) return <p>Loading...</p>;

    const handleChange = (e) =>{
        e.preventDefault();
        const {name,value,type,checked} = e.target;
        setFormData((prev)=>({
            ...prev,
            [name]:type ==="checkbox" ?checked:value
        }));
    }

    const handleSubmit = async() =>{
        try{
                const res = await fetch(`/api/todos/${id}`,{
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(formData),
                });
                if(res.ok){
                    console.log("Edited");
                }
                else{
                    console.log("Error occured");
                }
        }
        catch(error){
            console.log("Error in handleSubmit",error);
        }
       
    }
  return (
    <div>
      <h1>Edit Todo.</h1>
       <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
            required
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="status"
            checked={formData.status}
            onChange={handleChange}
            className="h-4 w-4"
          />
          <label>Status (Completed)</label>
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Edit Todo
        </button>
      </form>
    </div>
  )
}

export default page
