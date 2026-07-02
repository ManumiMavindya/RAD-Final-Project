import React, { useState } from 'react';
import { loginUser } from '../service/authService';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useAuth();

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await loginUser(formData);
      const userData = response.data;
      localStorage.setItem("accessToken", userData.accessToken);
      localStorage.setItem("userRole", userData.roles[0]);
      setUser(userData);
      onClose();
      if (userData.roles.includes("ADMIN")) navigate("/admin/dashboard");
      else navigate("/");
    } catch (err) {
      alert("Invalid Credentials!");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-sm relative">
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-black font-bold">✕</button>
        <h2 className="text-2xl font-black mb-6">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500" placeholder="Email" type="email" onChange={(e) => setFormData({...formData, email: e.target.value})} required />
          <input className="w-full p-4 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-green-500" placeholder="Password" type="password" onChange={(e) => setFormData({...formData, password: e.target.value})} required />
          <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition">Login</button>
        </form>
      </div>
    </div>
  );
};
export default Login;