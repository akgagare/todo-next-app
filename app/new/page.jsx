"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
const AddTodoPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked} = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(formData)
    });

    const data = await res.json();
    console.log("Added:", data);
    toast.success("Todo added successfully.")

    // Optional: reset form
    setFormData({ title: "", description: "", status: false });
    router.push("/");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 border rounded-md shadow">
      <h1 className="text-2xl font-bold mb-4">Add New Todo</h1>
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
          Add Todo
        </button>
      </form>
    </div>
  );
};

export default AddTodoPage;
