import { useEffect, useState } from 'react';
import axios from 'axios';
import AdminLayout from '../../components/AdminLayout';
import OrderModal from '../../components/OrderModal'; 

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    const token = localStorage.getItem("accessToken");
    const res = await axios.get("http://localhost:5000/api/v1/orders/", {
      headers: { Authorization: `Bearer ${token}` }
    });
    setOrders(res.data.data);
  };

  return (
    <AdminLayout>
      <h2 className="text-3xl font-black mb-8">Manage Orders</h2>
      <div className="bg-white rounded-[2rem] p-8 shadow-sm border">
        <table className="w-full text-left">
          <thead className="text-gray-400 text-xs uppercase">
            <tr><th className="pb-6">User</th><th className="pb-6">Total</th><th className="pb-6">Status</th><th className="pb-6 text-right">Action</th></tr>
          </thead>
          <tbody className="divide-y">
            {orders.map((o: any) => (
              <tr key={o._id} className="text-sm font-bold">
                <td className="py-6">{o.user?.name}</td>
                <td className="py-6">LKR {o.totalPrice}</td>
                <td className="py-6"><span className="bg-gray-100 px-3 py-1 rounded-full">{o.status}</span></td>
                <td className="py-6 text-right">
                  <button onClick={() => setSelectedOrder(o)} className="text-green-600 hover:underline">View/Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {selectedOrder && (
        <OrderModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
          onUpdate={fetchOrders} 
        />
      )}
    </AdminLayout>
  );
};
export default Orders;