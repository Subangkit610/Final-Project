// File: src/pages/TransactionPage.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
const BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [proofImage, setProofImage] = useState(null);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      alert("Silakan login terlebih dahulu.");
      return;
    }

    axios
      .get(`${BASE_URL}/api/v1/my-transactions`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => setTransactions(res.data.data))
      .catch((err) => console.error("Error fetching transactions:", err))
      .finally(() => setLoading(false));
  }, [token]);

  const fetchTransactionDetail = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/transaction/${id}`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      setSelectedTransaction(res.data.data);
    } catch (error) {
      console.error("Error fetching detail:", error);
    }
  };

  const handleUploadProof = async (id) => {
    if (!proofImage) return alert("Harap pilih gambar terlebih dahulu.");

    const formData = new FormData();
    formData.append("image", proofImage);

    try {
      await axios.post(
        `${BASE_URL}/api/v1/update-transaction-proof-payment/${id}`,
        formData,
        {
          headers: {
            apiKey: API_KEY,
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      alert("✅ Bukti pembayaran berhasil diunggah.");
      setProofImage(null);
      fetchTransactionDetail(id);
    } catch (error) {
      console.error("❌ Gagal upload bukti:", error);
      alert("Gagal upload bukti. Coba ulangi.");
    }
  };

  const handleCancel = async (id) => {
    if (!window.confirm("Yakin ingin membatalkan transaksi ini?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/v1/cancel-transaction/${id}`, {
        headers: {
          apiKey: API_KEY,
          Authorization: `Bearer ${token}`,
        },
      });
      alert("✅ Transaksi dibatalkan.");
      setSelectedTransaction(null);
      setTransactions((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("❌ Gagal membatalkan transaksi:", error);
      alert("Gagal membatalkan transaksi.");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold mb-6 text-center">Riwayat Transaksi Anda</h2>

      {loading ? (
        <p className="text-center text-gray-500">Memuat data...</p>
      ) : transactions.length === 0 ? (
        <p className="text-center text-gray-500">Belum ada transaksi.</p>
      ) : (
        <div className="grid gap-6 max-w-5xl mx-auto">
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className="bg-white p-4 shadow-md rounded-md hover:ring ring-blue-300 transition-all"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{tx.id}</h3>
                  <p className="text-sm text-gray-500">Status: {tx.status}</p>
                  <p className="text-sm text-gray-500">Total: Rp {tx.total.toLocaleString("id-ID")}</p>
                </div>
                <button
                  onClick={() => fetchTransactionDetail(tx.id)}
                  className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                >
                  Detail
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {selectedTransaction && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-2xl p-6 rounded-lg relative shadow-lg">
            <button
              onClick={() => setSelectedTransaction(null)}
              className="absolute top-2 right-2 text-xl font-bold text-red-600"
            >
              &times;
            </button>

            <h3 className="text-2xl font-semibold mb-4">Detail Transaksi</h3>
            <p><strong>ID:</strong> {selectedTransaction.id}</p>
            <p><strong>Status:</strong> {selectedTransaction.status}</p>
            <p><strong>Total:</strong> Rp {selectedTransaction.total.toLocaleString("id-ID")}</p>
            <p><strong>Metode:</strong> {selectedTransaction.payment_method}</p>

            <div className="mt-4">
              <label className="block text-sm font-medium mb-1">Upload Bukti Pembayaran</label>
              <input
                type="file"
                onChange={(e) => setProofImage(e.target.files[0])}
                className="mb-2"
              />
              <button
                onClick={() => handleUploadProof(selectedTransaction.id)}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Upload
              </button>
            </div>

            <button
              onClick={() => handleCancel(selectedTransaction.id)}
              className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
            >
              Batalkan Transaksi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
