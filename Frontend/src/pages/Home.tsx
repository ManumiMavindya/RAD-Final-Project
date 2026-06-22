import { useState } from "react"
import Footer from "../components/Footer"

const Home = () => {
  const [categories] = useState([
    { name: "Indoor Jungle", tag: "Indoor Jungle", img: "https://images.unsplash.com/photo-1545241047-6083a3684587?q=80&w=500" },
    { name: "Pet-Friendly", tag: "Pet-Friendly", img: "https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?q=80&w=500" },
    { name: "Gifts", tag: "Gifts", img: "https://images.unsplash.com/photo-1549490349-8643362247b5?q=80&w=500" },
    { name: "New Arrivals", tag: "New Arrivals", img: "https://images.unsplash.com/photo-1463936575829-25148e1db1b8?q=80&w=500" }
  ])

  const [guides] = useState([
    {
      title: "Watering 101: The Golden Rules",
      difficulty: "Beginner",
      time: "5 min read",
      desc: "Learn how to avoid overwatering and check soil moisture like a pro to keep your root systems healthy.",
      icon: "💧",
      bgBorder: "hover:border-blue-300",
      tagColor: "bg-blue-100 text-blue-800"
    },
    {
      title: "Mastering Sunlight & Placement",
      difficulty: "Intermediate",
      time: "8 min read",
      desc: "Bright indirect light vs. low light? Find the perfect spot in your home for your indoor plants.",
      icon: "☀️",
      bgBorder: "hover:border-amber-300",
      tagColor: "bg-amber-100 text-amber-800"
    },
    {
      title: "The Ultimate Guide to Repotting",
      difficulty: "Advanced",
      time: "12 min read",
      desc: "Step-by-step instructions on choosing the right soil mix and minimizing root shock during transit.",
      icon: "🪴",
      bgBorder: "hover:border-emerald-300",
      tagColor: "bg-emerald-100 text-emerald-800"
    }
  ])

  return (
    /* 🎨 මුළු පේජ් එකේම බැක්ග්‍රවුන්ඩ් එක තද කොළ සහ ලා කොළ කලවම් වුණු Vibrant Gradient එකක් කලා */
    <div className="relative min-h-screen bg-linear-to-b from-green-100 via-emerald-100/70 to-green-50 overflow-hidden">
      
      {/* 🔮 BACKGROUND SHAPES & COLORS (සුදු පාට කැපෙන්න දාපු තද කලර් ශේප්ස් ටික) */}
      {/* වම් පැත්තේ තද Emerald රවුම */}
      <div className="absolute top-12 -left-20 w-96 h-96 bg-emerald-400/40 rounded-full blur-2xl pointer-events-none"></div>
      {/* දකුණු පැත්තේ මැදට වෙන්න තද කොළ පාට හැඩතලයක් */}
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-green-500/25 rounded-full blur-3xl pointer-events-none"></div>
      {/* පේජ් එකේ යට හරියට වෙන්න තවත් කැපී පෙනෙන ලස්සන කලර් බ්ලොක් එකක් */}
      <div className="absolute bottom-20 -left-20 w-[600px] h-[600px] bg-emerald-300/30 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/3 left-1/3 w-80 h-80 bg-lime-300/20 rounded-full blur-2xl pointer-events-none"></div>

      {/* 📦 CONTENT CONTAINER */}
      <div className="max-w-6xl mx-auto px-4 py-10 space-y-28 relative z-10">
        
        {/* =========================================================
            🌟 1️⃣ HERO SECTION (Glassmorphism Look එකක් දුන්නා බැක්ග්‍රවුන්ඩ් එක කැපෙන්න)
           ========================================================= */}
        <div className="relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-md p-8 md:p-16 flex flex-col md:flex-row items-center justify-between border border-white/60 shadow-lg">
          <div className="absolute top-0 right-0 w-72 h-72 bg-green-300/30 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-emerald-300/30 rounded-full blur-3xl pointer-events-none"></div>

          <div className="space-y-6 md:w-1/2 z-10 text-center md:text-left">
            <span className="inline-block bg-green-200 text-green-900 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full shadow-xs">
              🌿 Welcome to GreenMart
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight">
              Vibrant Plants, <br /> 
              <span className="text-green-700 bg-linear-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                Thoughtfully
              </span> Delivered
            </h1>
            <p className="text-gray-700 text-base md:text-lg max-w-md font-medium">
              Bring nature into your living space with our handpicked, premium quality indoor plants.
            </p>
            <div className="pt-2">
              <button className="bg-green-600 text-white font-bold px-8 py-4 rounded-xl shadow-lg shadow-green-600/30 hover:bg-green-700 hover:shadow-xl hover:shadow-green-700/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer">
                Shop Now ➔
              </button>
            </div>
          </div>
          
          <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center z-10">
            <div className="relative group">
              <div className="absolute inset-0 bg-green-900/20 rounded-full blur-2xl transform scale-90 translate-y-4"></div>
              <img 
                src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=600" 
                alt="Monstera Plant" 
                className="w-80 h-80 md:w-96 md:h-96 object-cover rounded-2xl drop-shadow-2xl group-hover:scale-102 transition duration-500"
              />
            </div>
          </div>
        </div>

        {/* =========================================================
            🌿 2️⃣ CATEGORIES SECTION 
           ========================================================= */}
        <div className="space-y-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Explore Categories</h2>
            <p className="text-gray-700 text-sm font-medium">Find the perfect plant for your space</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {categories.map((cat, index) => (
              <div 
                key={index} 
                className="relative rounded-2xl overflow-hidden h-64 border border-white/40 cursor-pointer shadow-md transform hover:-translate-y-1 hover:shadow-xl hover:shadow-green-600/20 hover:border-green-400 transition-all duration-300 ease-out group bg-white"
              >
                <img 
                  src={cat.img} 
                  alt={cat.name} 
                  className="w-full h-full object-cover transform scale-100 group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
                
                <div className="absolute bottom-6 left-6 space-y-2">
                  <span className="bg-green-600 text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md">
                    {cat.tag}
                  </span>
                  <h3 className="text-white text-2xl font-bold tracking-tight group-hover:text-green-200 transition-colors duration-300">
                    {cat.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            📚 3️⃣ CARE GUIDES SECTION 
           ========================================================= */}
        <div id="care-guides" className="space-y-6 scroll-mt-24">
          <div className="text-center md:text-left">
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Plant Care Guides</h2>
            <p className="text-gray-700 text-sm font-medium">Expert tips to keep your green friends thriving</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {guides.map((guide, index) => (
              <div 
                key={index}
                className={`bg-white/80 backdrop-blur-md rounded-3xl p-6 border border-white/50 shadow-md cursor-pointer transform hover:-translate-y-1.5 hover:shadow-xl transition-all duration-300 flex flex-col justify-between group ${guide.bgBorder}`}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-green-100/50 border border-green-200/50 flex items-center justify-center text-2xl group-hover:scale-110 transition-transform duration-300">
                    {guide.icon}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${guide.tagColor}`}>
                      {guide.difficulty}
                    </span>
                    <span className="text-xs text-gray-500 font-semibold">• {guide.time}</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-green-700 transition-colors duration-200">
                      {guide.title}
                    </h3>
                    <p className="text-gray-700 text-sm leading-relaxed">{guide.desc}</p>
                  </div>
                </div>
                <div className="pt-6 border-t border-gray-100 mt-6 flex items-center justify-between">
                  <span className="text-xs font-bold text-gray-800 group-hover:text-green-700 transition-colors">Read Full Guide</span>
                  <span className="text-gray-400 group-hover:translate-x-1 group-hover:text-green-700 transition-all duration-200">➔</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* =========================================================
            🤝 4️⃣ ABOUT US SECTION 
           ========================================================= */}
        <div 
          id="about-us" 
          className="relative rounded-3xl overflow-hidden bg-white/70 backdrop-blur-md p-8 md:p-16 flex flex-col md:flex-row gap-12 items-center border border-white/60 shadow-lg scroll-mt-24"
        >
          <div className="absolute top-0 left-0 w-64 h-64 bg-green-300/20 rounded-full blur-3xl pointer-events-none"></div>

          <div className="w-full md:w-2/5 flex justify-center z-10">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-r from-green-500 to-emerald-400 rounded-3xl blur-md opacity-25"></div>
              <img 
                src="https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=500" 
                alt="About GreenMart" 
                className="w-80 h-96 object-cover rounded-2xl shadow-md border border-white"
              />
            </div>
          </div>

          <div className="w-full md:w-3/5 space-y-6 z-10">
            <div className="space-y-2">
              <span className="inline-block bg-green-200 text-green-900 text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-md shadow-2xs">
                🌱 Our Story
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
                Crafting Green Spaces <br />
                <span className="text-green-700 font-black">For Healthy Living</span>
              </h2>
            </div>
            
            <p className="text-gray-700 leading-relaxed text-sm md:text-base font-medium">
              GreenMart started with a simple mission: to connect people with nature. We believe that incorporating plants into your home or office doesn't just improve aesthetics, it boosts productivity, cleans the air, and promotes psychological well-being.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4">
              <div className="bg-white/90 p-4 rounded-xl border border-white shadow-2xs transform hover:-translate-y-1 hover:border-green-400 hover:shadow-md transition-all duration-300 cursor-pointer">
                <span className="text-xl">⭐</span>
                <h4 className="font-bold text-gray-900 text-sm mt-1">Premium Quality</h4>
                <p className="text-xs text-gray-600 mt-0.5">Handpicked nursery plants.</p>
              </div>
              <div className="bg-white/90 p-4 rounded-xl border border-white shadow-2xs transform hover:-translate-y-1 hover:border-green-400 hover:shadow-md transition-all duration-300 cursor-pointer">
                <span className="text-xl">📦</span>
                <h4 className="font-bold text-gray-900 text-sm mt-1">Eco Packing</h4>
                <p className="text-xs text-gray-600 mt-0.5">Safe & sustainable boxes.</p>
              </div>
              <div className="bg-white/90 p-4 rounded-xl border border-white shadow-2xs transform hover:-translate-y-1 hover:border-green-400 hover:shadow-md transition-all duration-300 cursor-pointer">
                <span className="text-xl">🚚</span>
                <h4 className="font-bold text-gray-900 text-sm mt-1">Fast Delivery</h4>
                <p className="text-xs text-gray-600 mt-0.5">Guaranteed doorstep freshness.</p>
              </div>
            </div>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  )
}

export default Home