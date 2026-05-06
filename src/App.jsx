import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Flavours from "./pages/Flavours";
import FranchiseModel from "./pages/FranchiseModel";
import Locations from "./pages/Locations";
import Apply from "./pages/Apply";
import Contact from "./pages/Contact";
import ProfitLossAnalysis from "./pages/ProfitLossAnalysis";
import SalesReport from "./pages/SalesReport";
import FinancialReportMonitoring from "./pages/FinancialReportMonitoring";
import RevenueCalculation from "./pages/RevenueCalculation";
import LiveDashboard from "./pages/LiveDashboard";
import AdminLogin from "./pages/AdminLogin";
import FranchiseOpportunity from "./pages/FranchiseOpportunity";

function App() {
  return (
    <Router basename={import.meta.env.BASE_URL}>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/flavours" element={<Flavours />} />
            <Route path="/franchise-model" element={<FranchiseModel />} />
            <Route path="/locations" element={<Locations />} />
            <Route path="/apply" element={<Apply />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/profit-loss-analysis" element={<ProfitLossAnalysis />} />
            <Route path="/sales-report" element={<SalesReport />} />
            <Route
              path="/financial-report-monitoring"
              element={<FinancialReportMonitoring />}
            />
            <Route path="/revenue-calculation" element={<RevenueCalculation />} />
            <Route path="/live-dashboard" element={<LiveDashboard />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/franchise-opportunity" element={<FranchiseOpportunity />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
