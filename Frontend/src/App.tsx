import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import ShopAll from "./pages/ShopAll"
import PlantDetails from "./pages/PlantDetails"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 text-gray-900 font-sans antialiased">
        <Navbar />
        
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<ShopAll />} />
            <Route path="/plant/:id" element={<PlantDetails />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  )
}

export default App