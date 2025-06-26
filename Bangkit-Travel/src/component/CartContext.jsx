import React, { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0); // To track cart count

  // Load cart from localStorage on initial load
  useEffect(() => {
    const stored = localStorage.getItem("cartItems");
    if (stored) {
      const parsedItems = JSON.parse(stored);
      setCartItems(parsedItems);
      setCartCount(parsedItems.length);
    }
  }, []);

  // Save to localStorage whenever the cart changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
    setCartCount(cartItems.length); // Update cart count
  }, [cartItems]);

  const addToCart = (item) => {
    setCartItems((prevItems) => [...prevItems, item]);
  };

  const removeFromCart = (itemId) => {
    setCartItems((prevItems) => prevItems.filter(item => item.id !== itemId));
  };

  return (
    <CartContext.Provider value={{ cartItems, cartCount, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
