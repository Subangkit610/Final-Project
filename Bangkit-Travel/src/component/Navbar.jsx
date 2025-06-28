import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { useCart } from "../component/CartContext"; // Adjust path if necessary

const Navbar = () => {
  let user = null;
  const storedUser = Cookies.get("user");
  if (storedUser) {
    try {
      user = JSON.parse(storedUser);
    } catch (err) {
      console.error("Gagal parse cookie user:", err);
    }
  }

  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    Cookies.remove("user");
    localStorage.removeItem("token");
    setIsDropdownOpen(false);
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-40">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 py-2">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="/public/assets/logo.png"
            alt="Bangkit Travel"
            className="w-14 h-14 object-contain"
          />
          <span className="text-blue-900 text-2xl font-bold">Traveler</span>
        </Link>

        {/* Mobile toggle */}
        <button className="lg:hidden text-blue-900" onClick={toggleMobileMenu}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Menu Links */}
        <div
          className={`lg:flex lg:items-center space-x-2 ${
            isMobileMenuOpen
              ? "block absolute top-full left-0 bg-white w-full shadow-md px-4 py-4 z-50"
              : "hidden lg:block"
          }`}
        >
          <Link to="/" className="text-blue-900 hover:text-yellow-500 py-2 px-4 block">Home</Link>
          <Link to="/destinations" className="text-blue-900 hover:text-yellow-500 py-2 px-4 block">Destinations</Link>
          <Link to="/promo" className="text-blue-900 hover:text-yellow-500 py-2 px-4 block">Promo</Link>
          <Link to="/contact" className="text-blue-900 hover:text-yellow-500 py-2 px-4 block">Contact</Link>
          <Link to="/cart" className="relative text-blue-900 hover:text-yellow-500 py-2 px-4 block">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-2 bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {user ? (
            <div className="relative mt-4 lg:mt-0" ref={dropdownRef}>
              <button onClick={toggleDropdown} className="focus:outline-none">
                <img
                  src={user.photo || "/default-profile.png"}
                  alt="User"
                  className="w-10 h-10 rounded-full border border-blue-900"
                />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded shadow-lg py-2 z-50 text-sm">
                  {user.role === "admin" ? (
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-blue-900 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-blue-900 hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Profil
                    </Link>
                  )}
                  <Link
                    to="/transactions"
                    className="block px-4 py-2 text-blue-900 hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Transaksi
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2 mt-4 lg:mt-0">
              <Link
                to="/login"
                className="text-blue-900 hover:text-yellow-500 border-2 border-blue-900 py-2 px-4 rounded-full text-center w-20"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-900 text-white py-2 px-4 rounded-full text-center w-20 hover:bg-blue-500"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
