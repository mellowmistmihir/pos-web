// eslint-disable-next-line no-unused-vars
import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";

import {
  FiPlus,
  FiTrash2,
  FiShoppingCart,
  FiUser,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const BASE_URL =
  "http://localhost:3000/api/vehicles";

export default function POSComponent() {
  // =========================
  // STATES
  // =========================
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    customer_name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
  });

  const [cart, setCart] = useState([]);

  // =========================
  // FETCH PRODUCTS
  // =========================
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/getVehicles`
      );

      console.log("API RESPONSE:", res.data);

      setProducts(res.data.vehicles || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // ADD PRODUCT
  // =========================
  const handleAddProduct = (product) => {
    const existing = cart.find(
      (item) => item._id === product._id
    );

    if (existing) {
      const updatedCart = cart.map((item) =>
        item._id === product._id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

      setCart(updatedCart);
    } else {
      setCart([
        ...cart,
        {
          ...product,
          quantity: 1,
        },
      ]);
    }
  };

  // =========================
  // INCREASE QTY
  // =========================
  const increaseQty = (_id) => {
    const updated = cart.map((item) =>
      item._id === _id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    setCart(updated);
  };

  // =========================
  // DECREASE QTY
  // =========================
  const decreaseQty = (_id) => {
    const updated = cart
      .map((item) =>
        item._id === _id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updated);
  };

  // =========================
  // REMOVE PRODUCT
  // =========================
  const removeProduct = (_id) => {
    const filtered = cart.filter(
      (item) => item._id !== _id
    );

    setCart(filtered);
  };

  // =========================
  // TOTAL PRODUCTS
  // =========================
  const totalProducts = useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.quantity,
      0
    );
  }, [cart]);

  // =========================
  // GRAND TOTAL
  // =========================
  const grandTotal = useMemo(() => {
    return cart.reduce(
      (acc, item) =>
        acc +
        Number(item.v_price || 0) *
          item.quantity,
      0
    );
  }, [cart]);

  // =========================
  // SUBMIT PURCHASE
  // =========================
  const handleSubmitPurchase = async (e) => {
  e.preventDefault();

  if (cart.length === 0) {
    return alert("Please add products");
  }

  const purchaseData = {
    customerName: customerInfo.customer_name,

    customerEmail: customerInfo.email,

    customerPhone: customerInfo.phone,

    customerAddress: customerInfo.address,

    purchaseDate: customerInfo.date,

    purchasedProducts: cart,

    grandTotal: grandTotal,

    totalItems: totalProducts,

    paymentStatus: "Paid",
  };

  console.log("PURCHASE DATA:", purchaseData);

  try {
    await axios.post(
      "http://localhost:3000/api/customerProduct/createCustomerProduct",
      purchaseData
    );

    alert("Purchase Submitted Successfully");

    // clear cart
    setCart([]);

    // clear form
    setCustomerInfo({
      customer_name: "",
      email: "",
      phone: "",
      address: "",
      date: "",
    });

    // redirect
    navigate("/customerList");
  } catch (error) {
    console.log(error);

    alert("Failed To Submit Purchase");
  }
};

  return (
    <div className="min-h-screen bg-[#0f172a] p-6 text-white">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ===================================== */}
        {/* LEFT SIDE */}
        {/* ===================================== */}
        <div className="bg-[#111827] rounded-3xl border border-slate-800 p-6 shadow-2xl">
          {/* TOP */}
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              <FiUser className="text-2xl text-white" />
            </div>

            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Customer Details
            </h1>
          </div>

          {/* FORM */}
          <form
            onSubmit={handleSubmitPurchase}
            className="space-y-5"
          >
            {/* NAME */}
            <div>
              <label className="block mb-2 text-cyan-400 font-medium">
                Customer Name
              </label>

              <input
                type="text"
                placeholder="Enter customer name"
                value={
                  customerInfo.customer_name
                }
                onChange={(e) =>
                  setCustomerInfo({
                    ...customerInfo,
                    customer_name:
                      e.target.value,
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
              />
            </div>

            {/* EMAIL */}
            <div>
              <label className="block mb-2 text-cyan-400 font-medium">
                Email
              </label>

              <input
                type="email"
                placeholder="Enter email"
                value={customerInfo.email}
                onChange={(e) =>
                  setCustomerInfo({
                    ...customerInfo,
                    email: e.target.value,
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
              />
            </div>

            {/* PHONE */}
            <div>
              <label className="block mb-2 text-cyan-400 font-medium">
                Phone Number
              </label>

              <input
                type="number"
                placeholder="Enter phone number"
                value={customerInfo.phone}
                onChange={(e) =>
                  setCustomerInfo({
                    ...customerInfo,
                    phone: e.target.value,
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
              />
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block mb-2 text-cyan-400 font-medium">
                Address
              </label>

              <textarea
                rows="3"
                placeholder="Enter address"
                value={customerInfo.address}
                onChange={(e) =>
                  setCustomerInfo({
                    ...customerInfo,
                    address: e.target.value,
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
              />
            </div>

            {/* DATE */}
            <div>
              <label className="block mb-2 text-cyan-400 font-medium">
                Date
              </label>

              <input
                type="date"
                value={customerInfo.date}
                onChange={(e) =>
                  setCustomerInfo({
                    ...customerInfo,
                    date: e.target.value,
                  })
                }
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 outline-none focus:border-cyan-400"
              />
            </div>

            {/* ===================================== */}
            {/* CART */}
            {/* ===================================== */}
            <div className="bg-slate-900 border border-slate-700 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-5">
                <FiShoppingCart className="text-cyan-400 text-xl" />

                <h2 className="text-xl font-bold">
                  Selected Products
                </h2>
              </div>

              {/* EMPTY CART */}
              {cart.length === 0 ? (
                <div className="text-center py-8 text-slate-400">
                  No Product Selected
                </div>
              ) : (
                <div className="space-y-4 max-h-[350px] overflow-y-auto pr-1">
                  {cart.map((item) => (
                    <div
                      key={item._id}
                      className="bg-[#111827] border border-slate-700 rounded-2xl p-4"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-bold text-lg">
                            {item.v_name}
                          </h3>

                          <p className="text-cyan-400 font-semibold">
                            ৳ {item.v_price}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            removeProduct(item._id)
                          }
                          className="bg-red-500/20 hover:bg-red-500 p-2 rounded-xl transition"
                        >
                          <FiTrash2 />
                        </button>
                      </div>

                      {/* QTY */}
                      <div className="flex items-center gap-3 mt-4">
                        <button
                          type="button"
                          onClick={() =>
                            decreaseQty(item._id)
                          }
                          className="w-9 h-9 rounded-xl bg-slate-700 hover:bg-slate-600 transition"
                        >
                          -
                        </button>

                        <span className="font-bold text-lg">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() =>
                            increaseQty(item._id)
                          }
                          className="w-9 h-9 rounded-xl bg-cyan-500 hover:bg-cyan-400 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* TOTAL */}
              <div className="border-t border-slate-700 mt-5 pt-4 space-y-2">
                <div className="flex justify-between">
                  <span>Total Products</span>

                  <span className="font-bold">
                    {totalProducts}
                  </span>
                </div>

                <div className="flex justify-between text-xl font-bold text-cyan-400">
                  <span>Grand Total</span>

                  <span>
                    ৳ {grandTotal}
                  </span>
                </div>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl text-lg font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:scale-[1.02] transition-all duration-300"
            >
              Submit Purchase
            </button>
          </form>
        </div>

        {/* ===================================== */}
        {/* RIGHT SIDE */}
        {/* ===================================== */}
        <div className="lg:col-span-2">
          {/* TOP */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              Products
            </h1>

            <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl">
              Total Products:
              {" "}
              {products.length}
            </div>
          </div>

          {/* LOADING */}
          {loading ? (
            <div className="text-center py-20 text-2xl font-bold">
              Loading...
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="bg-[#111827] border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:scale-[1.02] transition-all duration-300"
                >
                  {/* IMAGE */}
                  <img
                    src={product.v_images}
                    alt={product.v_name}
                    className="w-full h-52 object-cover"
                  />

                  {/* BODY */}
                  <div className="p-5">
                    <div className="mb-3">
                      <h2 className="text-xl font-bold">
                        {product.v_name}
                      </h2>

                      <p className="text-slate-400 text-sm">
                        {
                          product.v_category
                        }
                      </p>
                    </div>

                    <div className="flex justify-between items-center mb-5">
                      <span className="text-cyan-400 text-2xl font-bold">
                        ৳ {product.v_price}
                      </span>

                      <span className="bg-slate-800 text-sm px-3 py-1 rounded-full">
                        Qty:
                        {" "}
                        {
                          product.v_quantity
                        }
                      </span>
                    </div>

                    {/* BUTTON */}
                    <button
                      onClick={() =>
                        handleAddProduct(
                          product
                        )
                      }
                      className="w-full py-3 rounded-2xl flex items-center justify-center gap-2 font-semibold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 hover:scale-[1.02] transition-all duration-300"
                    >
                      <FiPlus />

                      Add Product
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}