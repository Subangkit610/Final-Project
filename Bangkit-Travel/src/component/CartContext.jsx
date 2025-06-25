// src/component/CartContext.jsx
import { createContext, useContext, useState } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = async (item) => {
    const exists = cartItems.some((cartItem) => cartItem.id === item.id);
    if (!exists) {
      setCartItems((prev) => [...prev, item]);
      try {
        await axios.post(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/add-cart",
          { activityId: item.id },
          {
            headers: {
              "Content-Type": "application/json",
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        console.error("Gagal menambahkan ke server:", error.response?.data || error.message);
      }
    }
  };

  const removeFromCart = async (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    try {
        await axios.delete(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-cart/" + id,
          {
            headers: {
              "Content-Type": "application/json",
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        console.error("Gagal menghapus dari server:", error.response?.data || error.message);
      }
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
