import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Email dan Password wajib diisi");
      return;
    }

    setLoading(true);
    try {
      // Step 1: Login dan ambil token
      const loginRes = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      const token = loginRes.data.token;
      localStorage.setItem("token", token);

      // Step 2: Panggil update-profile (jika ingin ubah profil default)
      await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
        {
          name: "Subangkit", // Bisa disesuaikan
          phoneNumber: "085292211610",
          profilePictureUrl: "https://i.pravatar.cc/300?img=11" // atau URL foto default
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
          },
        }
      );

      // Step 3: Ambil data user terbaru
      const userRes = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      const user = userRes.data;

      // Step 4: Simpan ke cookies
      Cookies.set("user", JSON.stringify({
        name: user.name,
        email: user.email,
        phone: user.phoneNumber,
        role: user.role,
        photo: user.profilePictureUrl,
      }), { expires: 7 });

      alert("Login & update profile berhasil!");
      navigate("/profile");

    } catch (error) {
      setErrorMessage(error.response?.data?.message || "Terjadi kesalahan.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        {errorMessage && (
          <div className="bg-red-200 text-red-700 p-3 mb-4 text-center rounded">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-4 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-6 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
            disabled={loading}
          >
            {loading ? "Memproses..." : "Masuk"}
          </button>
        </form>
        <div className="mt-4 text-center">
          Belum punya akun? <Link to="/register" className="text-blue-600">Daftar</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
