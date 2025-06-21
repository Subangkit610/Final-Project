import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories',
          {
            headers: {
              apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c',
            },
          }
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const filteredCategories = categories.filter((category) =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="font-sans pt-1 md:pt-1">
      {/* Hero Section */}
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
          <Link
            to="/destinations"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition duration-300"
          >
            Explore Destinations
          </Link>
        </div>
      </section>

      {/* Search Section - Simpel tanpa tombol */}
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

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-8">Popular Categories</h2>
          {filteredCategories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
              {filteredCategories.map((category) => (
                <div key={category.id} className="group relative">
                  <img
                    src={category.imageUrl}
                    alt={category.name}
                    className="w-full h-52 object-cover rounded-xl transition-opacity duration-300 ease-in-out transform hover:opacity-90"
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="text-center">
          <p>&copy; 2025 Bangkit Travel Website. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
