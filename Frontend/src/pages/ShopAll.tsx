import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';

const ShopAll = () => {
  const navigate = useNavigate();
  
  // දත්ත store කරන්න state එකක් හදාගන්නවා
  const [plants, setPlants] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  // Backend එකෙන් දත්ත Fetch කරනවා
  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/plants/all");
        const data = await response.json();
        setPlants(data); // දත්ත ටික මෙතනට දාගන්නවා
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };
    fetchPlants();
  }, []);

  // Filter & Search Logic
  const filtered = plants.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-8">Shop All Plants</h1>
        
        {/* Search & Category Filter Section - මෙතනමයි */}
        <div className="flex flex-col md:flex-row gap-4 mb-10">
          <input 
            type="text" 
            placeholder="Search plants by name..." 
            className="w-full p-4 rounded-2xl border border-gray-200 shadow-sm outline-green-500"
            onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
          />
          <select 
            className="p-4 rounded-2xl border border-gray-200 bg-white shadow-sm font-bold text-gray-700 outline-green-500 cursor-pointer"
            onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
          >
            <option value="All">All Categories</option>
            <option value="Tropical">Tropical</option>
            <option value="Low Light">Low Light</option>
            <option value="Air Purifier">Air Purifier</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {currentItems.map((p) => (
            <div key={p._id} className="group bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-green-100 transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative overflow-hidden rounded-2xl">
                {/* මචං, Backend එකෙන් එන imageURL එක පාවිච්චි කරන්න */}
                <img src={p.imageURL} className="w-full h-64 object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-green-700 uppercase">{p.category}</div>
              </div>
              <h3 className="font-bold text-lg mt-4 text-gray-800">{p.name}</h3>
              <p className="text-green-600 font-black text-xl mt-1">${p.price}</p>
              <button 
                 onClick={() => navigate(`/plant/${p._id}`)} 
                 className="w-full mt-4 bg-gray-900 text-white py-2 rounded-xl font-bold hover:bg-green-600 transition"
              >
                 View Details
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-6 mt-12">
          <button 
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(prev => prev - 1)}
            className="px-6 py-2 bg-green-600 text-white font-bold rounded-xl disabled:bg-gray-300 hover:bg-green-700 transition"
          >
            Previous
          </button>
          <span className="font-black text-gray-600">Page {currentPage} / {totalPages || 1}</span>
          <button 
            disabled={currentPage === totalPages || totalPages === 0}
            onClick={() => setCurrentPage(prev => prev + 1)}
            className="px-6 py-2 bg-green-600 text-white font-bold rounded-xl disabled:bg-gray-300 hover:bg-green-700 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default ShopAll