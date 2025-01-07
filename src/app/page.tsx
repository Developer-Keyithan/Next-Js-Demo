'use client'
import axios from "axios";
import { useState } from "react";

export default function Home() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    try {
      const response = await axios.post('api/users', {name, email})
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="max-w-lg mx-auto p-4  ">
      <h2 className="text-2xl font-bold mb-4">Create User</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter Name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Enter Email"
            required
          />
        </div>

        <button type="submit" className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md">Create User</button>
      </form>
    </div>
  );
}
