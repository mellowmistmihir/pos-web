// eslint-disable-next-line no-unused-vars
import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import axios from "axios";

import { useParams } from "react-router-dom";

import jsPDF from "jspdf";

import autoTable from "jspdf-autotable";

import {
  FiPrinter,
  FiDownload,
  FiUser,
} from "react-icons/fi";
import CommonTopNab from "../../shared/CommonTopNav/CommonTopNab";

const BASE_URL =
  "http://localhost:3000/api/customerProduct";

export default function SingleCustomerProductDetails() {
  const { id } = useParams();

  const printRef = useRef();

  const [customer, setCustomer] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchSingleCustomer();
  }, []);

  const fetchSingleCustomer =
    async () => {
      try {
        const res =
          await axios.get(
            `${BASE_URL}/single/${id}`
          );

        setCustomer(res.data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  // =========================
  // PRINT ONLY DETAILS
  // =========================
  const handlePrint = () => {
    const printContents =
      printRef.current.innerHTML;

    const printWindow =
      window.open(
        "",
        "",
        "width=1200,height=800"
      );

    printWindow.document.write(`
      <html>
        <head>
          <title>Invoice</title>

          <style>
            body{
              font-family: Arial;
              padding:30px;
              background:white;
            }

            table{
              width:100%;
              border-collapse: collapse;
              margin-top:20px;
            }

            th,td{
              border:1px solid #ddd;
              padding:12px;
              text-align:left;
            }

            th{
              background:#f4f4f4;
            }

            h1{
              text-align:center;
            }
          </style>
        </head>

        <body>
          ${printContents}
        </body>
      </html>
    `);

    printWindow.document.close();

    printWindow.focus();

    printWindow.print();

    printWindow.close();
  };

  // =========================
  // PDF DOWNLOAD
  // =========================
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(24);

    doc.text(
      "Customer Invoice",
      105,
      20,
      {
        align: "center",
      }
    );

    doc.setFontSize(12);

    doc.text(
      `Customer Name: ${customer.customerName}`,
      14,
      40
    );

    doc.text(
      `Email: ${customer.customerEmail}`,
      14,
      48
    );

    doc.text(
      `Phone: ${customer.customerPhone}`,
      14,
      56
    );

    doc.text(
      `Address: ${customer.customerAddress}`,
      14,
      64
    );

    doc.text(
      `Purchase Date: ${customer.purchaseDate}`,
      14,
      72
    );

    doc.text(
      `Total Items: ${customer.totalItems}`,
      14,
      80
    );

    doc.text(
      `Grand Total: ৳${customer.grandTotal}`,
      14,
      88
    );

    const rows =
      customer.purchasedProducts.map(
        (item, index) => [
          index + 1,
          item.v_name,
          `৳${item.v_price}`,
          item.quantity,
          `৳${
            item.v_price *
            item.quantity
          }`,
        ]
      );

    autoTable(doc, {
      startY: 100,

      head: [
        [
          "#",
          "Product",
          "Price",
          "Qty",
          "Total",
        ],
      ],

      body: rows,
    });

    doc.save(
      `${customer.customerName}-invoice.pdf`
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#020617] flex items-center justify-center text-white text-3xl font-bold">
        Loading...
      </div>
    );
  }

  return (
   <div>
    <CommonTopNab></CommonTopNab>
     <div className="min-h-screen bg-[#020617] text-white p-6">
      {/* TOP */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent">
            Invoice Details
          </h1>

          <p className="text-slate-400 mt-2">
            Premium Customer Purchase Invoice
          </p>
        </div>

        {/* BUTTONS */}
        <div className="flex gap-4 print:hidden">
          {/* PRINT */}
          <button
            onClick={handlePrint}
            className="px-6 py-3 rounded-2xl bg-blue-500 hover:bg-blue-400 transition-all duration-300 flex items-center gap-2 shadow-lg"
          >
            <FiPrinter />

            Print
          </button>

          {/* PDF */}
          <button
            onClick={
              handleDownloadPDF
            }
            className="px-6 py-3 rounded-2xl bg-red-500 hover:bg-red-400 transition-all duration-300 flex items-center gap-2 shadow-lg"
          >
            <FiDownload />

            Download PDF
          </button>
        </div>
      </div>

      {/* PRINT AREA */}
      <div ref={printRef}>
        {/* CUSTOMER CARD */}
        <div className="bg-[#111827] border border-slate-800 rounded-[30px] p-8 shadow-2xl mb-8">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500">
              <FiUser className="text-3xl" />
            </div>

            <div>
              <h2 className="text-3xl font-bold">
                Customer Information
              </h2>

              <p className="text-slate-400">
                Full purchase details
              </p>
            </div>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="bg-slate-900 rounded-2xl p-5">
              <p className="text-slate-400 text-sm">
                Customer Name
              </p>

              <h3 className="text-xl font-bold mt-2">
                {
                  customer.customerName
                }
              </h3>
            </div>

            <div className="bg-slate-900 rounded-2xl p-5">
              <p className="text-slate-400 text-sm">
                Email
              </p>

              <h3 className="text-xl font-bold mt-2">
                {
                  customer.customerEmail
                }
              </h3>
            </div>

            <div className="bg-slate-900 rounded-2xl p-5">
              <p className="text-slate-400 text-sm">
                Phone
              </p>

              <h3 className="text-xl font-bold mt-2">
                {
                  customer.customerPhone
                }
              </h3>
            </div>

            <div className="bg-slate-900 rounded-2xl p-5">
              <p className="text-slate-400 text-sm">
                Grand Total
              </p>

              <h3 className="text-2xl font-black text-cyan-400 mt-2">
                ৳
                {
                  customer.grandTotal
                }
              </h3>
            </div>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto bg-[#111827] border border-slate-800 rounded-[30px] shadow-2xl">
          <table className="w-full">
            <thead className="bg-slate-900">
              <tr>
                <th className="p-5 text-left">
                  #
                </th>

                <th className="p-5 text-left">
                  Product
                </th>

                <th className="p-5 text-left">
                  Price
                </th>

                <th className="p-5 text-left">
                  Qty
                </th>

                <th className="p-5 text-left">
                  Total
                </th>
              </tr>
            </thead>

            <tbody>
              {customer.purchasedProducts.map(
                (
                  item,
                  index
                ) => (
                  <tr
                    key={index}
                    className="border-t border-slate-800 hover:bg-slate-900 transition"
                  >
                    <td className="p-5">
                      {index + 1}
                    </td>

                    <td className="p-5 font-bold">
                      {item.v_name}
                    </td>

                    <td className="p-5 text-cyan-400 font-bold">
                      ৳
                      {item.v_price}
                    </td>

                    <td className="p-5">
                      {item.quantity}
                    </td>

                    <td className="p-5 text-green-400 font-black">
                      ৳
                      {item.v_price *
                        item.quantity}
                    </td>
                  </tr>
                )
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
   </div>
  );
}