import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./component/Navbar";  // Pastikan nama folder sesuai, misalnya 'components' bukan 'component'
import HomePage from "./pages/HomePage";
import Destinations from "./pages/Destinations";
import Booking from "./pages/Booking";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Transaction from "./pages/Transaction";


function App() {
  return (
    <Router>
      <Navbar />
      {/* Tambahkan padding top agar konten tidak tertutup navbar */}
      <div className="pt-16 md:pt-20">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/transaction" element={<Transaction />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
