import React, { useState } from 'react';
import { registerUser } from '../service/authService';

const Register = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false); 

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 
    try {
      await registerUser(formData);
      alert("Registration Successful! Now you can login.");
      onClose();
    } catch (err) {
      console.error(err);
      alert("Registration failed! Please try again.");
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm">
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.1)] relative animate-in zoom-in-95 duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 text-neutral-400 hover:text-black transition">✕</button>
        
        <h2 className="text-3xl font-black mb-2 tracking-tight">Register</h2>
        <p className="text-neutral-500 text-sm mb-8">Create your GreenMart account today.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input 
            className="w-full p-4 rounded-2xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-green-500 transition" 
            placeholder="Full Name" 
            onChange={(e) => setFormData({...formData, name: e.target.value})} 
            required 
          />
          <input 
            className="w-full p-4 rounded-2xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-green-500 transition" 
            placeholder="Email" 
            type="email" 
            onChange={(e) => setFormData({...formData, email: e.target.value})} 
            required 
          />
          <input 
            className="w-full p-4 rounded-2xl bg-neutral-50 border-none outline-none focus:ring-2 focus:ring-green-500 transition" 
            placeholder="Password" 
            type="password" 
            onChange={(e) => setFormData({...formData, password: e.target.value})} 
            required 
          />
          
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-green-600 text-white py-4 rounded-2xl font-bold mt-2 hover:scale-[0.99] transition-all disabled:opacity-50"
          >
            {loading ? "Processing..." : "Create Account"}
          </button>
        </form>
      </div>
    </div>
  );
};
export default Register;