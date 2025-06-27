import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Anda belum login.");
      navigate("/login");
      return;
    }

    axios
      .get(`${BASE_URL}/api/v1/user`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.error("Gagal memuat profil:", err);
        alert("❌ Gagal memuat data user. Silakan login ulang.");
        navigate("/login");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [token, navigate]);

  if (loading) return <div className="p-6 text-center">Memuat data...</div>;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-bold mb-4">Profil Saya</h2>
        <div className="flex items-center gap-4 mb-4">
          <img
            src={user.profilePictureUrl || "https://via.placeholder.com/80"}
            alt="Foto Profil"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <p className="text-xl font-semibold">{user.name}</p>
            <p className="text-gray-500">{user.email}</p>
          </div>
        </div>
        <div>
          <p><span className="font-semibold">Phone:</span> {user.phoneNumber || '-'}</p>
          <p><span className="font-semibold">Role:</span> {user.role}</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
