import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import PlantModal from './PlantModal';

const Plants = () => {
  const [plants, setPlants] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPlant, setEditingPlant] = useState(null);

  useEffect(() => { fetchPlants(); }, []);

  const fetchPlants = async () => {
    const res = await axios.get("http://localhost:5000/api/v1/plants/all");
    setPlants(res.data);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Delete this plant?")) {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:5000/api/v1/plants/${id}`, { headers: { Authorization: `Bearer ${token}` } });
      fetchPlants();
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-black">Manage Plants</h2>
        <button onClick={() => { setEditingPlant(null); setIsModalOpen(true); }} className="bg-green-600 text-white px-6 py-3 rounded-2xl font-bold hover:bg-green-700">+ Add New Plant</button>
      </div>

      <div className="bg-white rounded-[2rem] p-8 shadow-sm border">
        <table className="w-full text-left">
          <thead className="text-gray-400 text-xs uppercase"><tr><th className="pb-6">Name</th><th className="pb-6">Price</th><th className="pb-6">Stock</th><th className="pb-6 text-right">Actions</th></tr></thead>
          <tbody className="divide-y">
            {plants.map((p: any) => (
              <tr key={p._id} className="text-sm font-bold">
                <td className="py-6">{p.name}</td>
                <td className="py-6">LKR {p.price}</td>
                <td className="py-6">{p.stock}</td>
                <td className="py-6 text-right space-x-4">
                  <button onClick={() => { setEditingPlant(p); setIsModalOpen(true); }} className="text-blue-600">Edit</button>
                  <button onClick={() => handleDelete(p._id)} className="text-red-600">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <PlantModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} plant={editingPlant} onSave={fetchPlants} />
    </AdminLayout>
  );
};
export default Plants;