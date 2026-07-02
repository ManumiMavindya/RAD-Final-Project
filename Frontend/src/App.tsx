import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import ShopAll from "./pages/ShopAll"
import PlantDetails from "./pages/PlantDetails"
import Login from "./pages/Login"
import Register from "./pages/Register"
import OrderHistory from "./pages/OrderHistory";
import { AuthProvider } from './context/AuthContext';
import AdminDashboard from "./pages/AdminDashboard";
import Plants from "./pages/Admin/Plants"; // ෆයිල් එක තියෙන තැන හරියට බලන්න 
import Users from "./pages/Admin/Users"

const AdminRoute = ({ children }: { children: JSX.Element }) => {
  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("accessToken");

  return token && role === "ADMIN" ? children : <Navigate to="/login" />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<ShopAll />} />
            <Route path="/plant/:id" element={<PlantDetails />} />   
            <Route path="/order-history" element={<OrderHistory />} />
            
          <Route 
    path="/admin/dashboard" 
    element={
      <AdminRoute>
        <AdminDashboard />
      </AdminRoute>
    } 
  />

  {/* Plants Route එක (වෙනම එකක්) */}
  <Route 
    path="/admin/plants" 
    element={
      <AdminRoute>
        <Plants />
      </AdminRoute>
    } 
  />

  <Route 
  path="/admin/users" 
  element={
    <AdminRoute>
      <Users />
    </AdminRoute>
  } 
/>
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;