import { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";

const Apply = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    investmentCapacity: "",
    message: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Save to localStorage for the admin side
    const existingApplications = JSON.parse(localStorage.getItem("franchiseApplications") || "[]");
    const newApplication = {
      ...formData,
      id: Date.now(),
      date: new Date().toISOString()
    };
    localStorage.setItem("franchiseApplications", JSON.stringify([...existingApplications, newApplication]));

    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        city: "",
        investmentCapacity: "",
        message: "",
      });
    }, 5000);
  };

  return (
    <div className="pt-16 md:pt-20">
      <section className="section-padding bg-gradient-to-br from-primary to-pink-600 text-white">
        <div className="container-custom text-center px-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6">
            Apply for Franchise
          </h1>
          <p className="text-base md:text-xl opacity-90">
            Start your ChillPops journey today
          </p>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom max-w-2xl px-4">
          {isSubmitted ? (
            <div className="card bg-green-50 border-2 border-green-500 p-6 md:p-8 text-center">
              <FaCheckCircle className="text-5xl md:text-6xl text-green-500 mx-auto mb-4" />
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-2">
                Application Submitted!
              </h3>
              <p className="text-gray-700 text-sm md:text-base">
                Thank you for your interest. Our team will contact you within
                24-48 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="10-digit mobile number"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Preferred City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                  placeholder="Your city"
                />
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Investment Capacity *
                </label>
                <select
                  name="investmentCapacity"
                  value={formData.investmentCapacity}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none"
                >
                  <option value="">Select Range</option>
                  <option value="5-8">₹5-8 Lakhs</option>
                  <option value="8-10">₹8-10 Lakhs</option>
                  <option value="10+">Above ₹10 Lakhs</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-primary focus:outline-none resize-none"
                  placeholder="Tell us about yourself..."
                ></textarea>
              </div>

              <button type="submit" className="w-full btn-primary text-lg">
                Submit Application
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
};

export default Apply;
