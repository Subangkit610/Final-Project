import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);
      setError("");

      try {
        // Ambil apiKey/token dari localStorage
        const apiKey = localStorage.getItem("token");
        if (!apiKey) {
          setError("User belum login");
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user`,
          {
            params: { apiKey },
          }
        );

        setUser(response.data);
      } catch (err) {
        setError("Gagal memuat data user");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold">Memuat profil...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded shadow mt-10">
      <div className="flex items-center space-x-6">
        <img
          src={user.avatar || "https://via.placeholder.com/150"}
          alt="Avatar"
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-gray-600">{user.email}</p>
          <p className="mt-2 text-gray-700">{user.bio || "Belum ada bio"}</p>
          <p className="mt-1 text-sm text-gray-400">
            Bergabung sejak: {new Date(user.joined).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
