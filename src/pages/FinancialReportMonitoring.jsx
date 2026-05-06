import { useState, useEffect } from "react";
import { FaShieldAlt, FaExclamationTriangle, FaCheckCircle, FaFileInvoiceDollar, FaSpinner, FaDownload, FaChartLine, FaChartPie } from "react-icons/fa";
import Papa from "papaparse";

const FinancialReportMonitoring = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    healthScore: 0,
    approvedReports: 0,
    pendingReview: 3, // Simulated pending
    discrepancies: 0
  });

  useEffect(() => {
    Papa.parse("/datasets/chill_pops_profit_loss_dataset.csv", {
      download: true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
      complete: (results) => {
        const rows = results.data;
        
        // Group by Date to simulate "Daily Financial Reports"
        const dailyReports = {};
        let discrepanciesCount = 0;

        rows.forEach(row => {
          if (row.Date) {
            if (!dailyReports[row.Date]) {
              dailyReports[row.Date] = { revenue: 0, profit: 0, count: 0 };
            }
            dailyReports[row.Date].revenue += row.Revenue || 0;
            dailyReports[row.Date].profit += row.Profit || 0;
            dailyReports[row.Date].count += 1;
            
            // Flag negative profit or missing revenue as a discrepancy for monitoring
            if (row.Profit < 0 || !row.Revenue) {
              discrepanciesCount++;
            }
          }
        });

        const totalDays = Object.keys(dailyReports).length;
        // Calculate health score based on percentage of non-discrepancy transactions
        const totalTxns = rows.length || 1;
        const health = Math.max(0, Math.round(((totalTxns - discrepanciesCount) / totalTxns) * 100));
        
        setMetrics({
          healthScore: health,
          approvedReports: totalDays,
          pendingReview: Math.floor(totalDays * 0.05) || 3, // Just a simulated small number
          discrepancies: discrepanciesCount
        });

        setLoading(false);
      }
    });
  }, []);

  if (loading) {
    return (
      <div className="pt-32 pb-16 min-h-screen bg-gray-50 flex items-center justify-center">
        <FaSpinner className="animate-spin text-4xl text-primary" />
        <span className="ml-3 text-xl text-gray-600">Analyzing Financial Data...</span>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Report Monitoring</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Audit, track, and monitor all franchise financial disclosures to ensure compliance and transparency.
          </p>
        </div>

        <div className="mb-10 p-6 bg-gradient-to-r from-primary to-pink-500 rounded-2xl text-white shadow-lg flex flex-col md:flex-row justify-between items-center text-center md:text-left gap-6">
          <div className="flex items-center gap-4">
            <FaShieldAlt className="text-5xl opacity-80" />
            <div>
              <h2 className="text-2xl font-bold">Health Score</h2>
              <p className="text-white/80">Financial Compliance & Audit Rating</p>
              <p className="text-xs text-white/60 mt-1">Based on profit margins & CSV data integrity</p>
            </div>
          </div>
          <div className="text-6xl font-extrabold flex items-baseline gap-2">
            {metrics.healthScore}<span className="text-2xl font-normal text-white/70">/100</span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white border-l-4 border-green-500 p-6 rounded-xl shadow-md flex items-center justify-between hover:-translate-y-1 transition-transform">
            <div>
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Approved Reports</h4>
              <div className="flex items-end gap-2">
                <div className="text-3xl font-black text-gray-800">{metrics.approvedReports}</div>
                <div className="text-sm font-medium text-green-600 mb-1">days logged</div>
              </div>
            </div>
            <div className="p-3 bg-green-50 rounded-full">
              <FaCheckCircle className="text-3xl text-green-500" />
            </div>
          </div>
          
          <div className="bg-white border-l-4 border-yellow-500 p-6 rounded-xl shadow-md flex items-center justify-between hover:-translate-y-1 transition-transform">
            <div>
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Pending Review</h4>
              <div className="text-3xl font-black text-gray-800">{metrics.pendingReview}</div>
            </div>
            <div className="p-3 bg-yellow-50 rounded-full">
              <FaFileInvoiceDollar className="text-3xl text-yellow-500" />
            </div>
          </div>
          
          <div className="bg-white border-l-4 border-red-500 p-6 rounded-xl shadow-md flex items-center justify-between hover:-translate-y-1 transition-transform">
            <div>
              <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-1">Discrepancies</h4>
              <div className="text-3xl font-black text-gray-800">{metrics.discrepancies}</div>
              {metrics.discrepancies > 0 && (
                <div className="text-xs font-medium text-red-500 mt-1">transactions flagged</div>
              )}
            </div>
            <div className="p-3 bg-red-50 rounded-full">
              <FaExclamationTriangle className="text-3xl text-red-500" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Download</h2>
          <p className="text-gray-600 mb-8 max-w-xl mx-auto">
            Export complete historical data across all franchise operations. Useful for deep-dive offline analytics, audits, and generating quarterly financial reviews.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
            <a 
              href="/datasets/chill_pops_profit_loss_dataset.csv" 
              download="Profit_Loss_Financial_Status.csv"
              className="flex items-center justify-center gap-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <FaChartLine className="text-xl" />
              <span>Profit / Loss & Financial Status</span>
              <FaDownload className="ml-2" />
            </a>
            
            <a 
              href="/datasets/chill_pops_sales_dataset_updated.csv" 
              download="Sales_Revenue_Calculation.csv"
              className="flex items-center justify-center gap-3 bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-xl transition-all shadow-md hover:shadow-lg"
            >
              <FaChartPie className="text-xl" />
              <span>Sales Report & Revenue Data</span>
              <FaDownload className="ml-2" />
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FinancialReportMonitoring;
