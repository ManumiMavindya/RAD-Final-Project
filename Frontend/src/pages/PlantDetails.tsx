import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import OrderModal from '../components/OrderModal';
import Footer from '../components/Footer';

import { Chatbot } from 'react-chatbot-kit';
import 'react-chatbot-kit/build/main.css';
import config from '../components/Chatbot/chatbotConfig';
import ActionProvider from '../components/Chatbot/ActionProvider';
import MessageParser from '../components/Chatbot/MessageParser';

const PlantDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plant, setPlant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [showChat, setShowChat] = useState(false); // Chat popup state

  useEffect(() => {
    const fetchPlant = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/v1/plants/${id}`);
        const result = await response.json();
        setPlant(result.data || result);
      } catch (error) {
        console.error("Error fetching plant:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlant();
  }, [id]);

  if (loading) return <div className="min-h-screen flex items-center justify-center font-black text-2xl">Loading...</div>;
  if (!plant) return <div className="min-h-screen flex items-center justify-center font-black text-2xl text-red-500">Plant not found!</div>;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="flex-grow py-12 px-6">
        <div className="max-w-6xl mx-auto bg-white p-8 md:p-12 rounded-[2rem] shadow-xl shadow-green-50/50 border border-gray-100 flex flex-col md:flex-row gap-12">
          
          <div className="w-full md:w-1/2 group relative overflow-hidden rounded-[2rem]">
            <img src={plant.imageURL} alt={plant.name} className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-110" />
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-4 py-2 rounded-full font-bold text-green-700 text-sm shadow-sm">
              {plant.category}
            </div>
          </div>
          
          <div className="w-full md:w-1/2 flex flex-col justify-center">
            <div className="mb-6">
              <h1 className="text-5xl font-extrabold text-gray-900 tracking-tight">{plant.name}</h1>
              <p className="text-4xl text-green-600 font-black mt-2">${plant.price}</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="font-bold text-gray-900">About this plant</h3>
              <p className="text-gray-600 leading-relaxed text-lg">{plant.description}</p>
            </div>

            <div className="flex items-center gap-4 mt-6 text-sm font-semibold text-gray-500">
              <span className="bg-green-50 text-green-700 px-4 py-2 rounded-full">Stock: {plant.stock} units</span>
              <span className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full">Free Shipping</span>
            </div>

            {/* AI Chat Button */}
            <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-100 rounded-3xl">
              <h3 className="font-black text-green-900 text-lg flex items-center gap-2">
                <span className="text-2xl">🤖</span> AI Plant Assistant
              </h3>
              <p className="text-sm text-green-800/80 mt-1">Get instant care advice for your {plant.name}.</p>
              <button 
                onClick={() => setShowChat(true)} // Open chat popup
                className="mt-4 bg-green-600 text-white w-full py-3 rounded-xl font-bold hover:bg-green-700 transition shadow-lg shadow-green-200"
              >
                Chat with AI
              </button>
            </div>

            <div className="mt-8 flex gap-4">
              <button onClick={() => setShowModal(true)} className="flex-1 bg-gray-900 text-white py-4 rounded-2xl font-black text-lg hover:bg-green-600 transition shadow-xl">Place Order</button>
              <button onClick={() => navigate(-1)} className="px-6 py-4 rounded-2xl border-2 border-gray-200 font-bold hover:bg-gray-50 transition">Back</button>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Popup Modal */}
      {showChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white p-6 rounded-[2rem] shadow-2xl w-full max-w-md relative animate-in fade-in zoom-in duration-300">
            <button 
              onClick={() => setShowChat(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 font-bold text-xl"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4 text-gray-800">Chat with GreenBuddy</h2>
            <Chatbot 
              config={config} 
              actionProvider={ActionProvider} 
              messageParser={MessageParser} 
            />
          </div>
        </div>
      )}

      <Footer />
      {showModal && <OrderModal plant={plant} onClose={(updatedStock) => { if (updatedStock !== undefined) setPlant({ ...plant, stock: updatedStock }); setShowModal(false); }} />}
    </div>
  );
};

export default PlantDetails;