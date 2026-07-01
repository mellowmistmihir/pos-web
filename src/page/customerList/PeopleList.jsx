
// eslint-disable-next-line no-unused-vars
import React, {
  useMemo,
  useState,
} from "react";

import {
  FiSearch,
  FiUsers,
  FiMail,
  FiPhone,
  FiMapPin,
  FiStar,
} from "react-icons/fi";

import CommonTopNab from "../../Shared/CommonTopNav/CommonTopNab";



import FinalLoader from "../../Shared/Loader/FinalLoader";
import useGetData from "../../hook/UseGetData";

export default function PeopleList() {
  // =========================
  // FETCH DATA
  // =========================
  const {
    data: customerData,
    isLoading,
  } = useGetData(
    "http://localhost:3000/api/customerProduct/getAllCustomerProducts"
  );

  // =========================
  // SEARCH STATE
  // =========================
  const [search, setSearch] =
    useState("");

  // =========================
  // UNIQUE CUSTOMER LIST
  // =========================
  const customers =
    useMemo(() => {
      const allCustomers =
        customerData?.data || [];

      // latest first
      const sorted =
        [...allCustomers].sort(
          (a, b) =>
            new Date(
              b.createdAt
            ) -
            new Date(
              a.createdAt
            )
        );

      // remove duplicate
      const unique =
        sorted.reduce(
          (acc, current) => {
            const exists =
              acc.find(
                (item) =>
                  item.customerEmail ===
                  current.customerEmail
              );

            if (!exists) {
              acc.push(current);
            }

            return acc;
          },
          []
        );

      // filter
      return unique.filter(
        (customer) =>
          customer.customerName
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          customer.customerEmail
            ?.toLowerCase()
            .includes(
              search.toLowerCase()
            ) ||
          customer.customerPhone?.includes(
            search
          )
      );
    }, [customerData, search]);

  // =========================
  // LOADING
  // =========================
  if (isLoading) {
    return <FinalLoader />;
  }

  return (
    <div className="min-h-screen bg-[#020617] text-white">
      <CommonTopNab />

      <div className="p-6">
        {/* TOP */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          {/* TITLE */}
          <div>
            <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
              People List
            </h1>

            <p className="text-slate-400 mt-2">
              Manage all customer information
            </p>
          </div>

          {/* TOTAL */}
          <div className="bg-[#111827] border border-slate-800 px-6 py-4 rounded-3xl shadow-2xl">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
                <FiUsers className="text-2xl" />
              </div>

              <div>
                <p className="text-slate-400 text-sm">
                  Total Customers
                </p>

                <h2 className="text-3xl font-black">
                  {customers.length}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* SEARCH */}
        <div className="bg-[#111827] border border-slate-800 rounded-3xl p-4 mb-8 shadow-2xl">
          <div className="flex items-center gap-3 bg-slate-900 rounded-2xl px-4 py-4">
            <FiSearch className="text-cyan-400 text-xl" />

            <input
              type="text"
              placeholder="Search by name, email or phone..."
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
              className="bg-transparent outline-none w-full text-white placeholder:text-slate-500"
            />
          </div>
        </div>

        {/* EMPTY */}
        {customers.length === 0 ? (
          <div className="bg-[#111827] border border-slate-800 rounded-3xl py-24 text-center shadow-2xl">
            <h2 className="text-3xl font-bold text-slate-400">
              No Customer Found
            </h2>
          </div>
        ) : (
          <>
            {/* CARD GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {customers.map(
                (
                  customer,
                  index
                ) => (
                  <div
                    key={index}
                    className="bg-[#111827] border border-slate-800 rounded-[30px] p-6 shadow-2xl hover:scale-[1.02] transition-all duration-300"
                  >
                    {/* TOP */}
                    <div className="flex items-center gap-4 mb-6">
                      <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 flex items-center justify-center text-2xl font-black">
                        {customer.customerName
                          ?.charAt(
                            0
                          )
                          .toUpperCase()}
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold">
                          {
                            customer.customerName
                          }
                        </h2>

                        <p className="text-slate-400 text-sm">
                          Customer
                        </p>
                      </div>
                    </div>

                    {/* INFO */}
                    <div className="space-y-4">
                      {/* EMAIL */}
                      <div className="bg-slate-900 rounded-2xl p-4 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400">
                          <FiMail />
                        </div>

                        <div>
                          <p className="text-slate-400 text-sm">
                            Email
                          </p>

                          <h3 className="font-semibold break-all">
                            {
                              customer.customerEmail
                            }
                          </h3>
                        </div>
                      </div>

                      {/* PHONE */}
                      <div className="bg-slate-900 rounded-2xl p-4 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400">
                          <FiPhone />
                        </div>

                        <div>
                          <p className="text-slate-400 text-sm">
                            Phone
                          </p>

                          <h3 className="font-semibold">
                            {
                              customer.customerPhone
                            }
                          </h3>
                        </div>
                      </div>

                      {/* ADDRESS */}
                      <div className="bg-slate-900 rounded-2xl p-4 flex items-center gap-4">
                        <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400">
                          <FiMapPin />
                        </div>

                        <div>
                          <p className="text-slate-400 text-sm">
                            Address
                          </p>

                          <h3 className="font-semibold">
                            {
                              customer.customerAddress
                            }
                          </h3>
                        </div>
                      </div>

                      {/* POINTS */}
                      <div className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-2xl p-5 mt-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm text-white/80">
                              Customer Points
                            </p>

                            <h2 className="text-3xl font-black mt-1">
                              {
                                customer.customerPoints
                              }
                            </h2>
                          </div>

                          <FiStar className="text-5xl text-white/80" />
                        </div>
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}