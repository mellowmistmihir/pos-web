import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import {
  FiCheck,
  FiEdit,
  FiMoreVertical,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import useGetData from "../../hook/useGetData";
import FinalLoader from "../../shared/Loader/FinalLoader";
import CommonTopNab from "../../shared/CommonTopNav/CommonTopNab";

const BASE_URL = "http://localhost:3000";

export default function AddCategory() {
  const [categoryName, setCategoryName] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // EDIT STATE
  const [editId, setEditId] = useState(null);

  const [editName, setEditName] =
    useState("");

  // ACTION MENU
  const [openActionId, setOpenActionId] =
    useState(null);

  // GET DATA
  const { data, isLoading, refetch } =
    useGetData(
      `${BASE_URL}/api/vehicle-category/get-categories`
    );

  // ADD CATEGORY
  const handleAddCategory = async (e) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      return toast.error(
        "Category name is required"
      );
    }

    setLoading(true);

    try {
      const res = await axios.post(
        `${BASE_URL}/api/vehicle-category/create-category`,
        {
          category_name: categoryName,
        }
      );

      if (res.status === 201) {
        toast.success("Category Added");

        setCategoryName("");

        refetch();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to add category"
      );
    } finally {
      setLoading(false);
    }
  };

  // UPDATE CATEGORY
  const handleUpdateCategory = async (
    id
  ) => {
    if (!editName.trim()) {
      return toast.error(
        "Category name is required"
      );
    }

    setLoading(true);

    try {
      const res = await axios.put(
        `${BASE_URL}/api/vehicle-category/update/${id}`,
        {
          category_name: editName,
        }
      );

      if (res.status === 200) {
        toast.success("Category Updated");

        setEditId(null);
        setEditName("");

        refetch();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to update category"
      );
    } finally {
      setLoading(false);
    }
  };

  // DELETE CATEGORY
  const handleDeleteCategory = async (
    id
  ) => {
    const confirmDelete = window.confirm(
      "Delete this category?"
    );

    if (!confirmDelete) return;

    setLoading(true);

    try {
      const res = await axios.delete(
        `${BASE_URL}/api/vehicle-category/delete/${id}`
      );

      if (res.status === 200) {
        toast.success("Category Deleted");

        refetch();
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message ||
          "Failed to delete category"
      );
    } finally {
      setLoading(false);
    }
  };

  if (isLoading || loading) {
    return <FinalLoader />;
  }

  return (
    <div>
      <CommonTopNab></CommonTopNab>

      <div className="min-h-screen p-6 bg-transparent">
        <div className="max-w-7xl mx-auto">
          {/* ADD CATEGORY */}
          <div className="rounded-[35px] border border-slate-700 bg-slate-900/60 backdrop-blur-2xl overflow-hidden shadow-[0_20px_80px_rgba(0,0,0,0.45)]">
            {/* HEADER */}
            <div className="relative overflow-hidden border-b border-slate-800">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 opacity-90"></div>

              <div className="absolute -top-16 right-0 w-72 h-72 bg-cyan-300/20 rounded-full blur-3xl"></div>

              <div className="absolute bottom-0 left-0 w-52 h-52 bg-indigo-400/20 rounded-full blur-3xl"></div>

              <div className="relative z-10 p-8">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
                  <div>
                    <h2 className="text-4xl font-black text-white">
                      Vehicle Categories
                    </h2>

                    <p className="text-slate-200 mt-2">
                      Premium category
                      management panel
                    </p>
                  </div>

                  {/* TOTAL */}
                  <div className="bg-white/10 border border-white/10 backdrop-blur-xl px-6 py-4 rounded-3xl">
                    <p className="text-slate-300 text-sm uppercase tracking-widest">
                      Total
                    </p>

                    <h2 className="text-4xl font-black text-white">
                      {data?.categories?.length ||
                        0}
                    </h2>
                  </div>
                </div>

                {/* FORM */}
                <form
                  onSubmit={
                    handleAddCategory
                  }
                  className="mt-8 flex flex-col lg:flex-row gap-4"
                >
                  <input
                    type="text"
                    placeholder="Enter category name..."
                    value={categoryName}
                    onChange={(e) =>
                      setCategoryName(
                        e.target.value
                      )
                    }
                    className="flex-1 bg-slate-800/80 border border-slate-700 text-white placeholder:text-slate-400 px-6 py-5 rounded-2xl outline-none focus:border-blue-500 transition-all duration-300"
                  />

                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-gradient-to-r from-indigo-500 to-blue-500 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 text-white font-bold px-10 py-5 rounded-2xl shadow-2xl"
                  >
                    {loading
                      ? "Adding..."
                      : "Add Category"}
                  </button>
                </form>
              </div>
            </div>

            {/* TABLE */}
            <div className="p-6 overflow-x-auto">
              <table className="w-full border-separate border-spacing-y-5">
                <thead>
                  <tr>
                    <th className="text-left text-slate-400 px-4">
                      #
                    </th>

                    <th className="text-left text-slate-400 px-4">
                      Category
                    </th>

                    <th className="text-center text-slate-400 px-4">
                      Products
                    </th>

                    <th className="text-center text-slate-400 px-4">
                      Actions
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {data?.categories
                    ?.length > 0 ? (
                    data?.categories?.map(
                      (
                        category,
                        index
                      ) => (
                        <tr
                          key={
                            category._id
                          }
                        >
                          <td
                            colSpan="4"
                            className="p-0"
                          >
                            <div className="grid grid-cols-12 items-center bg-slate-900 border border-slate-800 rounded-[30px] hover:border-blue-500/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(59,130,246,0.15)]">
                              {/* NUMBER */}
                              <div className="col-span-1 px-5 py-6">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-indigo-500 to-blue-500 text-white flex items-center justify-center font-black text-lg shadow-lg">
                                  {index +
                                    1}
                                </div>
                              </div>

                              {/* CATEGORY */}
                              <div className="col-span-5">
                                {editId ===
                                category._id ? (
                                  <div className="flex items-center gap-3">
                                    <input
                                      type="text"
                                      value={
                                        editName
                                      }
                                      onChange={(
                                        e
                                      ) =>
                                        setEditName(
                                          e
                                            .target
                                            .value
                                        )
                                      }
                                      className="w-full bg-slate-800 border border-slate-700 text-white px-5 py-4 rounded-2xl outline-none focus:border-blue-500"
                                    />

                                    {/* SAVE */}
                                    <button
                                      onClick={() =>
                                        handleUpdateCategory(
                                          category._id
                                        )
                                      }
                                      className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-2xl transition-all duration-300 hover:scale-110"
                                    >
                                      <FiCheck
                                        size={
                                          20
                                        }
                                      />
                                    </button>

                                    {/* CANCEL */}
                                    <button
                                      onClick={() => {
                                        setEditId(
                                          null
                                        );

                                        setEditName(
                                          ""
                                        );
                                      }}
                                      className="bg-red-500 hover:bg-red-600 text-white p-4 rounded-2xl transition-all duration-300 hover:scale-110"
                                    >
                                      <FiX
                                        size={
                                          20
                                        }
                                      />
                                    </button>
                                  </div>
                                ) : (
                                  <div>
                                    <h2 className="text-2xl font-bold text-white">
                                      {
                                        category.category_name
                                      }
                                    </h2>

                                    <p className="text-slate-400 text-sm mt-1">
                                      Vehicle
                                      category
                                    </p>
                                  </div>
                                )}
                              </div>

                              {/* PRODUCT COUNT */}
                              <div className="col-span-3 flex justify-center">
                                <div className="bg-gradient-to-r from-indigo-500 to-blue-500 px-8 py-4 rounded-3xl shadow-xl">
                                  <p className="text-xs uppercase tracking-widest text-white/70">
                                    Products
                                  </p>

                                  <h2 className="text-3xl font-black text-white">
                                    {category.productCount ||
                                      0}
                                  </h2>
                                </div>
                              </div>

                              {/* ACTIONS */}
                              {/* ACTIONS */}
<div className="col-span-3 flex justify-center relative">
  {/* ACTION BUTTON */}
  <button
    onClick={() =>
      setOpenActionId(
        openActionId === category._id
          ? null
          : category._id
      )
    }
    className={`group relative w-14 h-14 rounded-2xl border transition-all duration-300 flex items-center justify-center shadow-lg
    ${
      openActionId === category._id
        ? "bg-gradient-to-r from-blue-500 to-indigo-500 border-blue-400 rotate-90"
        : "bg-slate-800 border-slate-700 hover:border-blue-500 hover:bg-slate-700"
    }`}
  >
    {/* GLOW */}
    <div className="absolute inset-0 rounded-2xl bg-blue-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>

    <FiMoreVertical
      size={22}
      className="relative z-10 text-white"
    />
  </button>

  
 {/* DROPDOWN */}
{openActionId === category._id && (
  <div className="absolute top-0 right-full mr-4 w-56 rounded-2xl overflow-hidden border border-slate-700 bg-[#111827]/95 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.45)] z-[9999] animate-in fade-in zoom-in duration-200">
    
    {/* TOP LIGHT */}
    <div className="h-[3px] w-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400"></div>

    {/* EDIT */}
    <button
      onClick={() => {
        setEditId(category._id);

        setEditName(
          category.category_name
        );

        setOpenActionId(null);
      }}
      className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-blue-500/10 transition-all duration-300 group"
    >
      <div className="w-11 h-11 rounded-xl bg-blue-500/15 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
        <FiEdit
          size={18}
          className="text-blue-400"
        />
      </div>

      <div>
        <h3 className="text-white font-semibold">
          Edit
        </h3>

        <p className="text-slate-400 text-xs">
          Update category
        </p>
      </div>
    </button>

    {/* DIVIDER */}
    <div className="w-full h-[1px] bg-slate-700"></div>

    {/* DELETE */}
    <button
      onClick={() =>
        handleDeleteCategory(
          category._id
        )
      }
      className="w-full flex items-center gap-4 px-5 py-4 text-left hover:bg-red-500/10 transition-all duration-300 group"
    >
      <div className="w-11 h-11 rounded-xl bg-red-500/15 flex items-center justify-center group-hover:scale-110 transition-all duration-300">
        <FiTrash2
          size={18}
          className="text-red-400"
        />
      </div>

      <div>
        <h3 className="text-red-400 font-semibold">
          Delete
        </h3>

        <p className="text-slate-400 text-xs">
          Remove category
        </p>
      </div>
    </button>
  </div>
)}
</div>
                            </div>
                          </td>
                        </tr>
                      )
                    )
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="text-center py-20 text-slate-500"
                      >
                        No Categories Found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}