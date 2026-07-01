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
    { title: "Watering 101: The Golden Rules", difficulty: "Beginner", time: "5 min read", desc: "Learn how to avoid overwatering and check soil moisture like a pro to keep your root systems healthy.", icon: "💧", bgBorder: "hover:border-blue-300", tagColor: "bg-blue-100 text-blue-800" },
    { title: "Mastering Sunlight & Placement", difficulty: "Intermediate", time: "8 min read", desc: "Bright indirect light vs. low light? Find the perfect spot in your home for your indoor plants.", icon: "☀️", bgBorder: "hover:border-amber-300", tagColor: "bg-amber-100 text-amber-800" },
    { title: "The Ultimate Guide to Repotting", difficulty: "Advanced", time: "12 min read", desc: "Step-by-step instructions on choosing the right soil mix and minimizing root shock during transit.", icon: "🪴", bgBorder: "hover:border-emerald-300", tagColor: "bg-emerald-100 text-emerald-800" }
  ])

  return (
    <div className="relative min-h-screen bg-neutral-50 selection:bg-green-200 overflow-hidden">
      
      <div className="absolute top-0 -left-20 w-96 h-96 bg-emerald-200/50 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 -right-40 w-[500px] h-[500px] bg-green-200/40 rounded-full blur-3xl"></div>

      <div className="max-w-7xl mx-auto px-6 py-10 space-y-32 relative z-10">
        
        {/* Hero Section */}
        <section className="relative rounded-[2rem] overflow-hidden bg-white/60 backdrop-blur-xl p-8 md:p-20 flex flex-col md:flex-row items-center justify-between border border-white/50 shadow-2xl shadow-green-900/5">
          <div className="space-y-8 md:w-1/2 z-10 text-center md:text-left">
            <span className="inline-flex items-center gap-2 bg-green-100 text-green-800 text-xs font-bold uppercase tracking-[0.2em] px-4 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-green-600 animate-pulse"></span> GreenMart
            </span>
            <h1 className="text-5xl md:text-7xl font-extrabold text-neutral-900 tracking-tight leading-[1.1]">
              Vibrant Plants, <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-700 to-emerald-500">Thoughtfully</span> Delivered
            </h1>
            <p className="text-neutral-600 text-lg md:text-xl max-w-lg font-medium leading-relaxed">
              Bring nature into your living space with our handpicked, premium quality indoor plants, curated for your home.
            </p>
            <div className="flex justify-center md:justify-start gap-4 pt-4">
              <button className="bg-neutral-900 text-white font-bold px-8 py-4 rounded-2xl shadow-xl shadow-neutral-900/20 hover:bg-green-700 transition-all duration-300 active:scale-95">Shop Collection ➔</button>
            </div>
          </div>
          
          <div className="md:w-5/12 mt-16 md:mt-0 relative">
            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl border-4 border-white rotate-2 hover:rotate-0 transition-transform duration-500">
              <img src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=800" alt="Plant" className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </section>

        {/* Categories Section */}
        <section className="space-y-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-neutral-900">Explore Categories</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, index) => (
              <div key={index} className="group relative rounded-3xl overflow-hidden h-80 border border-neutral-200 cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-500">
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/90 to-transparent"></div>
                <div className="absolute bottom-6 left-6">
                  <h3 className="text-white text-xl font-bold">{cat.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* About Us Section - අලුතින් එකතු කළා */}
        <section className="bg-white rounded-[2rem] p-10 md:p-16 border border-neutral-200 shadow-xl shadow-green-900/5">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-4xl font-extrabold text-neutral-900">Why GreenMart?</h2>
              <p className="text-neutral-600 leading-relaxed text-lg">
                We believe that every home deserves a touch of nature. GreenMart was founded to provide not just plants, but a seamless experience in curating your indoor sanctuary. From sustainable sourcing to expert-led care guides, we are here to support your green journey every step of the way.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <h4 className="font-bold text-green-800">100% Organic</h4>
                  <p className="text-sm text-green-700">Pesticide-free plants</p>
                </div>
                <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                  <h4 className="font-bold text-green-800">Fast Shipping</h4>
                  <p className="text-sm text-green-700">Delivered within 24h</p>
                </div>
              </div>
            </div>
            <div className="rounded-[2rem] overflow-hidden shadow-2xl">
              <img src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?q=80&w=800" alt="About Us" className="w-full h-full object-cover" />
            </div>
          </div>
        </section>

        {/* Guides Section */}
        <section id="care-guides" className="space-y-10">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold text-neutral-900">Expert Care Guides</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {guides.map((guide, index) => (
              <div key={index} className={`group bg-white rounded-[2rem] p-8 border border-neutral-100 shadow-sm hover:shadow-xl hover:border-green-200 transition-all duration-300 flex flex-col justify-between ${guide.bgBorder}`}>
                <div className="space-y-6">
                  <div className="w-16 h-16 rounded-3xl bg-neutral-50 flex items-center justify-center text-3xl shadow-inner border border-neutral-100 group-hover:bg-green-50 transition-colors">
                    {guide.icon}
                  </div>
                  <div>
                    <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${guide.tagColor}`}>{guide.difficulty}</span>
                    <h3 className="text-2xl font-bold text-neutral-900 mt-4 leading-snug">{guide.title}</h3>
                    <p className="text-neutral-600 mt-3 leading-relaxed text-sm">{guide.desc}</p>
                  </div>
                </div>
                <div className="mt-8 flex items-center justify-between">
                  <span className="text-sm font-bold text-neutral-900 group-hover:text-green-700 transition-colors">Read Guide</span>
                  <span className="w-8 h-8 rounded-full bg-neutral-100 flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all">➔</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>
      <Footer />
    </div>
  )
}

export default Home