import React, { useState } from 'react';
import { loginUser } from '../service/authService'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { setUser } = useAuth();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const response = await loginUser(formData); 
    const userData = response.data; 

    localStorage.setItem("accessToken", userData.accessToken);
    localStorage.setItem("refreshToken", userData.refreshToken);
    localStorage.setItem("userRole", userData.roles[0]);

    setUser(userData); 

    alert("Login Successful! Welcome back.");

    if (userData.roles.includes("ADMIN")) {
      navigate("/admin/dashboard");
    } else {
      navigate("/");
    }

  } catch (err) {
    console.error("Login Error:", err);
    alert("Invalid Credentials! Please try again.");
  }
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <form onSubmit={handleSubmit} className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-md border border-gray-100">
        <h2 className="text-3xl font-black mb-6 text-gray-900">Welcome Back</h2>
        
        <input 
          className="w-full p-4 mb-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" 
          placeholder="Email" 
          type="email" 
          onChange={(e) => setFormData({...formData, email: e.target.value})} 
          required 
        />
        
        <input 
          className="w-full p-4 mb-6 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500" 
          placeholder="Password" 
          type="password" 
          onChange={(e) => setFormData({...formData, password: e.target.value})} 
          required 
        />
        
        <button 
          type="submit" 
          className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold hover:bg-green-600 transition shadow-lg"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;