import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!nama || !email || !password || !confirmPassword) {
      setErrorMessage("Semua kolom harus diisi");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Password dan konfirmasi password tidak cocok");
      return;
    }

    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register",
        {
          email: email,
          password: password,
          name: nama,
          passwordRepeat: confirmPassword,
          role: "user",
          profilePictureUrl:
            "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d", // Ganti dengan URL gambar yang valid
        },
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      setSuccessMessage("Registrasi sukses! Mengarahkan ke halaman login...");
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Terjadi kesalahan.");
    }
  };

  return (
    <div className="min-h-screen bg-blue-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center mb-6">Daftar Akun Baru</h2>

        {errorMessage && (
          <div className="bg-red-200 text-red-600 p-3 rounded mb-4 text-center">
            {errorMessage}
          </div>
        )}

        {successMessage && (
          <div className="bg-green-100 text-green-700 p-3 rounded mb-4 text-center">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Input Nama */}
          <div className="mb-4">
            <label htmlFor="nama" className="block text-sm font-medium text-gray-700">Nama</label>
            <input
              type="text"
              id="nama"
              value={nama}
              onChange={(e) => setNama(e.target.value)}
              className="w-full px-4 py-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan nama"
              required
            />
          </div>

          {/* Input Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan email"
              required
            />
          </div>

          {/* Input Password */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Masukkan password"
              required
            />
          </div>

          {/* Input Konfirmasi Password */}
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Konfirmasi Password</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-3 text-lg rounded-lg border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Konfirmasi password"
              required
            />
          </div>

          {/* Tombol Daftar */}
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg text-lg transition duration-300"
          >
            Daftar
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-600">
            Sudah punya akun?{" "}
            <Link to="/login" className="text-blue-600 hover:text-blue-700">
              Masuk sekarang
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
