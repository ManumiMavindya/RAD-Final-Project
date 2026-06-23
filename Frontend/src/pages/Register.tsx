import React, { useState } from 'react';
import { registerUser } from '../service/authService';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await registerUser(formData);
      alert("Registration Successful!");
      navigate("/login");
    } catch (err) {
      alert("Registration failed!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-black mb-6">Create Account</h2>
        <input className="w-full p-4 mb-4 border rounded-xl" placeholder="Name" onChange={(e) => setFormData({...formData, name: e.target.value})} required />
        <input className="w-full p-4 mb-4 border rounded-xl" placeholder="Email" type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
        <input className="w-full p-4 mb-6 border rounded-xl" placeholder="Password" type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
        <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700 transition">Register</button>
      </form>
    </div>
  );
};
export default Register;