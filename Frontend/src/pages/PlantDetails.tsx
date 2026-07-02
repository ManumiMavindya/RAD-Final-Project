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
  const [showChat, setShowChat] = useState(false);

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

  if (loading) return <div className="min-h-screen flex items-center justify-center font-bold text-lg">Loading...</div>;

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <div className="flex-grow py-16 px-6">
        <div className="max-w-6xl mx-auto">
          
          <div className="bg-white rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-neutral-100 flex flex-col md:flex-row gap-12">
            
            <div className="w-full md:w-5/12">
              <div className="relative rounded-[2rem] overflow-hidden h-[500px]">
                <img src={plant.imageURL} alt={plant.name} className="w-full h-full object-cover" />
                <div className="absolute top-6 left-6 bg-white/90 backdrop-blur px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest text-neutral-900">
                  {plant.category}
                </div>
              </div>
            </div>

            <div className="w-full md:w-7/12 flex flex-col justify-center">
              <h1 className="text-5xl md:text-6xl font-black text-neutral-900 tracking-tighter mb-4">{plant.name}</h1>
              <p className="text-3xl font-black text-green-600 mb-8">${plant.price}</p>
              
              <div className="space-y-4 mb-10">
                <h3 className="font-bold text-neutral-900">About the plant</h3>
                <p className="text-neutral-500 leading-relaxed text-lg">{plant.description}</p>
              </div>

              <div className="flex flex-wrap gap-4 mb-10">
                 <div className="bg-neutral-100 px-6 py-3 rounded-2xl font-bold text-sm text-neutral-700">Stock: {plant.stock} units</div>
                 <div className="bg-green-50 px-6 py-3 rounded-2xl font-bold text-sm text-green-700">Free Shipping</div>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={() => setShowModal(true)} 
                  className="w-full bg-neutral-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-green-600 transition-all duration-300"
                >
                  Place Order
                </button>
                
                <div className="grid grid-cols-2 gap-4">
                  <button 
                    onClick={() => setShowChat(true)}
                    className="w-full bg-white border-2 border-neutral-200 py-5 rounded-2xl font-bold hover:border-green-600 transition-all"
                  >
                    AI Assistant
                  </button>
                  <button 
                    onClick={() => navigate(-1)} 
                    className="w-full bg-white border-2 border-neutral-200 py-5 rounded-2xl font-bold hover:border-neutral-900 transition-all"
                  >
                    Back
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showChat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm p-4">
          <div className="bg-white p-4 rounded-[2rem] shadow-2xl w-full max-w-sm relative">
            <button onClick={() => setShowChat(false)} className="absolute top-6 right-6 font-black text-neutral-400">✕</button>
            <Chatbot config={config} actionProvider={ActionProvider} messageParser={MessageParser} />
          </div>
        </div>
      )}

      <Footer />
      {showModal && <OrderModal plant={plant} onClose={(updatedStock: any) => { if (updatedStock !== undefined) setPlant({ ...plant, stock: updatedStock }); setShowModal(false); }} />}
    </div>
  );
};

export default PlantDetails;