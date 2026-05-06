import { useState, useEffect } from "react";
import { FaBroadcastTower, FaSpinner, FaShoppingCart, FaRupeeSign, FaChartLine, FaHistory, FaUpload, FaMoneyBillWave } from "react-icons/fa";
import Papa from "papaparse";

const LiveDashboard = () => {
  const [loading, setLoading] = useState(false); // Changed to false to show the upload prompt initially
  const [dataLoaded, setDataLoaded] = useState(false);
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalProfit: 0,
    totalOrders: 0,
    activeViewers: Math.floor(Math.random() * 20) + 5,
    recentTransactions: []
  });

  // Handle manual file upload from the admin
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setLoading(true);
      Papa.parse(file, {
        header: true,
        dynamicTyping: true,
        skipEmptyLines: true,
        complete: (results) => {
          const rows = results.data;
          let revenue = 0;
          let profit = 0;
          let orders = 0;
          
          rows.forEach(row => {
            // Accommodating both generic profit/loss format and generic sales format
            const rowRevenue = (row.Revenue || row.Total_Amount || 0);
            revenue += rowRevenue;
            // Calculate profit (fallback to a 15% arbitrary profit margin if dataset only has sales data)
            profit += (row.Profit !== undefined ? row.Profit : rowRevenue * 0.15); 
            orders++;
          });

          // Show all uploaded transactions in recent list
          const recent = [...rows].reverse();

          // Save to local storage for the Sales Report page
          try {
            localStorage.setItem("liveDashboardData", JSON.stringify(rows));
          } catch (e) {
            console.error("Could not save to localStorage. File might be too large.", e);
          }

          setData(rows);
          setMetrics({
            totalRevenue: revenue,
            totalProfit: profit,
            totalOrders: orders,
            activeViewers: Math.floor(Math.random() * 20) + 5,
            recentTransactions: recent
          });
          
          setLoading(false);
          setDataLoaded(true);
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-primary" />
        <span className="ml-3 text-xl text-gray-600">Processing Dataset...</span>
      </div>
    );
  }

  // View shown before data is uploaded
  if (!dataLoaded) {
    return (
      <div className="pt-32 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-10 rounded-3xl shadow-xl w-full max-w-lg border border-gray-100 text-center mx-4">
          <div className="inline-block bg-primary/10 p-5 rounded-full mb-6">
            <FaUpload className="text-5xl text-primary" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Initialize Live Feed</h2>
          <p className="text-gray-500 mb-8">
            Upload the master dataset CSV file to calculate baselines and initialize the live sales and profit stream.
          </p>
          
          <label className="cursor-pointer flex items-center justify-center w-full bg-primary hover:bg-primary-dark text-white font-bold py-4 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl hover:-translate-y-1">
            <FaUpload className="mr-3" />
            Select CSV File & Boot Tracker
            <input 
              type="file" 
              accept=".csv" 
              onChange={handleFileUpload} 
              className="hidden" 
            />
          </label>
        </div>
      </div>
    );
  }

  const formatCurrency = (val) => val.toLocaleString('en-IN', { maximumFractionDigits: 0 });

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container-custom">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="relative">
                <FaBroadcastTower className="text-3xl text-red-500" />
                <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full animate-ping"></span>
              </div>
              <h1 className="text-4xl font-bold text-gray-900">Live Dashboard</h1>
            </div>
            <p className="text-gray-600">Real-time sales & profit streaming initialized directly from Admin dataset.</p>
          </div>
          
          <div className="bg-white px-6 py-3 rounded-full shadow-sm border border-gray-100 flex items-center gap-3">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            <span className="text-sm font-bold text-gray-700">Live Process Active</span>
            <div className="h-4 w-px bg-gray-200 mx-2"></div>
            <span className="text-sm text-gray-500">{metrics.activeViewers} Active Terminals</span>
          </div>
        </div>

        {/* Live Counters */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center relative overflow-hidden group col-span-1 md:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 font-medium uppercase text-sm tracking-wider">Live Revenue</h3>
              <div className="p-2 bg-green-50 rounded-full text-green-500">
                <FaRupeeSign className="text-xl" />
              </div>
            </div>
            <div className="text-4xl font-black text-gray-900 transition-all duration-300 transform">
              ₹{formatCurrency(metrics.totalRevenue)}
            </div>
            <div className="mt-2 text-xs font-medium text-green-500 flex items-center gap-1">
              <FaChartLine /> Calculated successfully
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl shadow-sm p-6 flex flex-col justify-center relative overflow-hidden group text-white">
            <div className="absolute opacity-10 -right-4 -bottom-4">
              <FaMoneyBillWave className="text-8xl" />
            </div>
            <div className="flex justify-between items-center mb-4 relative z-10">
              <h3 className="text-white/80 font-medium uppercase text-sm tracking-wider">Total Profit</h3>
              <div className="p-2 bg-white/20 rounded-full">
                <FaMoneyBillWave className="text-lg" />
              </div>
            </div>
            <div className="text-4xl font-black text-white transition-all duration-300 transform relative z-10">
              ₹{formatCurrency(metrics.totalProfit)}
            </div>
            <div className="mt-2 text-xs font-medium text-green-100 flex items-center gap-1 relative z-10">
              ~{(metrics.totalProfit / (metrics.totalRevenue || 1) * 100).toFixed(1)}% Active Margin
            </div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col justify-center relative overflow-hidden group">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 font-medium uppercase text-sm tracking-wider">Live Orders</h3>
              <div className="p-2 bg-blue-50 rounded-full text-blue-500">
                <FaShoppingCart className="text-xl" />
              </div>
            </div>
            <div className="text-4xl font-black text-gray-900 transition-all duration-300 transform">
              {metrics.totalOrders.toLocaleString()}
            </div>
            <div className="mt-2 text-xs font-medium text-blue-500 flex items-center gap-1">
              Tick per sale
            </div>
          </div>
        </div>

        {/* Live Transaction Feed */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <FaHistory className="text-primary" /> Feed Initiated from Upload
            </h2>
            <span className="text-xs font-bold text-primary bg-primary/10 px-3 py-1 rounded-full animate-pulse">Live</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 text-sm text-gray-500">
                  <th className="p-4 font-medium">TXN ID</th>
                  <th className="p-4 font-medium">Location</th>
                  <th className="p-4 font-medium">Flavor</th>
                  <th className="p-4 font-medium text-right">Revenue</th>
                  <th className="p-4 font-medium text-right">Profit Est.</th>
                  <th className="p-4 font-medium text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {metrics.recentTransactions.map((txn, index) => (
                  <tr 
                    key={`${txn.Transaction_ID}-${index}`} 
                    className={`${index === 0 ? 'bg-green-50/30' : 'bg-white'} hover:bg-gray-50 transition-colors animate-fade-in`}
                  >
                    <td className="p-4 font-mono text-sm text-gray-700">{txn.Transaction_ID}</td>
                    <td className="p-4 text-sm text-gray-600 font-medium">{txn.City || txn.Location || "Retail"}</td>
                    <td className="p-4 text-sm text-gray-600">{txn.Flavor}</td>
                    <td className="p-4 text-sm font-bold text-gray-900 text-right">₹{(txn.Total_Amount || txn.Revenue || 0).toLocaleString()}</td>
                    <td className="p-4 text-sm font-bold text-green-600 text-right">
                      ₹{txn.Profit !== undefined ? txn.Profit.toLocaleString() : Math.round((txn.Total_Amount || 0) * 0.15).toLocaleString()}
                    </td>
                    <td className="p-4 text-center">
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {metrics.recentTransactions.length === 0 && (
               <div className="text-center p-8 text-gray-500 italic">Listening for incoming transactions...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveDashboard;
