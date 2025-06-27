import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [summary, setSummary] = useState({});
  const navigate = useNavigate();

  const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    apiKey: API_KEY,
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const storedUser = Cookies.get("user");
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.role !== "admin") {
        alert("Anda bukan admin");
        navigate("/");
      } else {
        setUser(parsedUser);
      }
    } else {
      navigate("/login");
    }

    fetchTransactionSummary();
  }, []);

  const fetchTransactionSummary = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-transactions",
        { headers }
      );
      const transactions = res.data.data;

      const total = transactions.length;
      const totalAmount = transactions.reduce((acc, tx) => acc + tx.total, 0);
      const pending = transactions.filter((tx) => tx.status === "PENDING").length;
      const success = transactions.filter((tx) => tx.status === "SUCCESS").length;
      const cancel = transactions.filter((tx) => tx.status === "CANCEL").length;

      setSummary({
        total,
        totalAmount,
        pending,
        success,
        cancel,
      });
    } catch (err) {
      console.error("Gagal memuat ringkasan transaksi:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-blue-900 mb-6">Admin Dashboard</h1>

      {user && (
        <div className="mb-6 bg-white rounded shadow p-4">
          <h2 className="text-xl font-semibold mb-2">Selamat datang, {user.name}</h2>
          <p className="text-gray-600">Email: {user.email}</p>
          <p className="text-gray-600">Role: {user.role}</p>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-600">Total Transaksi</h3>
          <p className="text-2xl font-bold">{summary.total || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-600">Total Pendapatan</h3>
          <p className="text-2xl font-bold">Rp {summary.totalAmount?.toLocaleString("id-ID") || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-600">Pending</h3>
          <p className="text-2xl font-bold text-yellow-600">{summary.pending || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-600">Sukses</h3>
          <p className="text-2xl font-bold text-green-600">{summary.success || 0}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-sm text-gray-600">Dibatalkan</h3>
          <p className="text-2xl font-bold text-red-600">{summary.cancel || 0}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
