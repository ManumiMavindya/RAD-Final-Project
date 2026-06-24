import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; 

const Navbar = () => {
  const { user, setUser } = useAuth(); 
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null); 
    navigate("/login");
  };

  return (
    <nav className="bg-green-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="font-bold text-2xl tracking-wide">GreenMart</Link>

      <div className="hidden md:flex space-x-8 font-medium text-sm">
        <Link to="/">HOME</Link>
        <Link to="/shop">SHOP ALL</Link>
        <Link to="/guides">CARE GUIDES</Link>
        <Link to="/about">ABOUT US</Link>
      </div>

      <div className="flex items-center space-x-6 text-sm font-medium">
        {user ? (
          <>
            <Link to="/account" className="hover:text-green-200">Account👤</Link>
            <Link to="/cart" className="bg-green-700 px-3 py-1 rounded-full hover:bg-green-800 transition">
              Cart 🛒
            </Link>
            <button onClick={handleLogout} className="hover:text-red-200">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-green-200">Login</Link>
            <Link to="/register" className="border border-white px-3 py-1 rounded-full hover:bg-white hover:text-green-600 transition">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;