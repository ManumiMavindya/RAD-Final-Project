const Footer = () => {
  return (
    <footer className="w-full bg-green-600 text-white relative overflow-hidden mt-20 border-t border-green-700 shadow-xl">
      <div className="max-w-6xl mx-auto px-6 py-12">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-green-500/50">
          
          {/* Brand Info */}
          <div className="space-y-3">
            <h3 className="text-2xl font-black text-white">GreenMart.</h3>
            <p className="text-green-100 text-sm leading-relaxed font-normal">
              Bringing premium quality, handpicked indoor plants straight from our nursery to your doorstep.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <span className="w-8 h-8 rounded-lg bg-green-700 flex items-center justify-center text-sm cursor-pointer hover:bg-white hover:text-green-600 transition">🌐</span>
              <span className="w-8 h-8 rounded-lg bg-green-700 flex items-center justify-center text-sm cursor-pointer hover:bg-white hover:text-green-600 transition">📸</span>
              <span className="w-8 h-8 rounded-lg bg-green-700 flex items-center justify-center text-sm cursor-pointer hover:bg-white hover:text-green-600 transition">👥</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="space-y-2 text-green-200 text-sm font-medium">
              <li><a href="#" className="hover:text-white transition">Home</a></li>
              <li><a href="#care-guides" className="hover:text-white transition">Care Guides</a></li>
              <li><a href="#about-us" className="hover:text-white transition">About Us</a></li>
              <li><a href="#" className="hover:text-white transition">Shop All</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-widest">Categories</h4>
            <ul className="space-y-2 text-green-200 text-sm font-medium">
              <li className="hover:text-white cursor-pointer transition">Indoor Jungle</li>
              <li className="hover:text-white cursor-pointer transition">Pet-Friendly</li>
              <li className="hover:text-white cursor-pointer transition">Plant Gifts</li>
              <li className="hover:text-white cursor-pointer transition">New Arrivals</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-3">
            <h4 className="font-extrabold text-white text-sm uppercase tracking-widest">Keep in Touch</h4>
            <p className="text-green-100 text-xs">Subscribe for plant care tips and deals.</p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-green-700 border border-green-500 text-white text-sm rounded-lg px-3 py-2 w-full placeholder-green-300 focus:outline-none focus:border-white"
              />
              <button className="bg-white text-green-700 font-bold text-sm px-4 py-2 rounded-lg hover:bg-green-50 transition">Join</button>
            </div>
          </div>

        </div>

        {/* Bottom Copyright Bar */}
        <div className="pt-6 flex flex-col md:flex-row justify-between items-center text-xs text-green-300 font-medium gap-4">
          <p>© 2026 GreenMart. All rights reserved.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition">Terms of Service</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer