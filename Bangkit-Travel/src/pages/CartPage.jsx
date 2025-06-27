import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState({});
  const [quantities, setQuantities] = useState({});
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
  const BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id";
  const token = localStorage.getItem("token");

  // Gunakan useMemo agar tidak dianggap missing dependency
  const headers = useMemo(() => ({
    "Content-Type": "application/json",
    apiKey: API_KEY,
    Authorization: `Bearer ${token}`,
  }), [token]);

  useEffect(() => {
    if (!token) {
      alert("Silakan login terlebih dahulu.");
      navigate("/login");
      return;
    }

    const fetchData = async () => {
      try {
        const cartRes = await axios.get(`${BASE_URL}/api/v1/carts`, { headers });
        const data = cartRes.data.data;
        setCartItems(data);

        const selectionMap = {};
        const qtyMap = {};
        data.forEach((item) => {
          selectionMap[item.id] = false;
          qtyMap[item.id] = item.quantity || 1;
        });
        setSelectedItems(selectionMap);
        setQuantities(qtyMap);

        const paymentRes = await axios.get(`${BASE_URL}/api/v1/payment-methods`, { headers });
        setPaymentMethods(paymentRes.data.data);
      } catch (error) {
        console.error("❌ Gagal memuat data:", error);
        alert("Gagal memuat data. Silakan cek koneksi atau login ulang.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [headers, navigate, token]);

  const handleCheckboxChange = (id) => {
    setSelectedItems((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleQuantityChange = (id, delta) => {
    setQuantities((prev) => {
      const newQty = Math.max(1, prev[id] + delta);
      updateQuantityToServer(id, newQty);
      return { ...prev, [id]: newQty };
    });
  };

  const updateQuantityToServer = async (cartId, quantity) => {
    try {
      await axios.patch(
        `${BASE_URL}/api/v1/update-cart/${cartId}`,
        { quantity },
        { headers }
      );
    } catch (error) {
      console.error("❌ Gagal update quantity:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}/api/v1/delete-cart/${id}`, { headers });
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      alert("Gagal menghapus item.");
    }
  };

  const totalHarga = cartItems.reduce((sum, item) => {
    const qty = quantities[item.id] || 1;
    return selectedItems[item.id] ? sum + item.activity.price * qty : sum;
  }, 0);

  const handleCheckout = async () => {
    const selectedCartIds = Object.entries(selectedItems)
      .filter(([, isChecked]) => isChecked)
      .map(([id]) => id);

    if (selectedCartIds.length === 0) {
      alert("❗Pilih item terlebih dahulu.");
      return;
    }

    if (!selectedPayment) {
      alert("❗Pilih metode pembayaran.");
      return;
    }

    try {
      await axios.post(
        `${BASE_URL}/api/v1/create-transaction`,
        {
          cartIds: selectedCartIds,
          paymentMethodId: selectedPayment,
        },
        { headers }
      );
      alert("✅ Transaksi berhasil dibuat!");
      navigate("/transactions");
    } catch (error) {
      console.error("❌ Gagal membuat transaksi:", error);
      alert("Terjadi kesalahan saat checkout.");
    }
  };

  if (loading) {
    return <p className="text-center p-10 text-gray-500">Memuat keranjang...</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Keranjang Anda</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600">Keranjang kosong</p>
      ) : (
        <>
          <div className="max-w-4xl mx-auto space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white p-4 rounded shadow flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div className="flex gap-3 items-start">
                  <input
                    type="checkbox"
                    checked={selectedItems[item.id] || false}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                  <div>
                    <h3 className="font-bold">{item.activity.title}</h3>
                    <p className="text-sm text-gray-500">
                      {item.activity.category?.name} • {item.activity.province}
                    </p>
                    <p className="text-blue-600 font-semibold">
                      Rp {item.activity.price.toLocaleString("id-ID")}
                    </p>

                    <div className="mt-2 flex items-center gap-2">
                      <button onClick={() => handleQuantityChange(item.id, -1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">-</button>
                      <span>{quantities[item.id]}</span>
                      <button onClick={() => handleQuantityChange(item.id, 1)} className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300">+</button>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="text-sm mt-2 sm:mt-0 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
                >
                  Hapus
                </button>
              </div>
            ))}
          </div>

          <div className="max-w-4xl mx-auto bg-white p-4 mt-6 rounded shadow">
            <h4 className="font-semibold text-lg mb-2">Pilih Metode Pembayaran</h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {paymentMethods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => setSelectedPayment(method.id)}
                  className={`border p-3 rounded-lg cursor-pointer hover:border-blue-500 transition ${
                    selectedPayment === method.id ? "border-blue-600 shadow" : "border-gray-300"
                  }`}
                >
                  <img src={method.imageUrl} alt={method.name} className="w-20 mx-auto h-10 object-contain mb-2" />
                  <p className="text-center text-sm font-semibold">{method.name}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="max-w-4xl mx-auto mt-6 bg-white p-4 rounded shadow">
            <div className="flex justify-between font-semibold text-lg mb-4">
              <span>Total</span>
              <span>Rp {totalHarga.toLocaleString("id-ID")}</span>
            </div>
            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded font-bold"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;
