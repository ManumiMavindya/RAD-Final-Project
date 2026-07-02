import { Link, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="bg-white border-b border-gray-100 px-8 py-4 flex justify-between items-center sticky top-0 z-50">
      <div className="flex items-center gap-8">
        <Link to="/admin/dashboard" className="font-black text-2xl text-green-600">Admin<span className="text-gray-900">Panel</span></Link>
        <div className="flex gap-6 font-bold text-gray-500 text-sm">
          <Link to="/admin/dashboard" className="hover:text-green-600">Dashboard</Link>
          <Link to="/admin/plants" className="hover:text-green-600">Plants</Link>
          <Link to="/admin/orders" className="hover:text-green-600">Orders</Link>
          <Link to="/admin/users" className="hover:text-green-600">Users</Link>
        </div>
      </div>
      <button 
        onClick={() => navigate('/')} 
        className="bg-gray-900 text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-gray-700"
      >
        Back to Shop
      </button>
    </nav>
  );
};
export default AdminNavbar;