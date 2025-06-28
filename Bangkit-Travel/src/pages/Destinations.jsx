import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../component/CartContext";
import { useNavigate, useLocation } from "react-router-dom";

const Destinations = () => {
  const [activities, setActivities] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(6);
  const [selectedMap, setSelectedMap] = useState(null);
  const [notifMessage, setNotifMessage] = useState("");
  const [selectedActivityDetail, setSelectedActivityDetail] = useState(null);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const { addToCart } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
  const BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id";

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/api/v1/categories`, {
          headers: { apiKey: API_KEY },
        });
        setCategories(res.data.data);
      } catch (err) {
        console.error("Gagal memuat kategori:", err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const categoryIdFromQuery = params.get("category");
    if (categoryIdFromQuery) {
      setSelectedCategoryId(categoryIdFromQuery);
    }
  }, [location.search]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const url = selectedCategoryId
          ? `${BASE_URL}/api/v1/activities-by-category/${selectedCategoryId}`
          : `${BASE_URL}/api/v1/activities`;

        const res = await axios.get(url, {
          headers: { apiKey: API_KEY },
        });
        setActivities(res.data.data);
      } catch (err) {
        console.error("Gagal memuat aktivitas:", err);
      }
    };
    fetchActivities();
  }, [selectedCategoryId]);

  const fetchActivityDetail = async (activityId) => {
    setLoadingDetail(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/activity/${activityId}`, {
        headers: { apiKey: API_KEY },
      });
      setSelectedActivityDetail(res.data.data);
    } catch (err) {
      console.error("Gagal memuat detail aktivitas:", err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const handleAddToCart = async (activity) => {
    const token = localStorage.getItem("token");

    if (!token) {
      setNotifMessage("❌ Maaf, Anda harus login terlebih dahulu.");
      setTimeout(() => {
        setNotifMessage("");
        navigate("/login");
      }, 2000);
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/v1/add-cart`,
        { activityId: activity.id, qty: 1 },
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
          },
        }
      );

      addToCart(activity);
      setNotifMessage("✅ Berhasil ditambahkan ke keranjang");
      setTimeout(() => setNotifMessage(""), 2000);
    } catch (error) {
      console.error("Gagal menambahkan item ke keranjang:", error);
      setNotifMessage("❌ Gagal menambahkan item ke keranjang.");
      setTimeout(() => setNotifMessage(""), 2000);
    }
  };

  const filteredActivities = activities.filter((act) =>
    act.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleLoadMore = () => setVisible((prev) => prev + 6);

  const getValidImage = (url) => {
    return url && url.startsWith("http")
      ? url
      : "https://via.placeholder.com/400x300?text=No+Image";
  };

  return (
    <div className="bg-gray-50">
      {notifMessage && (
        <div className="fixed top-20 right-4 bg-white border px-4 py-2 rounded shadow z-50 text-sm text-gray-800">
          {notifMessage}
        </div>
      )}

      <section
        className="relative bg-cover bg-center h-80"
        style={{ backgroundImage: "url('/assets/dieng.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 container mx-auto text-center text-white px-4 py-32">
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
            Explore Amazing Destinations
          </h1>
          <p className="text-lg md:text-2xl">
            Discover your next adventure from our curated activities
          </p>
        </div>
      </section>

      <section className="py-8 bg-white text-center space-y-4">
        <input
          type="text"
          placeholder="Cari aktivitas..."
          className="w-72 md:w-96 px-4 py-2 text-sm rounded-full border border-gray-300 focus:outline-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div>
          <select
            className="px-4 py-2 rounded-full border border-gray-300 text-sm"
            value={selectedCategoryId}
            onChange={(e) => setSelectedCategoryId(e.target.value)}
          >
            <option value="">-- Semua Kategori --</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredActivities.slice(0, visible).map((activity) => (
              <div
                key={activity.id}
                className="border rounded-xl bg-white shadow-md hover:shadow-xl transition-transform transform hover:scale-105 duration-300 overflow-hidden"
              >
                <img
                  src={getValidImage(activity.imageUrls?.[0])}
                  alt={activity.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 space-y-2">
                  <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                    <span className="text-yellow-500 text-sm">⭐ {activity.rating}</span>
                    {activity.title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {activity.category.name} • {activity.province}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-3">
                    {activity.description}
                  </p>
                  <p className="text-blue-600 font-bold text-sm">
                    Rp {activity.price.toLocaleString("id-ID")}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <button
                      onClick={() => setSelectedMap(activity.location_maps)}
                      className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded-full"
                    >
                      Lihat Lokasi
                    </button>
                    <button
                      onClick={() => handleAddToCart(activity)}
                      className="bg-green-600 hover:bg-green-700 text-white text-xs px-3 py-1 rounded-full"
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => fetchActivityDetail(activity.id)}
                      className="bg-purple-600 hover:bg-purple-700 text-white text-xs px-3 py-1 rounded-full"
                    >
                      Detail
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visible < filteredActivities.length && (
            <div className="text-center mt-10">
              <button
                onClick={handleLoadMore}
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-semibold"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>

      {selectedMap && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg max-w-3xl w-full overflow-hidden relative">
            <button
              onClick={() => setSelectedMap(null)}
              className="absolute top-2 right-2 text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>
            <div
              className="w-full"
              dangerouslySetInnerHTML={{ __html: selectedMap }}
            />
          </div>
        </div>
      )}

      {selectedActivityDetail && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg max-w-2xl w-full overflow-auto max-h-[90vh] relative p-4">
            <button
              onClick={() => setSelectedActivityDetail(null)}
              className="absolute top-2 right-2 text-white bg-red-500 rounded-full w-8 h-8 flex items-center justify-center"
            >
              &times;
            </button>
            {loadingDetail ? (
              <p className="text-center">Memuat detail...</p>
            ) : (
              <>
                <img
                  src={getValidImage(selectedActivityDetail.imageUrls?.[0])}
                  alt={selectedActivityDetail.title}
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <h2 className="text-xl font-bold mb-2">
                  <span className="text-yellow-500 text-sm">⭐ {selectedActivityDetail.rating}</span>{" "}
                  {selectedActivityDetail.title}
                </h2>
                <p className="text-sm text-gray-500 mb-1">
                  Kategori: {selectedActivityDetail.category.name} • Provinsi:{" "}
                  {selectedActivityDetail.province}
                </p>
                <p className="text-gray-700 text-sm mb-4">
                  {selectedActivityDetail.description}
                </p>
                <p className="text-blue-600 font-bold text-md mb-4">
                  Harga: Rp {selectedActivityDetail.price.toLocaleString("id-ID")}
                </p>
                <div
                  className="mb-4"
                  dangerouslySetInnerHTML={{
                    __html: selectedActivityDetail.location_maps,
                  }}
                />
              </>
            )}
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Bangkit Travel Website. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Destinations;
