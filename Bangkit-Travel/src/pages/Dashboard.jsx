// src/pages/Dashboard.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [section, setSection] = useState("");
  const [users, setUsers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [categories, setCategories] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);

  const [categoryForm, setCategoryForm] = useState({ name: "", imageUrl: "", id: null });
  const [activityForm, setActivityForm] = useState({
    categoryId: "",
    title: "",
    description: "",
    imageUrls: "",
    price: "",
    price_discount: "",
    rating: "",
    total_reviews: "",
    facilities: "",
    address: "",
    province: "",
    city: "",
    location_maps: "",
    id: null,
  });
  const [promoData, setPromoData] = useState({
    title: "",
    description: "",
    imageUrl: "",
    terms_condition: "",
    promo_code: "",
    promo_discount_price: "",
    minimum_claim_price: "",
  });
const [promos, setPromos] = useState([]);

  const navigate = useNavigate();
  const API_KEY = "24405e01-fbc1-45a5-9f5a-be13afcd757c";
  const BASE_URL = "https://travel-journal-api-bootcamp.do.dibimbing.id";
  const token = localStorage.getItem("token");

  const headers = {
    "Content-Type": "application/json",
    apiKey: API_KEY,
    Authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const storedUser = Cookies.get("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    if (!token || !currentUser || currentUser.role !== "admin") {
      alert("❌ Akses ditolak.");
      navigate("/login");
    }
  }, [navigate, token]);

  const fetchAllUsers = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/all-user`, { headers });
      setUsers(res.data.data);
      setSection("users");
    } catch {
      alert("Gagal memuat users");
    } finally {
      setLoading(false);
    }
  };

  const fetchAllTransactions = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/all-transactions`, { headers });
      setTransactions(res.data.data);
      setSection("orders");
    } catch {
      alert("Gagal memuat transaksi");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/categories`, { headers });
      setCategories(res.data.data);
      setSection("categories");
    } catch {
      alert("Gagal memuat kategori");
    } finally {
      setLoading(false);
    }
  };

  const fetchActivities = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/api/v1/activities`, { headers });
      setActivities(res.data.data);
      setSection("activities");
    } catch {
      alert("Gagal memuat aktivitas");
    } finally {
      setLoading(false);
    }
  };

