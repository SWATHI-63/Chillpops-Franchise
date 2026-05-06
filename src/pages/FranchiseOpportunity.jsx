import { useState, useEffect } from "react";
import { FaUserTie, FaEnvelope, FaPhone, FaMapMarkerAlt, FaRupeeSign, FaCalendarAlt, FaTrash } from "react-icons/fa";

const FranchiseOpportunity = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // Load applications from localStorage
    const savedApplications = JSON.parse(localStorage.getItem("franchiseApplications") || "[]");
    // Sort so newest appears first
    setApplications(savedApplications.sort((a, b) => new Date(b.date) - new Date(a.date)));
  }, []);

  const handleDelete = (id) => {
    const updatedApps = applications.filter(app => app.id !== id);
    setApplications(updatedApps);
    localStorage.setItem("franchiseApplications", JSON.stringify(updatedApps));
  };

  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  return (
    <div className="pt-24 pb-16 min-h-screen bg-gray-50">
      <div className="container-custom max-w-5xl">
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full bg-primary/10 text-primary mb-4">
            <FaUserTie className="text-4xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Franchise Applications</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Review and manage all submitted franchise opportunity leads from prospective partners.
          </p>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FaUserTie className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">No Lead Applications Yet</h3>
            <p className="text-gray-500">
              When users apply from the "Apply for Franchise" page, their details will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {applications.map((app) => (
              <div key={app.id} className="bg-white rounded-xl shadow-md border-l-4 border-primary overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{app.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                        <FaCalendarAlt className="text-primary/70" />
                        Applied on {formatDate(app.date)}
                      </div>
                    </div>
                    <button 
                      onClick={() => handleDelete(app.id)}
                      className="text-red-400 hover:text-red-600 p-2 hover:bg-red-50 rounded-full transition-colors"
                      title="Delete Application"
                    >
                      <FaTrash />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-50 p-2 rounded-lg text-blue-500 mt-1">
                        <FaEnvelope />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Email</p>
                        <a href={`mailto:${app.email}`} className="text-gray-800 font-medium hover:text-primary transition-colors">
                          {app.email}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-green-50 p-2 rounded-lg text-green-500 mt-1">
                        <FaPhone />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Phone</p>
                        <a href={`tel:${app.phone}`} className="text-gray-800 font-medium hover:text-primary transition-colors">
                          {app.phone}
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-orange-50 p-2 rounded-lg text-orange-500 mt-1">
                        <FaMapMarkerAlt />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Preferred City</p>
                        <p className="text-gray-800 font-medium">{app.city}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="bg-purple-50 p-2 rounded-lg text-purple-500 mt-1">
                        <FaRupeeSign />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">Investment Capacity</p>
                        <p className="text-gray-800 font-medium">
                          {app.investmentCapacity === "5-8" && "₹5-8 Lakhs"}
                          {app.investmentCapacity === "8-10" && "₹8-10 Lakhs"}
                          {app.investmentCapacity === "10+" && "Above ₹10 Lakhs"}
                          {!["5-8", "8-10", "10+"].includes(app.investmentCapacity) && "Not specified"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {app.message && (
                    <div className="mt-6 bg-gray-50 border border-gray-100 rounded-lg p-4">
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Message Included</p>
                      <p className="text-gray-700 italic">"{app.message}"</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FranchiseOpportunity;