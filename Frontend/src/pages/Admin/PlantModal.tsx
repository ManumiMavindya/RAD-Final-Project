import { useState, useEffect } from "react";
import axios from "axios";

const PlantModal = ({ isOpen, onClose, plant, onSave }: any) => {
  const [formData, setFormData] = useState({ name: "", category: "", price: "", stock: "", imageURL: "", description: "" });

  useEffect(() => {
    if (plant) setFormData(plant);
    else setFormData({ name: "", category: "", price: "", stock: "", imageURL: "", description: "" });
  }, [plant]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    const config = { headers: { Authorization: `Bearer ${token}` } };

    if (plant) await axios.put(`http://localhost:5000/api/v1/plants/${plant._id}`, formData, config);
    else await axios.post("http://localhost:5000/api/v1/plants/save", formData, config);
    
    onSave();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white p-8 rounded-[2rem] w-full max-w-lg shadow-2xl relative">
        <h2 className="text-2xl font-black mb-6">{plant ? "Edit Plant" : "Add New Plant"}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input className="w-full p-4 bg-gray-50 rounded-xl outline-none" placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
          <div className="grid grid-cols-2 gap-4">
            <input className="p-4 bg-gray-50 rounded-xl outline-none" placeholder="Price" type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} required />
            <input className="p-4 bg-gray-50 rounded-xl outline-none" placeholder="Stock" type="number" value={formData.stock} onChange={e => setFormData({...formData, stock: e.target.value})} required />
          </div>
          <input className="w-full p-4 bg-gray-50 rounded-xl outline-none" placeholder="Image URL" value={formData.imageURL} onChange={e => setFormData({...formData, imageURL: e.target.value})} required />
          <textarea className="w-full p-4 bg-gray-50 rounded-xl outline-none" placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} required />
          <button className="w-full bg-green-600 text-white py-4 rounded-xl font-bold hover:bg-green-700">Save Plant</button>
        </form>
      </div>
    </div>
  );
};
export default PlantModal;