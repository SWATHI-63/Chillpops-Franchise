import { useState, useEffect } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMoreOpen, setIsMoreOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(
    localStorage.getItem("isAdminLoggedIn") === "true"
  );
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    // Listen for custom authentication changes (since localStorage changes aren't reactive within the same tab easily)
    const handleAuthChange = () => {
      setIsAdminLoggedIn(localStorage.getItem("isAdminLoggedIn") === "true");
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("authChange", handleAuthChange);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("authChange", handleAuthChange);
    };
  }, []);

  const handleNavClick = () => {
    setIsOpen(false);
  };

  const handleMoreClick = () => {
    setIsMoreOpen(!isMoreOpen);
  };

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Us" },
    { path: "/flavours", label: "Flavours" },
    { path: "/franchise-model", label: "Franchise Model" },
    { path: "/locations", label: "Locations" },
    { path: "/apply", label: "Apply Now" },
    { path: "/contact", label: "Contact" },
  ];

  const moreLinks = [
    { path: "/profit-loss-analysis", label: "Profit / Loss Analysis" },
    { path: "/sales-report", label: "Sales Report" },
    {
      path: "/financial-report-monitoring",
      label: "Financial Report Monitoring",
    },
    { path: "/revenue-calculation", label: "Revenue Calculation" },
    { path: "/live-dashboard", label: "Live Dashboard" },
    { path: "/franchise-opportunity", label: "Franchise Opportunity" },
  ];

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg py-4"
          : "bg-white/95 backdrop-blur-sm py-5"
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img
              src={`${import.meta.env.BASE_URL}logo.png`}
              alt="Chill Pops Logo"
              className="h-12 md:h-16 w-auto object-contain transform group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={handleNavClick}
                className={`font-medium transition-colors duration-300 ${
                  location.pathname === link.path
                    ? "text-primary"
                    : "text-gray-700 hover:text-primary"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="relative relative-group flex items-center">
              {isAdminLoggedIn ? (
                <>
                  <button
                    onClick={handleMoreClick}
                    className="text-gray-700 hover:text-primary transition-colors flex items-center gap-1 p-2 rounded-full hover:bg-gray-100"
                    title="Menu"
                  >
                    <FaBars size={24} />
                  </button>
                  {isMoreOpen && (
                    <div className="absolute right-0 top-full mt-4 w-64 bg-white rounded-xl shadow-2xl py-3 z-50 border border-gray-100 animate-slide-up origin-top-right">
                      {moreLinks.map((link) => (
                        <Link
                          key={link.path}
                          to={link.path}
                          onClick={() => setIsMoreOpen(false)}
                          className="block px-6 py-3.5 text-[15px] font-medium text-slate-700 hover:bg-pink-50 hover:text-primary transition-all duration-200"
                        >
                          {link.label}
                        </Link>
                      ))}
                      {/* Logout option */}
                      <button
                        onClick={() => {
                          setIsMoreOpen(false);
                          localStorage.removeItem("isAdminLoggedIn");
                          window.dispatchEvent(new Event("authChange"));
                        }}
                        className="w-full text-left block px-6 py-3.5 text-[15px] font-medium text-red-600 hover:bg-red-50 transition-all duration-200 border-t border-gray-100 mt-2"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <Link
                  to="/admin-login"
                  className="text-gray-700 hover:text-primary transition-colors flex items-center justify-center p-2 rounded-full hover:bg-gray-100"
                  title="Admin Login"
                >
                  <FaBars size={24} />
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-700 hover:text-primary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col space-y-4">
              {isAdminLoggedIn ? (
                <>
                  {[...navLinks, ...moreLinks].map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      onClick={handleNavClick}
                      className={`font-medium transition-colors duration-300 ${
                        location.pathname === link.path
                          ? "text-primary"
                          : "text-gray-700 hover:text-primary"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      localStorage.removeItem("isAdminLoggedIn");
                      window.dispatchEvent(new Event("authChange"));
                    }}
                    className="text-left font-medium text-red-600 hover:bg-red-50 transition-all duration-200 border-t border-gray-100 pt-4"
                  >
                    Logout
                  </button>
                </>
              ) : (
                [...navLinks, { path: "/admin-login", label: "Admin Login" }].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={handleNavClick}
                    className={`font-medium transition-colors duration-300 ${
                      location.pathname === link.path
                        ? "text-primary"
                        : "text-gray-700 hover:text-primary"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
