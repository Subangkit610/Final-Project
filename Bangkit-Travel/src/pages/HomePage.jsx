// File: src/pages/HomePage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [activitiesInCategory, setActivitiesInCategory] = useState([]);
  const [loadingDetail, setLoadingDetail] = useState(false);

  const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
  const BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id";

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/categories`, {
          headers: {
            apiKey: API_KEY,
          },
        });
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const fetchCategoryWithActivities = async (categoryId) => {
    setLoadingDetail(true);
    try {
      const [categoryRes, activitiesRes] = await Promise.all([
        axios.get(`${BASE_URL}/api/v1/category/${categoryId}`, {
          headers: { apiKey: API_KEY },
        }),
        axios.get(`${BASE_URL}/api/v1/activities-by-category/${categoryId}`, {
          headers: { apiKey: API_KEY },
        }),
      ]);
      setSelectedCategory(categoryRes.data.data);
      setActivitiesInCategory(activitiesRes.data.data);
    } catch (err) {
      console.error("Gagal memuat data:", err);
    } finally {
      setLoadingDetail(false);
    }
  };

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleActivityClick = (activityId, categoryId) => {
    navigate(`/destinations?category=${categoryId}&highlight=${activityId}`);
  };

  return (
    <div className="font-sans pt-1 md:pt-1">
      <section className="relative h-screen">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
          src="src/assets/indonesia.mp4"
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-1 py-32">
          <h1 className="text-5xl font-extrabold mb-6">Discover Your Next Adventure</h1>
          <p className="text-xl mb-8">
            Find the best travel destinations and plan your dream vacation with us
          </p>
          <button
            onClick={() => navigate("/destinations")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition duration-300"
          >
            Explore Destinations
          </button>
        </div>
      </section>

      <section className="bg-blue-900 py-8">
        <div className="text-center text-white">
          <h2 className="text-2xl font-semibold mb-4">Cari Kategori</h2>
          <div className="flex justify-center items-center gap-2 px-4 flex-wrap">
            <input
              type="text"
              placeholder="Cari kategori..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-2 text-sm rounded-full border border-white bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-400 w-64"
            />
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-8">Popular Categories</h2>
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
              {filteredCategories.map((category) => (
                <div
                  key={category.id}
                  onClick={() => fetchCategoryWithActivities(category.id)}
                  className="group relative cursor-pointer transition-transform transform hover:scale-105"
                >
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-52 object-cover rounded-xl"
                  />
                  <div className="absolute inset-0 bg-black opacity-25 group-hover:opacity-50 rounded-xl transition-opacity duration-300"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <p className="text-white text-xl font-semibold">{category.name}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-lg">Tidak ada kategori ditemukan.</p>
          )}
        </div>
      </section>

      {selectedCategory && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-70 flex items-center justify-center px-4 overflow-y-auto py-8">
          <div className="bg-white rounded-lg p-6 w-full max-w-4xl relative">
            <button
              onClick={() => setSelectedCategory(null)}
              className="absolute top-2 right-2 bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center text-xl"
            >
              &times;
            </button>

            {loadingDetail ? (
              <p className="text-center text-gray-600">Memuat detail...</p>
            ) : (
              <>
                <img
                  src={selectedCategory.imageUrl}
                  alt={selectedCategory.name}
                  className="w-full h-64 object-cover rounded mb-4"
                />
                <h3 className="text-2xl font-bold mb-2">{selectedCategory.name}</h3>
                <p className="text-gray-700 text-sm mb-4">{selectedCategory.description}</p>

                <h4 className="text-xl font-semibold mb-3">Aktivitas dalam kategori ini:</h4>
                {activitiesInCategory.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {activitiesInCategory.map((activity) => (
                      <div
                        key={activity.id}
                        onClick={() => handleActivityClick(activity.id, selectedCategory.id)}
                        className="cursor-pointer border rounded-lg overflow-hidden shadow hover:shadow-lg transition-transform transform hover:scale-105"
                      >
                        <img
                          src={activity.imageUrls[0]}
                          alt={activity.title}
                          className="w-full h-40 object-cover transition-transform duration-300 transform group-hover:scale-105"
                        />
                        <div className="p-3 space-y-1">
                          <h5 className="font-semibold text-sm line-clamp-2">{activity.title}</h5>
                          <p className="text-xs text-gray-500">
                            ⭐ {activity.rating} — Rp {activity.price.toLocaleString("id-ID")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm">Belum ada aktivitas dalam kategori ini.</p>
                )}
              </>
            )}
          </div>
        </div>
      )}

      <footer className="bg-gray-800 text-white py-8">
        <div className="text-center">
          <p>&copy; 2025 Bangkit Travel Website. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
