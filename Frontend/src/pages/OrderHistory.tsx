import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { getMyOrders, downloadOrderInvoice } from '../service/orderService';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); 

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

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold">Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 font-sans">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-black mb-8 text-gray-900 flex items-center gap-3">
          My Orders <span className="text-green-600">🌿</span>
        </h1>
        
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-gray-100 shadow-sm">
              <div className="text-6xl mb-4">🌿</div>
              <h3 className="text-xl font-black text-gray-900 mb-2">No orders yet</h3>
              <p className="text-gray-500 font-medium">Looks like you haven't placed any orders.</p>
              <button 
                onClick={() => navigate('/shop')}
                className="mt-6 px-8 py-3 bg-green-600 text-white font-bold rounded-full hover:bg-green-700 transition"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            orders.map((order: any) => (
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
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderHistory;