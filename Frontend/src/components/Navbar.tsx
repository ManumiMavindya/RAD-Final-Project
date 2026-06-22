import { Link } from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="bg-green-600 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <div className="flex items-center space-x-2">
        {/* ලෝගෝ එක එබුවමත් හෝම් පේජ් එකට යන්න Link එකක් දැම්මා */}
        <Link to="/" className="font-bold text-2xl tracking-wide cursor-pointer">GreenMart</Link>
      </div>

      {/* 🌟 මෙන්න මෙතන තමයි <a> වෙනුවට <Link> පාවිච්චි කරලා තියෙන්නේ */}
      <div className="hidden md:flex space-x-8 font-medium text-sm tracking-wider">
        <Link to="/" className="hover:text-green-200 transition">HOME</Link>
        <Link to="/shop" className="hover:text-green-200 transition">SHOP ALL</Link>
        <Link to="/guides" className="hover:text-green-200 transition">CARE GUIDES</Link>
        <Link to="/about" className="hover:text-green-200 transition">ABOUT US</Link>
      </div>

      <div className="flex items-center space-x-6 text-sm font-medium">
        <span className="cursor-pointer hover:text-green-200 transition">Account👤</span>
        <span className="cursor-pointer hover:text-green-200 transition bg-green-700 px-3 py-1 rounded-full">
          Cart 🛒 (0)
        </span>
      </div>
    </nav>
  )
}

export default Navbar