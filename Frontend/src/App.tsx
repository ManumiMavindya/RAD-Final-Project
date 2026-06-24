import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
// import Footer from "./components/Footer"
import Home from "./pages/Home"
import ShopAll from "./pages/ShopAll"
import PlantDetails from "./pages/PlantDetails"
import Login from "./pages/Login"
import Register from "./pages/Register"
import { AuthProvider } from './context/AuthContext';
import MyAccount from "./pages/MyAccount";

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
            <Route path="/my-account" element={<MyAccount />} />     
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App