const fetchPromos = async () => {
  setLoading(true);
  try {
    const res = await axios.get(`${BASE_URL}/api/v1/promos`, { headers });
    setPromos(res.data.data); // Gantilah dengan state yang sesuai untuk promos
    setSection("promos");
  } catch {
    alert("Gagal memuat promo");
  } finally {
    setLoading(false);
  }
};

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    const { id, name, imageUrl } = categoryForm;
    try {
      if (id) {
        await axios.patch(`${BASE_URL}/api/v1/update-category/${id}`, { name, imageUrl }, { headers });
        alert("✅ Kategori berhasil diperbarui.");
      } else {
        await axios.post(`${BASE_URL}/api/v1/create-category`, { name, imageUrl }, { headers });
        alert("✅ Kategori berhasil ditambahkan.");
      }
      setCategoryForm({ name: "", imageUrl: "", id: null });
      fetchCategories();
    } catch {
      alert("Gagal menyimpan kategori");
    }
  };

  const deleteCategory = async (id) => {
    if (!window.confirm("Hapus kategori ini?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/v1/delete-category/${id}`, { headers });
      fetchCategories();
    } catch {
      alert("Gagal menghapus kategori");
    }
  };

  const handleActivitySubmit = async (e) => {
    e.preventDefault();
    const data = { ...activityForm };
    data.imageUrls = data.imageUrls.split(",").map((url) => url.trim());

    try {
      if (activityForm.id) {
        await axios.patch(`${BASE_URL}/api/v1/update-activity/${activityForm.id}`, data, { headers });
        alert("✅ Aktivitas diperbarui.");
      } else {
        await axios.post(`${BASE_URL}/api/v1/create-activity`, data, { headers });
        alert("✅ Aktivitas ditambahkan.");
      }
      setActivityForm({
        categoryId: "", title: "", description: "", imageUrls: "", price: "", price_discount: "",
        rating: "", total_reviews: "", facilities: "", address: "", province: "", city: "", location_maps: "", id: null
      });
      fetchActivities();
    } catch {
      alert("Gagal menyimpan aktivitas");
    }
  };

  const deleteActivity = async (id) => {
    if (!window.confirm("Hapus aktivitas ini?")) return;
    try {
      await axios.delete(`${BASE_URL}/api/v1/delete-activity/${id}`, { headers });
      fetchActivities();
    } catch {
      alert("Gagal menghapus aktivitas");
    }
  };

const updatePromo = async (promoId) => {
  // Validasi form data
  if (!promoData.title || !promoData.promo_code || !promoData.promo_discount_price) {
    alert("Semua field promo harus diisi.");
    return;
  }

  const updatedPromoData = {
    title: promoData.title,
    description: promoData.description,
    imageUrl: promoData.imageUrl,
    terms_condition: promoData.terms_condition,
    promo_code: promoData.promo_code,
    promo_discount_price: parseFloat(promoData.promo_discount_price),
    minimum_claim_price: parseFloat(promoData.minimum_claim_price),
  };

  try {
    await axios.patch(`${BASE_URL}/api/v1/update-promo/${promoId}`, updatedPromoData, { headers });
    alert("✅ Promo berhasil diperbarui.");
    // Reset form data setelah update
    setPromoData({
      title: "",
      description: "",
      imageUrl: "",
      terms_condition: "",
      promo_code: "",
      promo_discount_price: "",
      minimum_claim_price: "",
    });
    fetchPromos(); // Memperbarui daftar promo setelah update
  } catch (error) {
    alert(`Gagal memperbarui promo. Error: ${error.response?.data?.message || "Unknown error"}`);
  }
};


const DeletePromo = async (promoId) => {
  if (!window.confirm("Hapus promo ini?")) return;

  try {
    await axios.delete(`${BASE_URL}/api/v1/delete-promo/${promoId}`, { headers });
    alert("✅ Promo berhasil dihapus.");
    // Memanggil fungsi untuk memperbarui daftar promo setelah penghapusan
    fetchPromos();
  } catch (error) {
    alert(`Gagal menghapus promo. Error: ${error.response?.data?.message || "Unknown error"}`);
  }
};


 const handlePromoSubmit = async (e) => {
  e.preventDefault();
  // Validasi input
  if (!promoData.title || !promoData.promo_code || !promoData.promo_discount_price) {
    alert("Semua field promo harus diisi.");
    return;
  }

  // Body request API
  const promoBody = {
    title: promoData.title,
    description: promoData.description,
    imageUrl: promoData.imageUrl,
    terms_condition: promoData.terms_condition,
    promo_code: promoData.promo_code,
    promo_discount_price: parseFloat(promoData.promo_discount_price),
    minimum_claim_price: parseFloat(promoData.minimum_claim_price),
  };

  // Mengirim data ke API
  try {
    await axios.post(`${BASE_URL}/api/v1/create-promo`, promoBody, { headers });
    // Reset form setelah berhasil
    setPromoData({
      title: "",
      description: "",
      imageUrl: "",
      terms_condition: "",
      promo_code: "",
      promo_discount_price: "",
      minimum_claim_price: "",
    });
    alert("🎁 Promo berhasil ditambahkan");
  } catch (error) {
    alert(`Gagal menyimpan promo. Error: ${error.response?.data?.message || "Unknown error"}`);
  }
};

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center">Dashboard Admin</h1>

      {/* Menu Navigasi */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-4xl mx-auto mb-8">
        <button onClick={fetchAllUsers} className="bg-blue-600 text-white py-3 rounded">Manage Users</button>
        <button onClick={fetchAllTransactions} className="bg-green-600 text-white py-3 rounded">Manage Orders</button>
        <button onClick={fetchCategories} className="bg-yellow-500 text-white py-3 rounded">Manage Categories</button>
        <button onClick={fetchActivities} className="bg-purple-600 text-white py-3 rounded">Manage Activities</button>
        <button onClick={fetchPromos} className="bg-red-600 text-white py-3 rounded">Manage Promos</button>
      </div>

      {loading && <p className="text-center text-gray-500">Memuat data...</p>}

      {/* Manage Users */}
      {section === "users" && (
        <div className="overflow-x-auto bg-white rounded shadow p-6 max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Semua User</h2>
          <table className="table-auto w-full text-sm">
            <thead className="bg-blue-100">
              <tr>
                <th className="p-2">No</th>
                <th className="p-2">Nama</th>
                <th className="p-2">Email</th>
                <th className="p-2">No HP</th>
                <th className="p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr key={u.id} className="border-t">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.phoneNumber}</td>
                  <td className="p-2">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Manage Orders */}
      {section === "orders" && (
        <div className="bg-white rounded shadow p-6 max-w-6xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Semua Transaksi</h2>
          <table className="w-full table-auto text-sm">
            <thead className="bg-green-100">
              <tr>
                <th className="p-2">No</th>
                <th className="p-2">Invoice</th>
                <th className="p-2">Total</th>
                <th className="p-2">Status</th>
                <th className="p-2">Metode</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((t, i) => (
                <tr key={t.id} className="border-t">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2"><a href={t.proofPaymentUrl} target="_blank" className="underline text-blue-600">{t.invoiceId}</a></td>
                  <td className="p-2">Rp {t.totalAmount.toLocaleString("id-ID")}</td>
                  <td className="p-2">{t.status}</td>
                  <td className="p-2">{t.payment_method?.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Manage Categories */}
      {section === "categories" && (
        <div className="bg-white rounded shadow p-6 max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Tambah/Update Kategori</h2>
          <form onSubmit={handleCategorySubmit} className="space-y-4">
            <input type="text" className="w-full border p-2 rounded" placeholder="Nama Kategori"
              value={categoryForm.name} onChange={(e) => setCategoryForm({ ...categoryForm, name: e.target.value })} />
            <input type="text" className="w-full border p-2 rounded" placeholder="URL Gambar"
              value={categoryForm.imageUrl} onChange={(e) => setCategoryForm({ ...categoryForm, imageUrl: e.target.value })} />
            <button className="bg-yellow-600 text-white px-4 py-2 rounded" type="submit">
              {categoryForm.id ? "Update" : "Tambah"}
            </button>
          </form>
          <div className="mt-6">
            <h3 className="font-bold mb-2">Semua Kategori</h3>
            {categories.map((cat) => (
              <div key={cat.id} className="flex items-center justify-between p-2 border-b">
                <span>{cat.name}</span>
                <div className="space-x-2">
                  <button onClick={() => setCategoryForm(cat)} className="text-blue-500">Edit</button>
                  <button onClick={() => deleteCategory(cat.id)} className="text-red-500">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Manage Activities */}
      {section === "activities" && (
        <div className="bg-white rounded shadow p-6 max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold mb-4">Tambah/Update Aktivitas</h2>
          <form onSubmit={handleActivitySubmit} className="space-y-2">
            <input className="w-full border p-2" placeholder="categoryId" value={activityForm.categoryId}
              onChange={(e) => setActivityForm({ ...activityForm, categoryId: e.target.value })} />
            <input className="w-full border p-2" placeholder="title" value={activityForm.title}
              onChange={(e) => setActivityForm({ ...activityForm, title: e.target.value })} />
            <textarea className="w-full border p-2" placeholder="description" value={activityForm.description}
              onChange={(e) => setActivityForm({ ...activityForm, description: e.target.value })} />
            <input className="w-full border p-2" placeholder="imageUrls (pisah koma)" value={activityForm.imageUrls}
              onChange={(e) => setActivityForm({ ...activityForm, imageUrls: e.target.value })} />
            <input className="w-full border p-2" placeholder="price" value={activityForm.price}
              onChange={(e) => setActivityForm({ ...activityForm, price: e.target.value })} />
            <input className="w-full border p-2" placeholder="price_discount" value={activityForm.price_discount}
              onChange={(e) => setActivityForm({ ...activityForm, price_discount: e.target.value })} />
            <input className="w-full border p-2" placeholder="rating" value={activityForm.rating}
              onChange={(e) => setActivityForm({ ...activityForm, rating: e.target.value })} />
            <input className="w-full border p-2" placeholder="total_reviews" value={activityForm.total_reviews}
              onChange={(e) => setActivityForm({ ...activityForm, total_reviews: e.target.value })} />
            <input className="w-full border p-2" placeholder="facilities" value={activityForm.facilities}
              onChange={(e) => setActivityForm({ ...activityForm, facilities: e.target.value })} />
            <input className="w-full border p-2" placeholder="address" value={activityForm.address}
              onChange={(e) => setActivityForm({ ...activityForm, address: e.target.value })} />
            <input className="w-full border p-2" placeholder="province" value={activityForm.province}
              onChange={(e) => setActivityForm({ ...activityForm, province: e.target.value })} />
            <input className="w-full border p-2" placeholder="city" value={activityForm.city}
              onChange={(e) => setActivityForm({ ...activityForm, city: e.target.value })} />
            <input className="w-full border p-2" placeholder="location_maps" value={activityForm.location_maps}
              onChange={(e) => setActivityForm({ ...activityForm, location_maps: e.target.value })} />
            <button type="submit" className="bg-purple-600 text-white py-2 px-4 rounded">
              {activityForm.id ? "Update Aktivitas" : "Tambah Aktivitas"}
            </button>
          </form>

          <div className="mt-6">
            <h3 className="font-bold mb-2">Daftar Aktivitas</h3>
            {activities.map((act) => (
              <div key={act.id} className="border-b py-2 flex justify-between">
                <div>
                  <p className="font-semibold">{act.title}</p>
                  <p className="text-xs text-gray-500">{act.city}, {act.province}</p>
                </div>
                <div className="space-x-2">
                  <button onClick={() => setActivityForm({ ...act, imageUrls: act.imageUrls.join(","), id: act.id })} className="text-blue-500">Edit</button>
                  <button onClick={() => deleteActivity(act.id)} className="text-red-500">Hapus</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

     {/* Manage Promos */}
{section === "promos" && (
  <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto">
    <h2 className="text-xl font-bold mb-4">Tambah Promo</h2>
    <form onSubmit={handlePromoSubmit} className="grid gap-4">
      <input
        placeholder="Judul Promo"
        value={promoData.title}
        onChange={(e) => setPromoData({ ...promoData, title: e.target.value })}
        className="border p-2 rounded"
      />
      <textarea
        placeholder="Deskripsi Promo"
        value={promoData.description}
        onChange={(e) => setPromoData({ ...promoData, description: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        placeholder="URL Gambar"
        value={promoData.imageUrl}
        onChange={(e) => setPromoData({ ...promoData, imageUrl: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        placeholder="Syarat dan Ketentuan"
        value={promoData.terms_condition}
        onChange={(e) => setPromoData({ ...promoData, terms_condition: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        placeholder="Kode Promo"
        value={promoData.promo_code}
        onChange={(e) => setPromoData({ ...promoData, promo_code: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        placeholder="Harga Diskon"
        value={promoData.promo_discount_price}
        onChange={(e) => setPromoData({ ...promoData, promo_discount_price: e.target.value })}
        className="border p-2 rounded"
      />
      <input
        placeholder="Harga Minimum"
        value={promoData.minimum_claim_price}
        onChange={(e) => setPromoData({ ...promoData, minimum_claim_price: e.target.value })}
        className="border p-2 rounded"
      />
      <button className="bg-pink-600 text-white px-4 py-2 rounded">Tambah Promo</button>
    </form>

    {/* Daftar Promo */}
    <div className="mt-6">
      <h3 className="font-bold mb-2">Daftar Promo</h3>
      {promos.map((promo) => (
        <div key={promo.id} className="flex items-center justify-between p-2 border-b">
          <span>{promo.title}</span>
          <div className="space-x-2">
            <button onClick={() => setPromoData({
              title: promo.title,
              description: promo.description,
              imageUrl: promo.imageUrl,
              terms_condition: promo.terms_condition,
              promo_code: promo.promo_code,
              promo_discount_price: promo.promo_discount_price,
              minimum_claim_price: promo.minimum_claim_price,
              id: promo.id
            })} className="text-blue-500">Edit</button>
            <button onClick={() => DeletePromo(promo.id)} className="text-red-500">Hapus</button>
          </div>
        </div>
      ))}
    </div>

    {/* Formulir untuk Update Promo */}
    {promoData.id && (
      <div className="bg-white p-6 rounded shadow max-w-3xl mx-auto mt-8">
        <h2 className="text-xl font-bold mb-4">Update Promo</h2>
        <form onSubmit={() => updatePromo(promoData.id)} className="grid gap-4">
          <input
            placeholder="Judul Promo"
            value={promoData.title}
            onChange={(e) => setPromoData({ ...promoData, title: e.target.value })}
            className="border p-2 rounded"
          />
          <textarea
            placeholder="Deskripsi Promo"
            value={promoData.description}
            onChange={(e) => setPromoData({ ...promoData, description: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="URL Gambar"
            value={promoData.imageUrl}
            onChange={(e) => setPromoData({ ...promoData, imageUrl: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Syarat dan Ketentuan"
            value={promoData.terms_condition}
            onChange={(e) => setPromoData({ ...promoData, terms_condition: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Kode Promo"
            value={promoData.promo_code}
            onChange={(e) => setPromoData({ ...promoData, promo_code: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Harga Diskon"
            value={promoData.promo_discount_price}
            onChange={(e) => setPromoData({ ...promoData, promo_discount_price: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            placeholder="Harga Minimum"
            value={promoData.minimum_claim_price}
            onChange={(e) => setPromoData({ ...promoData, minimum_claim_price: e.target.value })}
            className="border p-2 rounded"
          />
          <button className="bg-pink-600 text-white px-4 py-2 rounded">Update Promo</button>
        </form>
      </div>
    )}
  </div>
)}

    </div>
  );
};

export default Dashboard;
