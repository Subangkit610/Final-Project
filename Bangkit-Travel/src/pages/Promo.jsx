import React, { useEffect, useState } from "react";
import axios from "axios";

const PromoPage = () => {
  const [promo, setPromo] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPromo = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setPromo(response.data.data);
    } catch (error) {
      console.error("Gagal mengambil data promo:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPromo();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Promo Menarik Untukmu
        </h1>

        {loading ? (
          <p className="text-center text-gray-500">Memuat promo...</p>
        ) : promo.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada promo tersedia.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {promo.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow hover:shadow-md transition overflow-hidden"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold text-gray-800">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                  <p className="text-sm text-gray-700 mb-1">
                    <strong>Kode Promo:</strong> {item.promo_code}
                  </p>
                  <p className="text-sm text-green-700 mb-1">
                    Diskon: Rp{item.promo_discount_price.toLocaleString("id-ID")}
                  </p>
                  <p className="text-sm text-gray-500">
                    Min. belanja Rp{item.minimum_claim_price.toLocaleString("id-ID")}
                  </p>
                  <details className="mt-2 text-sm text-blue-600 cursor-pointer">
                    <summary>Syarat & Ketentuan</summary>
                    <div
                      className="mt-1 text-gray-700"
                      dangerouslySetInnerHTML={{ __html: item.terms_condition }}
                    />
                  </details>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PromoPage;
