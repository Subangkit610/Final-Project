import React, {useEffect, useState} from "react";
import { useCart } from "../component/CartContext";
import axios from "axios";

const CartPage = () => {
  const { removeFromCart } = useCart();
  const [cartItems, setCartItems] = useState([]);
  // listCart()
  useEffect(() => {
      try {
        axios.get(
                "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/carts",
                {
                headers: {
                    "Content-Type": "application/json",
                    apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
                    Authorization: `Bearer ${localStorage.getItem("token")}`, // jika pakai token auth
                },
                }
            ).then(function (response) {
        // Handle successful response
        setCartItems(response.data.data)
        console.log(response.data.data);
      })
      .catch(function (error) {
        // Handle errors
        console.error(error);
      });
    } catch {
      console.log('error');
    }
  }, []);

  const totalHarga = cartItems.reduce((sum, item) => sum + (item.activity.price || 0), 0);
  // const totalHarga = 100;

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Keranjang Anda</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-600 text-center">Keranjang masih kosong.</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.activity.id}
              className="bg-white shadow-md rounded-md p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center"
            >
              <div className="mb-4 sm:mb-0">
                <h3 className="font-bold text-lg text-gray-800">{item.activity.title}</h3>
                <p className="text-sm text-gray-500">
                  {item.activity.category?.name || "Kategori tidak tersedia"} • {item.activity.province}
                </p>
                <p className="text-blue-600 font-semibold mt-1">
                  Rp {item.activity.price?.toLocaleString("id-ID") || "N/A"}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.activity.id)}
                className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
              >
                Hapus
              </button>
            </div>
          ))}

          {/* Ringkasan dan Checkout */}
          <div className="bg-white p-4 rounded-md shadow-md mt-6">
            <div className="flex justify-between text-lg font-semibold mb-4">
              <span>Total</span>
              <span>Rp {totalHarga.toLocaleString("id-ID")}</span>
            </div>
            <button
              onClick={() => alert("Fitur checkout coming soon!")}
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
