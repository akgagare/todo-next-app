"use client"

import React, { useState, useEffect } from 'react';
import { useParams,useRouter } from 'next/navigation';
import toast from 'react-hot-toast';


const Page = () => {
  const { id } = useParams(); 
  const [formData, setFormData] = useState(null);
  const router = useRouter(); 

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await fetch(`/api/todos/${id}`); 
        if (res.ok) {
          const data = await res.json();
          setFormData(data);
        } else {
          console.log("No proper response");
        }
      } catch (err) {
        console.log("Error fetching todo", err);
      }
    };

    if (id) fetchTodo(); // ✅ Ensure id is defined before fetching
  }, [id]);

  if (!formData) return <p>Loading...</p>;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ Needed to prevent page reload
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Todo Updated Successfully");
        router.push("/");
        console.log("Edited");
      } else {
        toast.error("Failed to update");
        console.log("Error occurred");
      }
    } catch (error) {
      toast.error("Error occurred in updating todo.");
      console.log("Error in handleSubmit", error);
    }
  };

  return (
    <div>
      <h1>Edit Todo</h1>
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
  );
};

export default Page;
