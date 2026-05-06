import { useState, useEffect } from "react";
import { FaCalculator, FaChartPie, FaPercentage, FaSpinner } from "react-icons/fa";
import Papa from "papaparse";
import RevenueBreakdownCard from "../components/RevenueBreakdownCard";

const RevenueCalculation = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    paymentBreakdown: [],
    salesTypeBreakdown: [],
    projectedAnnual: 0,
    dailyAvg: 0,
    highestTransaction: 0
  });

  useEffect(() => {
    Papa.parse("/datasets/chill_pops_sales_dataset_updated.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data;
        
        let totalRevenue = 0;
        let totalOrders = 0;
        const paymentMethods = {};
        const salesTypes = {
          "In-Store Sales": 0,
          "Events & Catering": 0,
          "Bulk Orders": 0
        };
        
        let minDate = new Date();
        let maxDate = new Date(0);
        let maxTransaction = 0;

        rows.forEach(row => {
          const amount = row.Total_Amount || 0;
          const quantity = row.Quantity || 0;
          totalRevenue += amount;
          totalOrders++;

          if (amount > maxTransaction) {
            maxTransaction = amount;
          }
          
          if (row.Date) {
            const d = new Date(row.Date);
            if (d < minDate) minDate = d;
            if (d > maxDate) maxDate = d;
          }

          if (row.Payment_Method) {
            paymentMethods[row.Payment_Method] = (paymentMethods[row.Payment_Method] || 0) + amount;
          }

          // Approximating Sales Type based on quantity metric
          if (quantity >= 5) {
            salesTypes["Bulk Orders"] += amount;
          } else if (quantity >= 3) {
            salesTypes["Events & Catering"] += amount;
          } else {
            salesTypes["In-Store Sales"] += amount;
          }
        });

        // Calculate breakdown percentages for Payment Methods
        const breakdown = Object.entries(paymentMethods).map(([method, amount]) => {
          return {
            method,
            amount,
            percentage: totalRevenue > 0 ? Math.round((amount / totalRevenue) * 100) : 0
          };
        }).sort((a, b) => b.percentage - a.percentage); // Sort highest to lowest

        // Calculate breakdown percentages for Sales Types
        const salesTypeBreakdown = Object.entries(salesTypes).map(([type, amount]) => {
          return {
            type,
            amount,
            percentage: totalRevenue > 0 ? Math.round((amount / totalRevenue) * 100) : 0
          };
        }).sort((a, b) => b.percentage - a.percentage);

        // Calculate projected annual (average daily * 365)
        let daysDiff = (maxDate - minDate) / (1000 * 60 * 60 * 24);
        if (daysDiff <= 0 || isNaN(daysDiff)) daysDiff = 1;
        const dailyAvg = totalRevenue / daysDiff;
        const projected = Math.round(dailyAvg * 365);

        setMetrics({
          paymentBreakdown: breakdown,
          salesTypeBreakdown: salesTypeBreakdown,
          projectedAnnual: projected,
          dailyAvg: Math.round(dailyAvg),
          highestTransaction: maxTransaction 
        });

        setLoading(false);
      }
    });
  }, []);

  const formatCurrency = (val) => {
    if (val >= 1000000) return `₹${(val / 1000000).toFixed(2)}M`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(1)}k`;
    return `₹${val.toLocaleString()}`;
  };

  if (loading) {
    return (
      <div className="pt-32 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-primary" />
        <span className="ml-3 text-xl text-gray-600">Calculating Revenue Data...</span>
      </div>
    );
  }

  const colors = ["bg-primary", "bg-pink-500", "bg-purple-500", "bg-blue-500"];

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full bg-primary/10 text-primary mb-4">
            <FaCalculator className="text-4xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Revenue Calculation</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Analyze your income streams, average ticket sizes, and revenue forecasts based on sales data.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mb-8">
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
            <RevenueBreakdownCard 
              title="Revenue by Payment Method" 
              items={metrics.paymentBreakdown.map(item => ({...item, label: item.method || "Unspecified"}))}
              emptyMessage="No payment data available in CSV."
              colorOffset={0}
            />
          </div>
          
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8">
            <RevenueBreakdownCard 
              title="Revenue Breakdown (Sales Type)" 
              items={metrics.salesTypeBreakdown.map(item => ({...item, label: item.type}))}
              emptyMessage="No sales type data available in CSV."
              colorOffset={1}
            />
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 mb-8 p-8 flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <FaChartPie className="text-6xl text-gray-300 mx-auto mb-4" />
              <div className="text-sm font-bold tracking-widest text-primary uppercase mb-2">Projected Annual</div>
              <div className="text-4xl md:text-5xl font-black text-gray-900" title={`₹${metrics.projectedAnnual.toLocaleString()}`}>
                {formatCurrency(metrics.projectedAnnual)}
              </div>
              <p className="text-xs text-gray-500 mt-2 font-medium">Derived from daily dataset average</p>
            </div>
          </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gradient-to-b from-gray-900 to-gray-800 rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
            <FaPercentage className="absolute -right-4 -top-4 text-7xl text-white/5 transition-transform group-hover:scale-110" />
            <h3 className="text-lg text-gray-400 font-medium mb-1">Average Daily Revenue</h3>
            <div className="text-5xl font-bold text-white mb-4">₹{metrics.dailyAvg.toLocaleString()}</div>
            <p className="text-sm text-green-400 font-medium">Calculated based on sales spread across available dates</p>
          </div>
          
          <div className="bg-gradient-to-b from-primary to-primary-dark rounded-2xl p-8 text-white shadow-xl relative overflow-hidden group">
            <h3 className="text-lg text-white/80 font-medium mb-1">Highest Value Order</h3>
            <div className="text-5xl font-bold text-white mb-4">₹{metrics.highestTransaction.toLocaleString()}</div>
            <p className="text-sm text-white/90 font-medium">Maximum single transaction in dataset</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueCalculation;
