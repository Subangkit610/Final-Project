import React from "react";
import { useCart } from "../component/CartContext"; // ✅ Tambahkan ; dan pastikan path benar

const CartPage = () => {
  const { cartItems, removeFromCart } = useCart();

  const totalHarga = cartItems.reduce((sum, item) => sum + (item.price || 0), 0);

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
              <div className="mb-4 sm:mb-0">
                <h3 className="font-bold text-lg text-gray-800">{item.title}</h3>
                <p className="text-sm text-gray-500">
                  {item.category?.name || "Kategori tidak tersedia"} • {item.province}
                </p>
                <p className="text-blue-600 font-semibold mt-1">
                  Rp {item.price?.toLocaleString("id-ID") || "N/A"}
                </p>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
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
