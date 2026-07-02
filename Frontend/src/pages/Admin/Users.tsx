import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => { fetchUsers(); }, []);

const fetchUsers = async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const res = await axios.get("http://localhost:5000/api/v1/auth/get-all-customers", {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      setUsers(res.data.data); 
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to remove this user?")) {
      const token = localStorage.getItem("accessToken");
      await axios.delete(`http://localhost:5000/api/v1/auth/delete-customer/${id}`, { 
        headers: { Authorization: `Bearer ${token}` } 
      });
      fetchUsers();
    }
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-black mb-8">Manage Users</h2>
      
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border">
        <table className="w-full text-left">
          <thead className="text-gray-400 text-xs uppercase">
            <tr><th className="pb-6">Name</th><th className="pb-6">Email</th><th className="pb-6">Role</th><th className="pb-6 text-right">Actions</th></tr>
          </thead>
          <tbody className="divide-y">
            {users.map((u: any) => (
              <tr key={u._id} className="text-sm font-bold">
                <td className="py-6">{u.name}</td>
                <td className="py-6">{u.email}</td>
                <td className="py-6">{u.roles}</td>
                <td className="py-6 text-right">
                  <button onClick={() => handleDelete(u._id)} className="text-red-600 hover:underline">Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default Users;