import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const Navbar = () => {
  const { user, setUser } = useAuth(); 
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); 
    navigate("/login");
    setIsOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm px-8 py-4 flex justify-between items-center">
      {/* Logo */}
      <Link to="/" className="font-black text-3xl tracking-tighter text-green-600">
        Green<span className="text-gray-900">Mart</span>
      </Link>

      {/* Nav Links */}
      <div className="hidden md:flex space-x-10 font-bold text-gray-600 text-sm tracking-wide">
        <Link to="/" className="hover:text-green-600 transition-colors">HOME</Link>
        <Link to="/shop" className="hover:text-green-600 transition-colors">SHOP ALL</Link>
        <Link to="/about" className="hover:text-green-600 transition-colors">ABOUT US</Link> 
      </div>

      {/* Auth Buttons */}
      <div className="flex items-center space-x-6 text-sm font-bold">
        {user ? (
          <div className="relative">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="flex items-center gap-2 bg-gray-50 border border-gray-200 px-4 py-2 rounded-full hover:bg-green-50 hover:border-green-200 transition-all"
            >
              <span className="text-xl">👤</span> Account
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 animate-in fade-in zoom-in duration-200">
                <Link to="/my-account" className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition" onClick={() => setIsOpen(false)}>My Profile</Link>
                <Link to="/my-account" className="block px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-700 transition" onClick={() => setIsOpen(false)}>Order History</Link>
                <div className="border-t my-1"></div>
                <button 
                  onClick={handleLogout} 
                  className="block w-full text-left px-6 py-3 text-red-500 hover:bg-red-50 transition"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/login" className="text-gray-600 hover:text-green-600 transition">Login</Link>
            <Link to="/register" className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-green-600 transition shadow-lg">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;