import { useState, useEffect } from "react";
import { FaShoppingCart, FaCalendarAlt, FaFire, FaSpinner } from "react-icons/fa";
import Papa from "papaparse";

const SalesReport = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalOrders: 0,
    totalUnitsSold: 0,
    bestSeller: { name: "N/A", units: 0 },
    recentTransactions: []
  });

  useEffect(() => {
    Papa.parse("/datasets/chill_pops_sales_dataset_updated.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data;
        setData(rows);

        let ordersCount = rows.length;
        let unitsSold = 0;
        const flavorsCount = {};

        rows.forEach(row => {
          unitsSold += row.Quantity || 0;
          if (row.Flavor) {
            flavorsCount[row.Flavor] = (flavorsCount[row.Flavor] || 0) + (row.Quantity || 0);
          }
        });

        // Find best seller
        let bestFlavor = "N/A";
        let maxUnits = 0;
        for (const [flavor, units] of Object.entries(flavorsCount)) {
          if (units > maxUnits) {
            bestFlavor = flavor;
            maxUnits = units;
          }
        }

        // Sort rows by Date (simulating recent transactions)
        const sortedRows = [...rows].sort((a, b) => new Date(b.Date) - new Date(a.Date));
        const recent = sortedRows.slice(0, 10);

        setMetrics({
          totalOrders: ordersCount,
          totalUnitsSold: unitsSold,
          bestSeller: { name: bestFlavor, units: maxUnits },
          recentTransactions: recent
        });

        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="pt-32 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-primary" />
        <span className="ml-3 text-xl text-gray-600">Loading Datasets...</span>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Sales Report</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Detailed insights into product performance, daily transaction volumes, and best-selling items at your franchise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                <FaShoppingCart className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Total Orders</h3>
                <p className="text-gray-500 text-sm">From CSV Dataset</p>
              </div>
            </div>
            <div className="text-5xl font-extrabold text-gray-900">{metrics.totalOrders}</div>
            <div className="mt-4 text-sm font-medium text-green-600 bg-green-50 inline-block px-3 py-1 rounded-full">
              {metrics.totalUnitsSold} units sold total
            </div>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center text-orange-500">
                <FaFire className="text-xl" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-800">Best Seller</h3>
                <p className="text-gray-500 text-sm">Most popular flavor</p>
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900">{metrics.bestSeller.name}</div>
            <div className="mt-4 text-sm font-medium text-gray-600">
              {metrics.bestSeller.units} units sold
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-primary text-white p-4 px-6 flex justify-between items-center">
            <h2 className="text-xl font-semibold">Recent Transactions</h2>
            <FaCalendarAlt />
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-gray-600 border-b">
                <tr>
                  <th className="p-4 px-6 font-medium">Order ID</th>
                  <th className="p-4 px-6 font-medium">Date</th>
                  <th className="p-4 px-6 font-medium">Items</th>
                  <th className="p-4 px-6 font-medium">Total</th>
                  <th className="p-4 px-6 font-medium">Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {metrics.recentTransactions.map((order, i) => (
                  <tr key={i} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 px-6 font-medium text-gray-900">{order.Transaction_ID}</td>
                    <td className="p-4 px-6 text-gray-500">{order.Date}</td>
                    <td className="p-4 px-6 text-gray-600 font-medium">
                      {order.Quantity}x <span className="text-sm font-normal text-gray-500">({order.Flavor})</span>
                    </td>
                    <td className="p-4 px-6 font-semibold text-gray-800">₹{order.Total_Amount}</td>
                    <td className="p-4 px-6">
                      <span className={`bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full font-medium`}>
                        {order.Payment_Method}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesReport;
