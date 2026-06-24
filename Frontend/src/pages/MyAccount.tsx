import { useEffect, useState } from 'react';
import { getMyOrders, downloadOrderInvoice } from '../service/orderService';
import axios from 'axios';

const MyAccount = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { fetchOrders(); }, []);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();
      setOrders(res.data.data);
    } catch (err) { console.error(err); }
    finally { setLoading(false); }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to cancel this order?")) {
      try {
        await axios.put(`http://localhost:5000/api/v1/orders/cancel/${id}`, {}, {
          headers: { Authorization: `Bearer ${JSON.parse(localStorage.getItem("user") || "{}").accessToken}` }
        });
        fetchOrders();
      } catch (err) { alert("Failed to cancel order"); }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black mb-6 text-gray-900 flex items-center gap-3">
          My Orders <span className="text-green-600">🌿</span>
        </h1>
        
        <div className="space-y-4">
          {orders.map((order: any) => (
            // Hover Effect එක මෙතන තියෙන්නේ (hover:-translate-y-1 hover:shadow-xl)
            <div key={order._id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
              
              <div className="flex justify-between items-center mb-4">
                <div>
                  <p className="text-[10px] font-black text-green-600 uppercase tracking-widest">Invoice</p>
                  <p className="text-md font-black text-gray-800">{order.invoiceNumber}</p>
                </div>
                <div className={`px-4 py-1 rounded-xl font-black text-[11px] ${order.status === 'Pending' ? 'bg-yellow-100 text-yellow-700' : 'bg-green-100 text-green-700'}`}>
                  {order.status}
                </div>
              </div>

              {/* Items & Shipping Details */}
              <div className="bg-gray-50 rounded-xl p-4 mb-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Items</p>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm">
                    {order.items.map((item: any, i: number) => (
                      <span key={i} className="font-bold text-gray-700">{item.name} <span className="text-green-600 font-black">x{item.quantity}</span></span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-[10px] font-black text-gray-400 uppercase mb-1">Delivery Details</p>
                  <p className="text-sm font-semibold text-gray-700 truncate">{order.shippingAddress}</p>
                  <p className="text-sm font-black text-gray-600">{order.phone}</p>
                </div>
              </div>

              <div className="flex justify-between items-center mb-4">
                <p className="text-xs font-bold text-gray-500">Total Amount</p>
                <p className="text-2xl font-black text-green-600">LKR {order.totalAmount}.00</p>
              </div>

              <div className="flex gap-3">
                <button onClick={() => downloadOrderInvoice(order._id)} className="flex-1 bg-gray-900 text-white py-3 rounded-xl font-black text-xs hover:bg-gray-800 transition active:scale-95">Download PDF</button>
                {order.status === 'Pending' && (
                  <>
                    <button className="flex-1 bg-blue-50 text-blue-600 py-3 rounded-xl font-black text-xs hover:bg-blue-100 transition active:scale-95">Edit</button>
                    <button onClick={() => handleDelete(order._id)} className="flex-1 bg-red-50 text-red-600 py-3 rounded-xl font-black text-xs hover:bg-red-100 transition active:scale-95">Cancel</button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyAccount;