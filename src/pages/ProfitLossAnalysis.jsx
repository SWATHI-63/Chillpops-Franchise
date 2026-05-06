import { useState, useEffect } from "react";
import { FaChartBar, FaArrowUp, FaArrowDown, FaMoneyBillWave, FaSpinner } from "react-icons/fa";
import Papa from "papaparse";

const ProfitLossAnalysis = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    totalExpenses: 0,
    netProfit: 0,
    margin: 0,
    locationData: [],
    locationNames: []
  });

  useEffect(() => {
    // Load and parse the CSV dataset from public/datasets/
    Papa.parse("/datasets/chill_pops_profit_loss_dataset.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data;
        setData(rows);
        
        let revenue = 0;
        let expenses = 0;
        let profit = 0;
        const locationRevMap = {};

        rows.forEach(row => {
          revenue += row.Revenue || 0;
          expenses += row.Total_Cost || 0;
          profit += row.Profit || 0;
          
          if (row.Location) {
            locationRevMap[row.Location] = (locationRevMap[row.Location] || 0) + (row.Revenue || 0);
          }
        });

        // Convert map to sorted arrays by revenue (optional: sorting helps chart visibility, let's keep it simple or sorted)
        const sortedLocations = Object.entries(locationRevMap).sort((a, b) => b[1] - a[1]);
        // For a clean chart, maybe just take top top N or all if it's not too many. The CSV has quite a few.
        // Let's just map all or top 12 to match the previous aesthetic.
        const topLocations = sortedLocations.slice(0, 12);
        
        const locNames = topLocations.map(item => item[0]);
        const locRevenues = topLocations.map(item => item[1]);

        const margin = revenue > 0 ? ((profit / revenue) * 100).toFixed(1) : 0;

        setMetrics({
          totalRevenue: revenue,
          totalExpenses: expenses,
          netProfit: profit,
          margin: margin,
          locationData: locRevenues,
          locationNames: locNames
        });
        
        setLoading(false);
      }
    });
  }, []);

  const maxMonthRev = Math.max(...metrics.locationData, 1); // Avoid division by zero

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
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Profit & Loss Analysis</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive overview of your franchise's financial performance, tracking revenue against expenses.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-green-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 font-medium">Total Revenue</h3>
              <FaArrowUp className="text-green-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">₹{metrics.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-green-600 mt-2">from CSV Dataset</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-red-500">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 font-medium">Total Expenses</h3>
              <FaArrowDown className="text-red-500" />
            </div>
            <div className="text-3xl font-bold text-gray-900">₹{metrics.totalExpenses.toLocaleString()}</div>
            <div className="text-sm text-red-600 mt-2">from CSV Dataset</div>
          </div>
          
          <div className="bg-white rounded-xl shadow-md p-6 border-t-4 border-primary">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-gray-500 font-medium">Net Profit</h3>
              <FaMoneyBillWave className="text-primary text-xl" />
            </div>
            <div className="text-3xl font-bold text-primary">₹{metrics.netProfit.toLocaleString()}</div>
            <div className="text-sm text-gray-500 mt-2">Margin: {metrics.margin}%</div>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-md p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-800">Location Revenue Breakdown</h2>
            <FaChartBar className="text-gray-400 text-2xl" />
          </div>
          <div className="h-64 flex items-end justify-between gap-2 border-b border-gray-200 pb-2">
            {/* Dynamic Chart Bars */}
            {metrics.locationData.map((revenueValue, i) => {
              const heightPercentage = Math.round((revenueValue / maxMonthRev) * 100);
              return (
                <div key={i} className="w-full flex flex-col justify-end group relative cursor-pointer h-full">
                  <div 
                    className="bg-primary hover:bg-primary-dark transition-all rounded-t-sm" 
                    style={{ height: `${heightPercentage}%` }}
                  ></div>
                  <div className="opacity-0 group-hover:opacity-100 absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-800 text-white text-xs py-1 px-2 rounded whitespace-nowrap transition-opacity pointer-events-none z-10">
                    {metrics.locationNames[i]}: ₹{revenueValue.toLocaleString()}
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-4 px-2 overflow-x-auto">
            {metrics.locationNames.map((name, i) => (
              <span key={i} className="truncate w-full text-center px-1" title={name}>{name.substring(0, 3)}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitLossAnalysis;
