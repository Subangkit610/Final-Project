import React, { useEffect, useState } from "react";
import axios from "axios";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});

  useEffect(() => {
    axios
      .get("https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/carts", {
        headers: {
          "Content-Type": "application/json",
          apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setCartItems(response.data.data);

        // Inisialisasi semua item tidak dicentang
        const initialSelections = {};
        response.data.data.forEach((item) => {
          initialSelections[item.id] = false;
        });
        setSelectedItems(initialSelections);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Menghapus item dari keranjang
  const handleDelete = async (cartId) => {
    try {
      await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-cart/${cartId}`,
        {
          headers: {
            "Content-Type": "application/json",
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      // Hapus dari state
      setCartItems((prev) => prev.filter((item) => item.id !== cartId));
      setSelectedItems((prev) => {
        const updated = { ...prev };
        delete updated[cartId];
        return updated;
      });

      alert("✅ Item berhasil dihapus!");
    } catch (error) {
      console.error("❌ Gagal menghapus item:", error);
      alert("Gagal menghapus item. Silakan coba lagi.");
    }
  };

  // Menghitung total harga dari item yang dipilih
  const totalHarga = cartItems.reduce((sum, item) => {
    return selectedItems[item.id] ? sum + (item.activity.price || 0) : sum;
  }, 0);

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Keranjang Anda</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Keranjang masih kosong.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="bg-white shadow-md rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="flex items-start gap-3 mb-4 sm:mb-0">
                <input
                  type="checkbox"
                  checked={selectedItems[item.id] || false}
                  onChange={() => handleCheckboxChange(item.id)}
                  className="mt-1"
                />
                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {item.activity.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {item.activity.category?.name || "Kategori tidak tersedia"} •{" "}
                    {item.activity.province}
                  </p>
                  <p className="text-blue-600 font-semibold mt-1">
                    Rp {item.activity.price?.toLocaleString("id-ID") || "N/A"}
                  </p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(item.id)} // Memanggil handleDelete saat tombol Hapus diklik
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Hapus
              </button>
            </div>
          ))}

          {/* Ringkasan dan Checkout */}
          <div className="bg-white p-4 rounded-md shadow-md mt-6">
            <div className="flex justify-between text-lg font-semibold mb-4">
              <span>Total (terpilih)</span>
              <span>Rp {totalHarga.toLocaleString("id-ID")}</span>
            </div>
            <button
              onClick={() =>
                alert(
                  Object.values(selectedItems).includes(true)
                    ? "Checkout berhasil (simulasi)"
                    : "Silakan pilih item terlebih dahulu"
                )
              }
              className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-md font-semibold"
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
