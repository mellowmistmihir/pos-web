// eslint-disable-next-line no-unused-vars
import React, {
  useEffect,
  useState,
} from "react";

import axios from "axios";

import {
  FiEye,
  FiTrash2,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CommonTopNab from "../../shared/CommonTopNav/CommonTopNab";

const BASE_URL =
  "http://localhost:3000/api/customerProduct";

export default function CustomerList() {
  const [customers, setCustomers] =
    useState([]);
const navigate = useNavigate();
  const [loading, setLoading] =
    useState(false);

  // =========================
  // FETCH CUSTOMERS
  // =========================
  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${BASE_URL}/getAllCustomerProducts`
      );

      console.log(res.data);

      // backend response অনুযায়ী
      setCustomers(
        res.data.customers ||
          res.data.data ||
          res.data ||
          []
      );
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // DELETE CUSTOMER
  // =========================
  const handleDelete = async (
    id
  ) => {
    const confirmDelete =
      window.confirm(
        "Are you sure?"
      );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${BASE_URL}/delete/${id}`
      );

      setCustomers((prev) =>
        prev.filter(
          (item) => item._id !== id
        )
      );

      alert(
        "Deleted Successfully"
      );
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // VIEW DETAILS
  // =========================
 const handleViewDetails = (id) => {
  navigate(`/sell-details/${id}`);
};

  return (
 <div>
  <CommonTopNab></CommonTopNab>
     <div className="min-h-screen bg-[#0f172a] p-6 text-white">
      {/* TOP */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
          Customer List
        </h1>

        <div className="bg-slate-800 border border-slate-700 px-4 py-2 rounded-xl">
          Total Customers:
          {" "}
          {customers.length}
        </div>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center py-20 text-2xl">
          Loading...
        </div>
      ) : (
        <div className="overflow-x-auto bg-[#111827] border border-slate-800 rounded-3xl">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="p-4 text-left">
                  Customer
                </th>

                <th className="p-4 text-left">
                  Email
                </th>

                <th className="p-4 text-left">
                  Phone
                </th>

                <th className="p-4 text-left">
                  Purchase Date
                </th>

                <th className="p-4 text-left">
                  Total Item
                </th>

                <th className="p-4 text-left">
                  Grand Total
                </th>

                <th className="p-4 text-left">
                  Payment
                </th>

                <th className="p-4 text-center">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {customers.map(
                (customer) => (
                  <tr
                    key={
                      customer._id
                    }
                    className="border-t border-slate-800 hover:bg-slate-900 transition"
                  >
                    <td className="p-4 font-semibold">
  {customer.customerName}
</td>

<td className="p-4">
  {customer.customerEmail}
</td>

<td className="p-4">
  {customer.customerPhone}
</td>

<td className="p-4">
  {customer.purchaseDate}
</td>

<td className="p-4">
  {customer.totalItems}
</td>

<td className="p-4 text-cyan-400 font-bold">
  ৳ {customer.grandTotal}
</td>

<td className="p-4">
  <span className="bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm">
    {customer.paymentStatus}
  </span>
</td>

                    {/* ACTION */}
                    <td className="p-4">
                      <div className="flex items-center justify-center gap-3">
                        {/* VIEW */}
                        <button
                          onClick={() =>
                            handleViewDetails(
                              customer._id
                            )
                          }
                          className="bg-cyan-500 hover:bg-cyan-400 p-3 rounded-xl transition"
                        >
                          <FiEye />
                        </button>

                        {/* DELETE */}
                        <button
                          onClick={() =>
                            handleDelete(
                              customer._id
                            )
                          }
                          className="bg-red-500 hover:bg-red-400 p-3 rounded-xl transition"
                        >
                          <FiTrash2 />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
 </div>
  );
}