// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import {
  FiEdit,
  FiEye,
  FiMoreVertical,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import FinalLoader from "../../shared/Loader/FinalLoader";
import CommonTopNab from "../../shared/CommonTopNav/CommonTopNab";

const BASE_URL = "http://localhost:3000";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [singleProduct, setSingleProduct] =
    useState(null);

  const [openMenu, setOpenMenu] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const navigate = useNavigate();

  // Fetch Products
  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/api/vehicles/getVehicles`
      );

      setProducts(res.data.vehicles || []);
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // View Product
  const handleViewProduct = async (id) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/vehicles/single/${id}`
      );

      setSingleProduct(res.data);

      document
        .getElementById("view_product_modal")
        .showModal();
    } catch (error) {
      console.log(error);
      toast.error("Failed to fetch product");
    }
  };

  // Edit Product
  const handleEditProduct = (id) => {
    navigate(`/dashboard/edit-product/${id}`);
  };

  // Delete Product
  const handleDeleteProduct = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) return;

    try {
      const res = await axios.delete(
        `${BASE_URL}/api/vehicles/delete/${id}`
      );

      toast.success(res.data.message);

      setProducts(
        products.filter(
          (item) => item._id !== id
        )
      );
    } catch (error) {
      console.log(error);
      toast.error("Delete failed");
    }
  };

  if (loading) return <FinalLoader />;

  return (
    <div>
        <CommonTopNab></CommonTopNab>
        <div className="w-full min-h-screen  p-4 md:p-8">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1
            className="
              text-4xl
              font-black
              bg-gradient-to-r
              from-cyan-400
              via-blue-500
              to-purple-500
              bg-clip-text
              text-transparent
            "
          >
            All Products
          </h1>

          <p className="text-gray-400 mt-2">
            Manage your all vehicle products
          </p>
        </div>

        <div
          className="
            px-5
            py-3
            rounded-2xl
            bg-gradient-to-r
            from-cyan-500/10
            to-purple-500/10
            border
            border-cyan-500/20
            backdrop-blur-xl
            shadow-lg
            w-fit
          "
        >
          <h1 className=" font-semibold">
            Total Products :
            <span className="text-cyan-400 ml-2">
              {products.length}
            </span>
          </h1>
        </div>
      </div>

      {/* Table Container */}
      <div
        className="
          w-full
          overflow-x-auto
          rounded-[30px]
          border
          border-white/10
         
          backdrop-blur-xl
          shadow-[0_0_40px_rgba(0,0,0,0.4)]
        "
      >
        <table className="table w-full">
          {/* Head */}
          <thead
            className="
              bg-gradient-to-r
              from-[#0F172A]
              to-[#111827]
            "
          >
            <tr className="text-gray-300 border-b border-white/10">
              <th>#</th>
              <th>Image</th>
              <th>Name</th>
              <th>Brand</th>
              <th>Category</th>
              <th>Price</th>
              <th>Cost</th>
              <th>Quantity</th>
              <th>Unit</th>
              <th className="text-center">
                Action
              </th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {products.map(
              (product, index) => (
                <tr
                  key={product._id}
                  className="
                    border-b
                    border-white/5
                    hover:bg-white/5
                    transition-all
                    duration-300
                    hover:scale-[0.995]
                  "
                >
                  {/* Index */}
                  <td className="font-semibold ">
                    {index + 1}
                  </td>

                  {/* Image */}
                  <td>
                    <div
                      className="
                        w-20
                        h-20
                        rounded-3xl
                        overflow-hidden
                        border
                        border-white/10
                        shadow-lg
                        hover:scale-105
                        transition
                      "
                    >
                      <img
                        src={product?.v_images}
                        alt={product?.v_name}
                        className="
                          w-full
                          h-full
                          object-cover
                        "
                      />
                    </div>
                  </td>

                  {/* Name */}
                  <td>
                    <h1
                      className="
                        font-bold
                      
                        
                      "
                    >
                      {product?.v_name}
                    </h1>
                  </td>

                  {/* Brand */}
                  <td className=" font-medium">
                    {product?.v_brand}
                  </td>

                  {/* Category */}
                  <td>
                    <span
                      className="
                        px-4
                        py-2
                        rounded-full
                        text-xs
                        font-semibold
                        bg-cyan-500/10
                        text-cyan-300
                        border
                        border-cyan-500/20
                      "
                    >
                      {product?.v_category}
                    </span>
                  </td>

                  {/* Price */}
                  <td>
                    <span
                      className="
                        text-green-400
                        font-bold
                        text-base
                      "
                    >
                      {product?.v_price}
                    </span>
                  </td>

                  {/* Cost */}
                  <td>
                    <span
                      className="
                        text-red-400
                        font-bold
                        text-base
                      "
                    >
                      {product?.v_cost}
                    </span>
                  </td>

                  {/* Quantity */}
                  <td>
                    {product?.v_quantity > 0 ? (
                      <span
                        className="
                          
                          font-semibold
                        "
                      >
                        {product?.v_quantity}
                      </span>
                    ) : (
                      <span
                        className="
                          px-3
                          py-1
                          rounded-full
                          bg-red-500/10
                          text-red-400
                          text-xs
                          font-semibold
                        "
                      >
                        Stock Out
                      </span>
                    )}
                  </td>

                  {/* Unit */}
                  <td >
                    {product?.v_unit}
                  </td>

                  {/* Action */}
                  <td className="relative">
                    <div className="flex justify-center">
                      <button
                        onClick={() =>
                          setOpenMenu(
                            openMenu ===
                              product._id
                              ? null
                              : product._id
                          )
                        }
                        className="
                          w-11
                          h-11
                          rounded-2xl
                          bg-[#1E293B]
                          hover:bg-gradient-to-r
                          hover:from-cyan-500
                          hover:to-blue-500
                          flex
                          items-center
                          justify-center
                          text-white
                          transition-all
                          duration-300
                          shadow-lg
                        "
                      >
                        <FiMoreVertical size={18} />
                      </button>
                    </div>

                    {/* Dropdown */}
                    {openMenu ===
                      product._id && (
                      <div
                        className="
                          absolute
                          right-16
                          top-12
                          z-50
                          w-52
                          rounded-3xl
                          border
                          border-white/10
                          bg-[#0F172A]
                          backdrop-blur-xl
                          overflow-hidden
                          shadow-[0_0_30px_rgba(0,0,0,0.5)]
                          animate-in
                          fade-in
                          zoom-in
                          duration-200
                        "
                      >
                        {/* View */}
                        <button
                          onClick={() => {
                            handleViewProduct(
                              product._id
                            );

                            setOpenMenu(
                              null
                            );
                          }}
                          className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-5
                            py-4
                            text-sm
                            text-gray-200
                            hover:bg-cyan-500/10
                            transition
                          "
                        >
                          <FiEye className="text-cyan-400 text-lg" />
                          View Product
                        </button>

                        {/* Edit */}
                        <button
                          onClick={() =>
                            handleEditProduct(
                              product._id
                            )
                          }
                          className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-5
                            py-4
                            text-sm
                            text-gray-200
                            hover:bg-yellow-500/10
                            transition
                          "
                        >
                          <FiEdit className="text-yellow-400 text-lg" />
                          Edit Product
                        </button>

                        {/* Delete */}
                        <button
                          onClick={() =>
                            handleDeleteProduct(
                              product._id
                            )
                          }
                          className="
                            w-full
                            flex
                            items-center
                            gap-3
                            px-5
                            py-4
                            text-sm
                            text-red-400
                            hover:bg-red-500/10
                            transition
                          "
                        >
                          <FiTrash2 className="text-lg" />
                          Delete Product
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>

        {/* Empty */}
        {products.length === 0 && (
          <div className="py-24 text-center">
            <h1 className="text-2xl font-bold text-white">
              No Products Found
            </h1>

            <p className="text-gray-400 mt-2">
              Add some products to see
              them here
            </p>
          </div>
        )}
      </div>

      {/* View Modal */}
      <dialog
        id="view_product_modal"
        className="modal"
      >
        <div
          className="
            modal-box
            max-w-5xl
            p-0
            bg-transparent
            shadow-none
            border-none
          "
        >
          <div
            className="
              relative
              overflow-hidden
              rounded-[35px]
              border
              border-white/10
              bg-[#020617]
              shadow-[0_0_60px_rgba(0,0,0,0.6)]
              animate-in
              zoom-in-95
              duration-300
            "
          >
            {/* Glow */}
            <div
              className="
                absolute
                top-0
                left-0
                w-full
                h-40
                bg-gradient-to-r
                from-cyan-500/20
                via-blue-500/20
                to-purple-500/20
                blur-3xl
              "
            ></div>

            {/* Header */}
            <div
              className="
                relative
                z-10
                flex
                items-center
                justify-between
                p-6
                border-b
                border-white/10
              "
            >
              <div>
                <h1
                  className="
                    text-3xl
                    font-black
                    bg-gradient-to-r
                    from-cyan-400
                    via-blue-500
                    to-purple-500
                    bg-clip-text
                    text-transparent
                  "
                >
                  Product Details
                </h1>

                <p className="text-gray-400 mt-1">
                  Premium Product View
                </p>
              </div>

              <button
                onClick={() =>
                  document
                    .getElementById(
                      "view_product_modal"
                    )
                    .close()
                }
                className="
                  w-12
                  h-12
                  rounded-2xl
                  bg-[#1E293B]
                  hover:bg-red-500
                  transition-all
                  duration-300
                  flex
                  items-center
                  justify-center
                  text-white
                "
              >
                <FiX size={22} />
              </button>
            </div>

            {/* Body */}
            <div
              className="
                relative
                z-10
                grid
                grid-cols-1
                lg:grid-cols-2
                gap-10
                p-8
                items-center
              "
            >
              {/* Image */}
              <div
                className="
                  h-[450px]
                  rounded-[30px]
                  overflow-hidden
                  border
                  border-white/10
                  shadow-2xl
                  group
                "
              >
                <img
                  src={
                    singleProduct?.v_images
                  }
                  alt={
                    singleProduct?.v_name
                  }
                  className="
                    w-full
                    h-full
                    object-cover
                    group-hover:scale-105
                    transition-all
                    duration-700
                  "
                />
              </div>

              {/* Details */}
              <div className="space-y-5">
                {/* Product Name */}
                <div
                  className="
                    p-5
                    rounded-3xl
                    bg-white/5
                    border
                    border-white/10
                  "
                >
                  <p className="text-gray-400 mb-2">
                    Product Name
                  </p>

                  <h1 className="text-4xl font-black text-white">
                    {singleProduct?.v_name}
                  </h1>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div
                    className="
                      p-5
                      rounded-3xl
                      bg-cyan-500/10
                      border
                      border-cyan-500/20
                    "
                  >
                    <p className="text-cyan-300 text-sm">
                      Brand
                    </p>

                    <h1 className="text-white text-xl font-bold mt-1">
                      {
                        singleProduct?.v_brand
                      }
                    </h1>
                  </div>

                  <div
                    className="
                      p-5
                      rounded-3xl
                      bg-purple-500/10
                      border
                      border-purple-500/20
                    "
                  >
                    <p className="text-purple-300 text-sm">
                      Category
                    </p>

                    <h1 className="text-white text-xl font-bold mt-1">
                      {
                        singleProduct?.v_category
                      }
                    </h1>
                  </div>

                  <div
                    className="
                      p-5
                      rounded-3xl
                      bg-green-500/10
                      border
                      border-green-500/20
                    "
                  >
                    <p className="text-green-300 text-sm">
                      Price
                    </p>

                    <h1 className="text-white text-2xl font-black mt-1">
                      {
                        singleProduct?.v_price
                      }
                    </h1>
                  </div>

                  <div
                    className="
                      p-5
                      rounded-3xl
                      bg-red-500/10
                      border
                      border-red-500/20
                    "
                  >
                    <p className="text-red-300 text-sm">
                      Cost
                    </p>

                    <h1 className="text-white text-2xl font-black mt-1">
                      {
                        singleProduct?.v_cost
                      }
                    </h1>
                  </div>

                  <div
                    className="
                      p-5
                      rounded-3xl
                      bg-white/5
                      border
                      border-white/10
                    "
                  >
                    <p className="text-gray-400 text-sm">
                      Quantity
                    </p>

                    <h1 className="text-white text-xl font-bold mt-1">
                      {
                        singleProduct?.v_quantity
                      }
                    </h1>
                  </div>

                  <div
                    className="
                      p-5
                      rounded-3xl
                      bg-white/5
                      border
                      border-white/10
                    "
                  >
                    <p className="text-gray-400 text-sm">
                      Unit
                    </p>

                    <h1 className="text-white text-xl font-bold mt-1">
                      {
                        singleProduct?.v_unit
                      }
                    </h1>
                  </div>
                </div>

                {/* Tax */}
                <div
                  className="
                    p-5
                    rounded-3xl
                    bg-gradient-to-r
                    from-yellow-500/10
                    to-orange-500/10
                    border
                    border-yellow-500/20
                  "
                >
                  <p className="text-yellow-300 text-sm">
                    Tax
                  </p>

                  <h1 className="text-white text-2xl font-black mt-1">
                    {singleProduct?.tax}%
                  </h1>
                </div>

                {/* Details */}
                <div
                  className="
                    p-6
                    rounded-3xl
                    bg-white/5
                    border
                    border-white/10
                    backdrop-blur-xl
                  "
                >
                  <p className="text-gray-400 mb-3">
                    Product Details
                  </p>

                  <p
                    className="
                      text-gray-200
                      leading-8
                      text-[15px]
                    "
                  >
                    {
                      singleProduct?.v_details
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Outside Click Close */}
        <form
          method="dialog"
          className="modal-backdrop"
        >
          <button>close</button>
        </form>
      </dialog>
    </div>
    </div>
  );
}