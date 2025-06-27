import React, { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id";
const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [proofImage, setProofImage] = useState(null);
  const token = localStorage.getItem("token");

  const headers = {
    apiKey: API_KEY,
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    if (!token) return;
    fetchMyTransactions();
  }, [token]);

  const fetchMyTransactions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/my-transactions`, {
        headers,
      });
      setTransactions(res.data.data);
    } catch (error) {
      console.error("Gagal memuat transaksi:", error);
    }
  };

  const fetchTransactionDetail = async (id) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/transaction/${id}`, {
        headers,
      });
      setSelectedTransaction(res.data.data);
    } catch (error) {
      console.error("Gagal memuat detail transaksi:", error);
    }
  };

  const handleCancelTransaction = async (id) => {
    const konfirmasi = window.confirm("Yakin ingin membatalkan transaksi ini?");
    if (!konfirmasi) return;

    try {
      const res = await axios.delete(`${BASE_URL}/api/v1/cancel-transaction/${id}`, {
        headers,
      });

      if (res.data.code === "200") {
        alert("✅ Transaksi berhasil dibatalkan.");
      } else {
        alert(`⚠️ ${res.data.message || "Gagal membatalkan transaksi."}`);
      }

      setSelectedTransaction(null);
      fetchMyTransactions();
    } catch (error) {
      console.error("Gagal membatalkan transaksi:", error);
      if (error.response?.data?.message) {
        alert(`❌ ${error.response.data.message}`);
      } else {
        alert("❌ Terjadi kesalahan saat membatalkan transaksi.");
      }
    }
  };

  const handleImageUpload = async () => {
    if (!proofImage || !selectedTransaction) return;

    try {
      const formData = new FormData();
      formData.append("image", proofImage);

      const uploadRes = await axios.post(`${BASE_URL}/api/v1/upload-image`, formData, {
        headers,
      });

      const imageUrl = uploadRes.data.url;

      await axios.patch(
        `${BASE_URL}/api/v1/update-transaction-proof-payment/${selectedTransaction.id}`,
        { proofPaymentUrl: imageUrl },
        { headers }
      );

      alert("✅ Bukti pembayaran berhasil diunggah.");
      fetchTransactionDetail(selectedTransaction.id);
    } catch (error) {
      console.error("Upload bukti gagal:", error);
      alert("❌ Upload bukti gagal.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Riwayat Transaksi</h1>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-600">Belum ada transaksi.</p>
      ) : (
        <div className="space-y-4 max-w-3xl mx-auto">
          {transactions.map((tx) => (
            <div key={tx.id} className="bg-white p-4 rounded shadow">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold">ID: {tx.id}</p>
                  <p className="text-sm text-gray-500">Status: {tx.status}</p>
                  <p className="text-sm text-gray-500">
                    Total: Rp {tx.total?.toLocaleString("id-ID")}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => fetchTransactionDetail(tx.id)}
                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded"
                  >
                    Detail
                  </button>
                  {tx.status !== "CANCELLED" && (
                    <button
                      onClick={() => handleCancelTransaction(tx.id)}
                      className="px-3 py-1 bg-red-500 hover:bg-red-600 text-white rounded"
                    >
                      Batalkan
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Detail Transaksi */}
      {selectedTransaction && (
        <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded shadow">
          <h2 className="text-xl font-bold mb-4">Detail Transaksi</h2>
          <p>ID: {selectedTransaction.id}</p>
          <p>Status: {selectedTransaction.status}</p>
          <p>Total: Rp {selectedTransaction.total.toLocaleString("id-ID")}</p>

          <div className="mt-4">
            <label className="block mb-2 font-medium">Upload Bukti Pembayaran</label>
            <input
              type="file"
              onChange={(e) => setProofImage(e.target.files[0])}
              className="mb-4"
            />
            <button
              onClick={handleImageUpload}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
            >
              Upload
            </button>
          </div>

          {selectedTransaction.proofPaymentUrl && (
            <div className="mt-4">
              <p className="font-medium mb-2">Bukti Saat Ini:</p>
              <img
                src={selectedTransaction.proofPaymentUrl}
                alt="Bukti pembayaran"
                className="w-64 rounded border"
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
