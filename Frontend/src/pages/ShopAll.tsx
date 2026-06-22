import { useState } from "react"

const products = [

  { id: 1, name: "Monstera Deliciosa", price: "$45.00", img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=500", category: "Tropical" },

  { id: 2, name: "Snake Plant", price: "$28.00", img: "https://images.unsplash.com/photo-1593691509543-c5513636f04d?q=80&w=500", category: "Low Light" },

  { id: 3, name: "Peace Lily", price: "$32.00", img: "https://images.unsplash.com/photo-1599507973796-033100657519?q=80&w=500", category: "Air Purifier" },

  { id: 4, name: "Fiddle Leaf Fig", price: "$55.00", img: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=500", category: "Tropical" },

  { id: 5, name: "Calathea Orbifolia", price: "$38.00", img: "https://images.unsplash.com/photo-1618423771330-299a9a08466b?q=80&w=500", category: "Tropical" },

  { id: 6, name: "Aloe Vera", price: "$15.00", img: "https://images.unsplash.com/photo-1577740268578-831e345b533d?q=80&w=500", category: "Low Light" },

  { id: 7, name: "Spider Plant", price: "$18.00", img: "https://images.unsplash.com/photo-1611077755314-e593e32e8d26?q=80&w=500", category: "Air Purifier" },

  { id: 8, name: "ZZ Plant", price: "$40.00", img: "https://images.unsplash.com/photo-1634467828130-958867496515?q=80&w=500", category: "Low Light" },

  { id: 9, name: "Pothos Golden", price: "$22.00", img: "https://images.unsplash.com/photo-1596547605928-86877028d7a8?q=80&w=500", category: "Air Purifier" },

  { id: 10, name: "Rubber Plant", price: "$35.00", img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=500", category: "Tropical" },

  { id: 11, name: "Boston Fern", price: "$25.00", img: "https://images.unsplash.com/photo-1509423354148-132d43422022?q=80&w=500", category: "Air Purifier" },

  { id: 12, name: "Jade Plant", price: "$20.00", img: "https://images.unsplash.com/photo-1604762531720-0018d27511ba?q=80&w=500", category: "Low Light" },

  { id: 13, name: "English Ivy", price: "$19.00", img: "https://images.unsplash.com/photo-1612252446791-a8c4b75a1a64?q=80&w=500", category: "Air Purifier" },

  { id: 14, name: "Bird of Paradise", price: "$65.00", img: "https://images.unsplash.com/photo-1520699049058-7c0142b936d9?q=80&w=500", category: "Tropical" },

  { id: 15, name: "Dracaena Fragrans", price: "$30.00", img: "https://images.unsplash.com/photo-1594498652286-9a259c118742?q=80&w=500", category: "Low Light" },

  { id: 16, name: "African Violet", price: "$12.00", img: "https://images.unsplash.com/photo-1591122823675-a0c5c963665a?q=80&w=500", category: "Tropical" },

  { id: 17, name: "Philodendron Heartleaf", price: "$24.00", img: "https://images.unsplash.com/photo-1600411833119-21841364d935?q=80&w=500", category: "Low Light" },

  { id: 18, name: "Aglaonema Pink", price: "$42.00", img: "https://images.unsplash.com/photo-1628525805814-73891457199c?q=80&w=500", category: "Tropical" },

  { id: 19, name: "Areca Palm", price: "$50.00", img: "https://images.unsplash.com/photo-1604762531720-0018d27511ba?q=80&w=500", category: "Air Purifier" },

  { id: 20, name: "Chinese Money Plant", price: "$26.00", img: "https://images.unsplash.com/photo-1605371924599-2d0365da1ae0?q=80&w=500", category: "Tropical" },

  { id: 21, name: "Ponytail Palm", price: "$33.00", img: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=500", category: "Low Light" },

  { id: 22, name: "Parlor Palm", price: "$29.00", img: "https://images.unsplash.com/photo-1593691509543-c5513636f04d?q=80&w=500", category: "Low Light" },

  { id: 23, name: "String of Pearls", price: "$27.00", img: "https://images.unsplash.com/photo-1601604620177-3e147171d87e?q=80&w=500", category: "Tropical" },

  { id: 24, name: "Peace Lily Sensation", price: "$48.00", img: "https://images.unsplash.com/photo-1599507973796-033100657519?q=80&w=500", category: "Air Purifier" },

  { id: 25, name: "Anthurium", price: "$39.00", img: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=500", category: "Tropical" },

  { id: 26, name: "Bromeliad", price: "$31.00", img: "https://images.unsplash.com/photo-1618423771330-299a9a08466b?q=80&w=500", category: "Tropical" },

  { id: 27, name: "Cast Iron Plant", price: "$44.00", img: "https://images.unsplash.com/photo-1577740268578-831e345b533d?q=80&w=500", category: "Low Light" },

  { id: 28, name: "Yucca Cane", price: "$52.00", img: "https://images.unsplash.com/photo-1611077755314-e593e32e8d26?q=80&w=500", category: "Low Light" },

  { id: 29, name: "Prayer Plant", price: "$34.00", img: "https://images.unsplash.com/photo-1634467828130-958867496515?q=80&w=500", category: "Tropical" }

];

const ShopAll = () => {
  const [search, setSearch] = useState("")
  const [category, setCategory] = useState("All")
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // Filter & Search Logic
  const filtered = products.filter(p => {
    const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase())
    const matchesCategory = category === "All" || p.category === category
    return matchesSearch && matchesCategory
  })

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filtered.slice(indexOfFirstItem, indexOfLastItem)
  const totalPages = Math.ceil(filtered.length / itemsPerPage)

  return (
    <div className="min-h-screen bg-gray-50 pt-10 pb-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-black text-gray-900 mb-8">Shop All Plants</h1>
        
        {/* Search & Category Filter Section */}
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
            <div key={p.id} className="group bg-white p-4 rounded-3xl border border-gray-100 shadow-sm hover:shadow-2xl hover:shadow-green-100 transition-all duration-300 transform hover:-translate-y-2">
              <div className="relative overflow-hidden rounded-2xl">
                <img src={p.img} className="w-full h-64 object-cover group-hover:scale-105 transition duration-500" />
                <div className="absolute top-3 left-3 bg-white/80 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-bold text-green-700 uppercase">{p.category}</div>
              </div>
              <h3 className="font-bold text-lg mt-4 text-gray-800">{p.name}</h3>
              <p className="text-green-600 font-black text-xl mt-1">{p.price}</p>
              <button className="w-full mt-4 bg-gray-900 text-white py-2 rounded-xl font-bold hover:bg-green-600 transition">Add to Cart</button>
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
          <span className="font-black text-gray-600">Page {currentPage} / {totalPages}</span>
          <button 
            disabled={currentPage === totalPages}
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