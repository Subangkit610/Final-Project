import React from 'react'; 
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="font-sans pt-1 md:pt-1">

      {/* Hero Section */}
      <section className="relative h-screen">
        <video
          autoPlay
          loop
          muted
          className="absolute inset-0 w-full h-full object-cover"
          src="src/assets/indonesia.mp4" // Replace with the correct path to your video
        />
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative z-10 text-center text-white px-1 py-32">
          <h1 className="text-5xl font-extrabold mb-6">Discover Your Next Adventure</h1>
          <p className="text-xl mb-8">Find the best travel destinations and plan your dream vacation with us</p>
          <Link
            to="/destinations"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full text-lg transition duration-300"
          >
            Explore Destinations
          </Link>
        </div>
      </section>

      {/* Popular Destinations */}
      <section className="py-16 bg-white">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-8">Popular Destinations</h2>
          <div className="grid grid-cols-3 md:grid-cols-3 gap-8">
            {[{ name: 'Bromo', img: 'src/assets/bromo.jpg' }, 
            { name: 'Danau Toba', img: 'src/assets/danau-toba.jpg' }, 
            { name: 'Raja Ampat', img: 'src/assets/raja-ampat.jpg' }, 
            { name: 'Bali', img: 'src/assets/bali.jpg' }, 
            { name: 'Dieng', img: 'src/assets/dieng.jpg' }, 
            { name: 'Lombok', img: 'src/assets/lombok.jpg' }, 
            { name: 'Labuan Bajo', img: 'src/assets/bajo.jpg' }, 
            { name: 'Candi Prambanan', img: 'src/assets/prambanan.jpg' }, 
            { name: 'Candi Borobudur', img: 'src/assets/borobudur.jpg' }].map((destination, index) => (
              <div key={index} className="group relative">
                <img
                  src={destination.img}
                  alt={destination.name}
                  className="w-full h-64 object-cover rounded-xl transition-opacity duration-300 ease-in-out transform hover:opacity-90"
                />
                <div className="absolute inset-0 bg-black opacity-25 group-hover:opacity-50 rounded-xl transition-opacity duration-300"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className="text-white text-xl font-semibold">{destination.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="bg-blue-600 py-16">
        <div className="text-center text-white">
          <h2 className="text-3xl font-semibold mb-8">Start Planning Your Trip</h2>
          <input
            type="text"
            placeholder="Search for a destination..."
            className="w-1/2 px-6 py-3 text-lg rounded-full border-2 border-white bg-white text-gray-800 mb-4"
          />
          <div className="mt-4">
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-3 px-8 rounded-full text-lg transition duration-300">
              Search
            </button>
          </div>
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
