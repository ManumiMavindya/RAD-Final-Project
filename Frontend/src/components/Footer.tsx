const Footer = () => {
  return (
    <footer className="w-full bg-neutral-900 text-neutral-400 pt-20 pb-10 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          
          {/* Brand Info */}
          <div className="col-span-1 md:col-span-1 space-y-4">
            <h3 className="text-xl font-bold text-white">GreenMart.</h3>
            <p className="text-sm leading-relaxed">
              Curating premium indoor plants for modern living spaces. Excellence in every leaf.
            </p>
          </div>

          {/* Links */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="/" className="hover:text-white transition">Home</a></li>
              <li><a href="/shop" className="hover:text-white transition">Shop All</a></li>
              <li><a href="#about" className="hover:text-white transition">About Us</a></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">Collections</h4>
            <ul className="space-y-3 text-sm">
              <li className="hover:text-white cursor-pointer transition">Tropical</li>
              <li className="hover:text-white cursor-pointer transition">Low Light</li>
              <li className="hover:text-white cursor-pointer transition">Air Purifying</li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="text-white font-bold text-xs uppercase tracking-widest">Newsletter</h4>
            <p className="text-xs">Get expert care tips.</p>
            <div className="flex bg-neutral-800 rounded-full p-1 border border-neutral-700">
              <input 
                type="email" 
                placeholder="Email address" 
                className="bg-transparent text-sm text-white px-4 py-2 w-full outline-none placeholder:text-neutral-600"
              />
              <button className="bg-white text-neutral-900 px-6 py-2 rounded-full font-bold text-xs hover:bg-neutral-200 transition">Join</button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center text-xs gap-4">
          <p>© 2026 GreenMart. All rights reserved.</p>
          <div className="flex gap-8">
            <span className="hover:text-white cursor-pointer transition">Privacy Policy</span>
            <span className="hover:text-white cursor-pointer transition">Terms</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer