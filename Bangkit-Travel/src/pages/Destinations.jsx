import React, { useEffect, useState } from "react";
import axios from "axios";

const Destinations = () => {
  const [activities, setActivities] = useState([]);
  const [visible, setVisible] = useState(6); // jumlah item awal
  const [search, setSearch] = useState("");
  const [selectedMap, setSelectedMap] = useState(null);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const res = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setActivities(res.data.data);
      } catch (err) {
        console.error("Error fetching activities:", err);
      }
    };

    fetchActivities();
  }, []);

  const handleLoadMore = () => {
    setVisible((prev) => prev + 6);
  };

  const filteredActivities = activities.filter((act) =>
    act.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-50">
      {/* Hero */}
      <section
        className="relative bg-cover bg-center h-80"
        style={{ backgroundImage: "url('src/assets/dieng.jpg')" }}
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

      {/* Search */}
      <section className="py-8 bg-white text-center">
        <input
          type="text"
          placeholder="Cari aktivitas..."
          className="w-72 md:w-96 px-4 py-2 text-sm rounded-full border border-gray-300 focus:outline-blue-500"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </section>

      {/* Activity List */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {filteredActivities.slice(0, visible).map((activity) => (
              <div
                key={activity.id}
                className="border rounded-xl shadow hover:shadow-lg transition overflow-hidden bg-white"
              >
                <img
                  src={activity.imageUrls[0]}
                  alt={activity.title}
                  className="w-full h-64 object-cover"
                />
                <div className="p-4 text-left">
                  <h3 className="text-lg font-bold text-gray-800">{activity.title}</h3>
                  <p className="text-gray-500 text-sm mb-1">
                    {activity.category.name} • {activity.province}
                  </p>
                  <p className="text-gray-600 text-sm line-clamp-3 mb-2">{activity.description}</p>
                  <p className="text-blue-600 font-bold text-sm mb-2">
                    Rp {activity.price.toLocaleString("id-ID")}
                  </p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => setSelectedMap(activity.location_maps)}
                      className="text-sm text-white bg-blue-600 hover:bg-blue-700 px-4 py-1 rounded-full"
                    >
                      Lihat Lokasi
                    </button>
                    <span className="text-yellow-500 font-semibold">⭐ {activity.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {visible < filteredActivities.length && (
            <div className="text-center mt-8">
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

      {/* Modal Maps */}
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

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 mt-8">
        <div className="container mx-auto text-center">
          <p>&copy; 2025 Bangkit Travel Website. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Destinations;
