"use client";
import { useState, useEffect } from "react";

// Function to mimic backend server
const fetchRandomValues = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      // Seeding random values
      resolve({
        quantity: Math.floor(Math.random() * 10) + 1,
        price: Math.floor(Math.random() * 100) + 1,
        total: 0,
        profit: Math.floor(Math.random() * 1000) + 1,
      });
    }, 500);
  });
};

export default function Home() {
  const [formData, setFormData] = useState({
    quantity: 0,
    price: 0,
    total: 0,
    profit: 0,
  });

  useEffect(() => {
    const loadData = async () => {
      const apiData = await fetchRandomValues();
      setFormData({
        ...apiData,
        total: apiData.quantity * apiData.price,
      });
    };
    loadData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = parseInt(value) || 0;
    setFormData((prevData) => {
      const updatedData = { ...prevData, [name]: newValue };
      if (name === "quantity" || name === "price") {
        updatedData.total = updatedData.quantity * updatedData.price;
      }
      return updatedData;
    });
  };

  return (
    <div className="container">
      <h1>Product Pricing</h1>
      <form>
        <label htmlFor="quantity">Quantity:</label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
        />

        <label htmlFor="price">Price:</label>
        <input
          type="number"
          id="price"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <label htmlFor="total">Total:</label>
        <input
          type="number"
          id="total"
          name="total"
          value={formData.total}
          readOnly
        />
        <label htmlFor="profit">Profit:</label>
        <input
          type="number"
          id="profit"
          name="profit"
          value={formData.profit}
          onChange={handleChange}
        />
      </form>
    </div>
  );
}
