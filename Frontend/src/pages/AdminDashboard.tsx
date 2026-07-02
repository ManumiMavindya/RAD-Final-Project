import { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Package, Users, ShoppingCart, DollarSign } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';

const AdminDashboard = () => {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken'); 

    fetch('http://localhost:5000/api/v1/admin/stats', {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    .then(res => res.json())
    .then(data => {
      if(data.success) {
        setStats(data);
      } else {
        console.error("Failed to fetch admin stats");
      }
    });
  }, []);

  if (!stats) return <div className="p-10">Loading Admin Dashboard...</div>;

  const { cardStats, chartData } = stats;

  return (
    <AdminLayout> {/* 2. මුළු පිටුවම Layout එක ඇතුලට ගන්න */}
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatCard title="Revenue" value={`LKR ${cardStats.totalRevenue}`} icon={<DollarSign className="text-green-600"/>} />
          <StatCard title="Orders" value={cardStats.totalOrders} icon={<ShoppingCart className="text-blue-600"/>} />
          <StatCard title="Plants" value={cardStats.totalPlants} icon={<Package className="text-orange-600"/>} />
          <StatCard title="Users" value={cardStats.totalUsers} icon={<Users className="text-purple-600"/>} />
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <h3 className="text-lg font-bold mb-6">Monthly Revenue Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="revenue" fill="#16a34a" radius={[10, 10, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

const StatCard = ({ title, value, icon }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border flex items-center gap-4">
    <div className="p-3 bg-gray-50 rounded-xl">{icon}</div>
    <div>
      <p className="text-gray-500 text-sm">{title}</p>
      <h3 className="text-2xl font-black">{value}</h3>
    </div>
  </div>
);

export default AdminDashboard;