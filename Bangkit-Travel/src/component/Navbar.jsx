import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-white shadow-md fixed w-full z-40">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-1 py-1">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2">
          <img
            src="src/assets/logo.png"  // Pastikan path gambar benar
            alt="Bangkit Travel"
            className="w-20 h-20"
          />
          <span className="text-blue-900 text-2xl font-bold">Traveler</span>
        </Link>

        {/* Tombol Toggle Menu untuk Mobile */}
        <button
          className="lg:hidden text-blue-900 focus:outline-none"
          onClick={toggleMobileMenu}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="4"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Navigation Links (Mobile Menu) */}
        <div
          className={`lg:flex space-x-2 px-4 items-center ${isMobileMenuOpen ? 'block absolute top-full  w-full bg-white shadow-lg' : 'hidden'} lg:block`}
        >
          <Link to="/" className="text-blue-900 hover:text-yellow-500 py-2 px-4 block">
            Home
          </Link>
          <Link to="/destinations" className="text-blue-900 hover:text-yellow-500 py-2 px-4 block">
            Destinations
          </Link>
          <Link to="/booking" className="text-blue-900 hover:text-yellow-500 py-2 px-4 block">
            Booking
          </Link>
          <Link to="/contact" className="text-blue-900 hover:text-yellow-500 py-2 px-4 block">
            Contact
          </Link>
          <Link to="/transaction" className="text-blue-900 hover:text-yellow-500 py-2 px-4 block">
            Transaction
          </Link>

          <Link
            to="/login"
            className="text-blue-900 hover:text-yellow-500 py-2 px-4 block rounded-full border-2 border-blue-900 text-center w-20"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-blue-900 text-white py-2 px-4 block rounded-full text-center w-20 hover:bg-blue-400"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
