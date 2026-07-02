import { useState } from 'react';
import { placeOrder } from '../service/orderService';

const OrderModal = ({ plant, onClose }: { plant: any, onClose: (updatedStock?: number) => void }) => {
  const [formData, setFormData] = useState({ customerName: "", shippingAddress: "", phone: "" });
  const [quantity, setQuantity] = useState(1);

  const submitOrder = async () => {
    try {
      await placeOrder({ ...formData, items: [{ plantId: plant._id, name: plant.name, quantity, price: plant.price }], totalAmount: plant.price * quantity });
      alert("Order Placed Successfully!");
      onClose(plant.stock - quantity); 
    } catch (err) { alert("Failed to place order."); }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-[2rem] w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-300">

        <div className="bg-green-600 p-6 text-white">
          <h2 className="text-2xl font-black">Checkout</h2>
          <p className="text-green-100 text-sm">Complete your order for {plant.name}</p>
        </div>

        <div className="p-8 space-y-5">

          <div className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border">
            <span className="font-bold text-gray-700">Quantity</span>
            <div className="flex items-center gap-4">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="w-8 h-8 rounded-full bg-white border shadow-sm font-bold hover:bg-gray-100">-</button>
              <span className="font-black text-lg w-8 text-center">{quantity}</span>
              <button onClick={() => setQuantity(q => Math.min(plant.stock, q + 1))} className="w-8 h-8 rounded-full bg-white border shadow-sm font-bold hover:bg-gray-100">+</button>
            </div>
          </div>

          <input className="w-full bg-gray-50 p-4 rounded-2xl border focus:ring-2 focus:ring-green-500 outline-none" 
                 placeholder="Full Name" onChange={e => setFormData({...formData, customerName: e.target.value})} />
          
          <input className="w-full bg-gray-50 p-4 rounded-2xl border focus:ring-2 focus:ring-green-500 outline-none" 
                 placeholder="Shipping Address" onChange={e => setFormData({...formData, shippingAddress: e.target.value})} />
          
          <input className="w-full bg-gray-50 p-4 rounded-2xl border focus:ring-2 focus:ring-green-500 outline-none" 
                 placeholder="Phone Number" onChange={e => setFormData({...formData, phone: e.target.value})} />

          <div className="flex justify-between items-center border-t pt-4">
            <span className="font-bold text-gray-700">Total Payable</span>
            <span className="text-2xl font-black text-green-600">LKR {plant.price * quantity}.00</span>
          </div>
        </div>

        <div className="p-8 pt-0 flex gap-3">
          <button onClick={onClose} className="flex-1 py-4 rounded-2xl font-bold text-gray-600 hover:bg-gray-100 transition">Cancel</button>
          <button onClick={submitOrder} className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-bold hover:bg-green-600 transition shadow-lg">Confirm Order</button>
        </div>
      </div>
    </div>
  );
};
export default OrderModal;