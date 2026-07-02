import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Login from "../pages/Login";
import Register from "../pages/Register";

const Navbar = () => {
  const { user, setUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsOpen(false);
    navigate("/");
  };

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-8 py-4 flex justify-between items-center">
        <Link to="/" className="font-black text-3xl text-green-600">
          Green<span className="text-gray-900">Mart</span>
        </Link>

        <div className="hidden md:flex space-x-8 font-bold text-gray-600 text-sm tracking-wide">
          <Link to="/" className="hover:text-green-600 transition">HOME</Link>
          <Link to="/shop" className="hover:text-green-600 transition">SHOP ALL</Link>
          <Link to="/about" className="hover:text-green-600 transition">ABOUT US</Link>
        </div>

        <div className="flex items-center gap-6 font-bold text-sm">
          {user ? (
            <div className="relative">
              <button 
                onClick={() => setIsOpen(!isOpen)} 
                className="bg-green-50 text-green-700 px-4 py-2 rounded-full hover:bg-green-100 transition"
              >
                👤 {user.name || "Account"}
              </button>
              
              {isOpen && (
                <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border py-2 animate-in fade-in zoom-in duration-200">
                  <Link to="/my-account" className="block px-6 py-2 hover:text-green-600" onClick={() => setIsOpen(false)}>My Profile</Link>
                  <Link to="/order-history" className="block px-6 py-2 hover:text-green-600" onClick={() => setIsOpen(false)}>Orders</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-6 py-2 text-red-500 hover:bg-red-50">Logout</button>
                </div>
              )}
            </div>
          ) : (
            <>
              <button onClick={() => setShowLogin(true)} className="text-gray-600 hover:text-green-600 transition">Login</button>
              <button onClick={() => setShowRegister(true)} className="bg-gray-900 text-white px-6 py-2 rounded-full hover:bg-green-600 transition shadow-lg">Register</button>
            </>
          )}
        </div>
      </nav>

      <Login isOpen={showLogin} onClose={() => setShowLogin(false)} />
      <Register isOpen={showRegister} onClose={() => setShowRegister(false)} />
    </>
  );
};

export default Navbar;