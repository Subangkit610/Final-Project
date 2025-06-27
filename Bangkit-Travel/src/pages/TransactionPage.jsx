import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const TransactionPage = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(null);
  const [detailsVisible, setDetailsVisible] = useState({});
  const [transactionDetails, setTransactionDetails] = useState({});
  const [uploadedImages, setUploadedImages] = useState({});

  const navigate = useNavigate();

  const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
  const BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id";
  const token = localStorage.getItem("token");

  const headers = useMemo(() => ({
    apiKey: API_KEY,
    Authorization: `Bearer ${token}`,
  }), [token]);

  const currentUser = useMemo(() => {
    try {
      return JSON.parse(Cookies.get("user"));
    } catch {
      return {};
    }
  }, []);

  const fetchMyTransactions = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/my-transactions`, { headers });
      setTransactions(res.data.data);
    } catch (error) {
      console.error("❌ Gagal memuat transaksi:", error);
      alert("Gagal memuat transaksi.");
    } finally {
      setLoading(false);
    }
  };

  const generatePaymentMethods = async () => {
    try {
      await axios.post(`${BASE_URL}/api/v1/generate-payment-methods`, {}, { headers });
    } catch (error) {
      console.error("❌ Gagal generate metode pembayaran:", error.response || error);
    }
  };

  const uploadTransactionProof = async (transactionId, file) => {
    if (!file.type.startsWith("image/")) {
      alert("❌ Hanya file gambar yang diperbolehkan.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("❌ Ukuran maksimal gambar adalah 2MB.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(transactionId);
      await axios.post(
        `${BASE_URL}/api/v1/update-transaction-proof-payment/${transactionId}`,
        formData,
        { headers }
      );
      alert("✅ Bukti pembayaran berhasil diunggah.");
      fetchMyTransactions();
    } catch (error) {
      console.error("❌ Upload bukti gagal:", error.response?.data || error.message);
      alert("Gagal upload bukti pembayaran.");
    } finally {
      setUploading(null);
    }
  };

  const cancelTransaction = async (transactionId) => {
    if (!window.confirm("Yakin ingin membatalkan transaksi ini?")) return;

    try {
      await axios.post(`${BASE_URL}/api/v1/cancel-transaction`, {
        transactionId,
      }, { headers });

      alert("✅ Transaksi berhasil dibatalkan.");
      fetchMyTransactions();
    } catch (error) {
      console.error("❌ Gagal membatalkan transaksi:", error.response?.data || error.message);
      alert("Gagal membatalkan transaksi.");
    }
  };

  const uploadImageGeneral = async (transactionId, file) => {
    if (!file.type.startsWith("image/")) {
      alert("❌ Hanya gambar yang diperbolehkan.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      alert("❌ Maksimum ukuran gambar adalah 2MB.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await axios.post(`${BASE_URL}/api/v1/upload-image`, formData, { headers });
      setUploadedImages((prev) => ({
        ...prev,
        [transactionId]: res.data.url,
      }));
      alert("✅ Gambar berhasil diunggah.");
    } catch (err) {
      console.error("❌ Gagal upload gambar umum:", err.response?.data || err.message);
      alert("Gagal upload gambar.");
    }
  };

  const fetchTransactionDetail = async (transactionId) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/transaction/${transactionId}`, { headers });
      setTransactionDetails((prev) => ({ ...prev, [transactionId]: res.data.data }));
    } catch (error) {
      console.error("❌ Gagal mengambil detail transaksi:", error.response?.data || error.message);
    }
  };

  const toggleDetail = (transactionId) => {
    const isVisible = detailsVisible[transactionId];
    if (!isVisible && !transactionDetails[transactionId]) {
      fetchTransactionDetail(transactionId);
    }
    setDetailsVisible((prev) => ({ ...prev, [transactionId]: !isVisible }));
  };

  useEffect(() => {
    if (!token) {
      alert("Silakan login terlebih dahulu.");
      navigate("/login");
      return;
    }

    generatePaymentMethods();
    fetchMyTransactions();
  }, [token]);

  if (loading) {
    return <p className="text-center p-10 text-gray-500">Memuat transaksi...</p>;
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h2 className="text-3xl font-bold mb-6 text-center">Daftar Transaksi</h2>

      {transactions.length === 0 ? (
        <p className="text-center text-gray-600">Tidak ada transaksi</p>
      ) : (
        <div className="max-w-4xl mx-auto space-y-4">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="bg-white p-6 rounded shadow space-y-3">
              <h3 className="text-lg font-bold">{transaction.invoiceId}</h3>
              <p>Status: <strong>{transaction.status}</strong></p>
              <p>Total: Rp {transaction.totalAmount.toLocaleString("id-ID")}</p>
              <p>Metode Pembayaran: {transaction.payment_method?.name || "Tidak tersedia"}</p>

              {/* Upload bukti pembayaran */}
              <div>
                <label className="block font-medium mb-1">Upload Bukti Pembayaran</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) uploadTransactionProof(transaction.id, file);
                  }}
                />
                {uploading === transaction.id && (
                  <p className="text-sm text-blue-600">Mengunggah bukti pembayaran...</p>
                )}
              </div>

              {/* Upload umum per transaksi */}
              <div className="mt-4 border-t pt-4">
                <label className="block font-medium mb-1">Upload Gambar Umum</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) uploadImageGeneral(transaction.id, file);
                  }}
                />
                {uploadedImages[transaction.id] && (
                  <div className="mt-2">
                    <p className="text-sm text-green-600">URL Gambar:</p>
                    <a
                      href={uploadedImages[transaction.id]}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline break-words"
                    >
                      {uploadedImages[transaction.id]}
                    </a>
                  </div>
                )}
              </div>

              {/* Tombol aksi */}
              <div className="pt-2 space-x-2">
                <button
                  onClick={() => toggleDetail(transaction.id)}
                  className="bg-gray-700 text-white px-3 py-1 rounded text-sm"
                >
                  {detailsVisible[transaction.id] ? "Sembunyikan Detail" : "Lihat Detail"}
                </button>
                <button
                  onClick={() => cancelTransaction(transaction.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm"
                >
                  Batalkan
                </button>
              </div>

              {/* Detail transaksi */}
              {detailsVisible[transaction.id] && (
                <div className="mt-3 bg-gray-50 p-4 rounded text-sm space-y-1">
                  <p><strong>Nama User:</strong> {transactionDetails[transaction.id]?.user?.name || currentUser.name || "-"}</p>
                  <p><strong>Email:</strong> {transactionDetails[transaction.id]?.user?.email || currentUser.email || "-"}</p>
                  <p><strong>Dibuat pada:</strong> {new Date(transactionDetails[transaction.id]?.createdAt).toLocaleString()}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default TransactionPage;
