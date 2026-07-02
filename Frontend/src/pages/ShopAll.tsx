import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import Footer from "../components/Footer" 

const ShopAll = () => {
  const navigate = useNavigate();
  const [plants, setPlants] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/plants/all");
        const data = await response.json();
        setPlants(data); 
      } catch (error) {
        console.error("Error fetching plants:", error);
      }
    };
    fetchPlants();
  }, []);

  const filtered = plants.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || p.category === category;
    return matchesSearch && matchesCategory;
  });

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <div className="flex-grow py-16 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <h1 className="text-5xl md:text-6xl font-black text-neutral-900 mb-4 tracking-tight">Botanical Collection</h1>
            <p className="text-neutral-500 text-lg">Curated plants, delivered to your doorstep.</p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 mb-12 max-w-2xl mx-auto">
            <input 
              type="text" 
              placeholder="Search your plant..." 
              className="w-full p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm focus:ring-2 focus:ring-green-500 outline-none transition-all"
              onChange={(e) => { setSearch(e.target.value); setCurrentPage(1); }}
            />
            <select 
              className="p-4 rounded-2xl bg-white border border-neutral-200 shadow-sm font-semibold text-neutral-700 focus:ring-2 focus:ring-green-500 outline-none cursor-pointer"
              onChange={(e) => { setCategory(e.target.value); setCurrentPage(1); }}
            >
              <option value="All">All Categories</option>
              <option value="Tropical">Tropical</option>
              <option value="Low Light">Low Light</option>
              <option value="Air Purifier">Air Purifier</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentItems.map((p) => (
              <div key={p._id} className="group bg-white p-3 rounded-[2rem] border border-neutral-100 shadow-sm hover:shadow-xl hover:shadow-green-100/50 transition-all duration-500">
                <div className="relative overflow-hidden rounded-[1.5rem] h-80">
                  <img src={p.imageURL} className="w-full h-full object-cover group-hover:scale-105 transition duration-700 ease-out" alt={p.name} />
                  <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-wider">{p.category}</div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-bold text-xl text-neutral-900">{p.name}</h3>
                  <p className="text-green-700 font-black text-lg mt-1 mb-6">${p.price}</p>
                  <button 
                     onClick={() => navigate(`/plant/${p._id}`)} 
                     className="w-full bg-neutral-900 text-white py-3.5 rounded-xl font-bold hover:bg-green-600 transition-all duration-300 active:scale-[0.98]"
                  >
                     View Details
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-4 mt-20">
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="px-6 py-3 bg-white border border-neutral-200 font-bold rounded-xl disabled:opacity-50 hover:bg-neutral-100 transition"
            >
              Previous
            </button>
            <span className="font-black text-neutral-500 text-sm">Page {currentPage} / {totalPages || 1}</span>
            <button 
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="px-6 py-3 bg-neutral-900 text-white font-bold rounded-xl disabled:bg-neutral-300 hover:bg-green-600 transition"
            >
              Next
            </button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  )
}

export default ShopAll