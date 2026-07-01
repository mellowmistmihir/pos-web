import React, { useEffect, useState } from "react";
import axios from "axios";
import CountUp from "react-countup";
import {
  FiDollarSign,
  FiUsers,
  FiShoppingBag,
  FiTrendingUp,
} from "react-icons/fi";
import CommonTopNab from "../../Shared/CommonTopNav/CommonTopNab";

export default function Home() {
    
  const [stats, setStats] = useState({
    totalSales: 0,
    totalRevenue: 0,
    totalPaid: 0,
    totalCustomers: 0,
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await axios.get(
        "http://localhost:3000/api/customerProduct/dashboard-stats"
      );

      setStats(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const cards = [
    {
      title: "Total Revenue",
      value: stats.totalRevenue,
      icon: <FiDollarSign />,
      prefix: "৳",
    },
    {
      title: "Total Sales",
      value: stats.totalSales,
      icon: <FiShoppingBag />,
    },
    {
      title: "Customers",
      value: stats.totalCustomers,
      icon: <FiUsers />,
    },
    {
      title: "Paid Amount",
      value: stats.totalPaid,
      icon: <FiTrendingUp />,
      prefix: "৳",
    },
  ];

  return (
    <div>
  <CommonTopNab />

  <div className="min-h-screen bg-background text-foreground p-6">

    {/* HERO */}
    <div className="mb-8 rounded-3xl p-8 bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-xl">
      <h1 className="text-4xl font-bold">
        Vehicle Sales Intelligence
      </h1>

      <p className="text-white/80 mt-2">
        Real-time business analytics dashboard
      </p>
    </div>

    {/* STATS */}
    <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {cards.map((card, index) => (
        <div
          key={index}
          className="
          bg-card
          text-card-foreground
          border
          rounded-3xl
          p-6
          shadow-sm
          hover:shadow-xl
          hover:-translate-y-1
          transition-all duration-300"
        >
          <div className="flex justify-between items-center">
            <h3 className="text-muted-foreground font-medium">
              {card.title}
            </h3>

            <div className="text-cyan-500 text-2xl">
              {card.icon}
            </div>
          </div>

          <h2 className="text-4xl font-bold mt-4">
            {card.prefix}
            <CountUp
              end={card.value}
              duration={2}
            />
          </h2>
        </div>
      ))}
    </div>

    {/* CHART + INSIGHTS */}
    <div className="grid xl:grid-cols-3 gap-6 mb-8">

      {/* REVENUE CHART */}
      <div className="xl:col-span-2 bg-card border rounded-3xl p-6 shadow-sm">

        <h2 className="text-xl font-bold mb-6">
          Revenue Pulse
        </h2>

        <div className="flex items-end gap-3 h-64">
          {[40, 60, 30, 80, 100, 75, 90].map(
            (height, index) => (
              <div
                key={index}
                className="
                flex-1
                rounded-t-2xl
                bg-gradient-to-t
                from-cyan-400
                via-blue-500
                to-purple-500
                hover:opacity-80
                transition-all"
                style={{
                  height: `${height}%`,
                }}
              />
            )
          )}
        </div>
      </div>

      {/* AI INSIGHTS */}
      <div className="bg-card border rounded-3xl p-6 shadow-sm">

        <h2 className="text-xl font-bold mb-5">
          AI Insights
        </h2>

        <div className="space-y-4">

          <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4">
            🚀 Cars generate highest revenue
          </div>

          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-xl p-4">
            📈 Sales increased this month
          </div>

          <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-4">
            👥 Customer growth is strong
          </div>

        </div>
      </div>
    </div>

    {/* BOTTOM */}
    <div className="grid xl:grid-cols-2 gap-6">

      {/* TOP CUSTOMER */}
      <div className="bg-card border rounded-3xl p-6 shadow-sm">

        <h2 className="text-xl font-bold mb-5">
          Top Customer
        </h2>

        <div className="flex items-center gap-4">

          <div
            className="
            w-16 h-16 rounded-full
            bg-gradient-to-r
            from-cyan-500
            to-purple-500
            flex items-center justify-center
            text-white font-bold text-xl"
          >
            A
          </div>

          <div>
            <h3 className="text-xl font-semibold">
              Asif Ahmed
            </h3>

            <p className="text-muted-foreground">
              2400 Loyalty Points
            </p>
          </div>

        </div>
      </div>

      {/* RECENT ACTIVITY */}
      <div className="bg-card border rounded-3xl p-6 shadow-sm">

        <h2 className="text-xl font-bold mb-5">
          Recent Activity
        </h2>

        <div className="space-y-4">

          <div className="border-b pb-3">
            <p>🟢 Customer purchased BMW X5</p>
            <span className="text-muted-foreground">
              ৳ 120000
            </span>
          </div>

          <div className="border-b pb-3">
            <p>🟢 Customer purchased Toyota Axio</p>
            <span className="text-muted-foreground">
              ৳ 85000
            </span>
          </div>

          <div>
            <p>🟢 Customer purchased Yamaha R15</p>
            <span className="text-muted-foreground">
              ৳ 45000
            </span>
          </div>

        </div>

      </div>
    </div>

  </div>
</div>
  
    
  );
}