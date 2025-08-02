import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, clearCurrentUser, isLoggedIn } from "@/lib/auth";
import Footer from "@/components/Footer";

export default function Services() {
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    setUser(getCurrentUser());
  }, [navigate]);

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/login");
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-amber-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  const services = [
    {
      icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z",
      title: "Hardware Tools & Equipment",
      description:
        "Professional-grade tools and equipment for all your construction and maintenance needs.",
      features: [
        "Power Tools",
        "Hand Tools",
        "Safety Equipment",
        "Measuring Instruments",
        "Cutting Tools",
        "Fasteners & Hardware",
      ],
      colorScheme: {
        bg: "bg-gradient-to-br from-blue-50 to-indigo-100",
        iconBg: "bg-gradient-to-r from-blue-500 to-indigo-600",
        iconColor: "text-white",
        checkColor: "text-blue-600",
        borderColor: "border-blue-200",
        shadowColor: "hover:shadow-blue-200/50",
      },
    },
    {
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      title: "Plywood & Timber",
      description:
        "Premium quality plywood, timber, and wood products for construction and furniture making.",
      features: [
        "Marine Plywood",
        "Commercial Plywood",
        "Hardwood Timber",
        "Softwood Planks",
        "Engineered Wood",
        "Wood Preservatives",
      ],
      colorScheme: {
        bg: "bg-gradient-to-br from-green-50 to-emerald-100",
        iconBg: "bg-gradient-to-r from-green-500 to-emerald-600",
        iconColor: "text-white",
        checkColor: "text-green-600",
        borderColor: "border-green-200",
        shadowColor: "hover:shadow-green-200/50",
      },
    },
    {
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      title: "Electrical Supplies",
      description:
        "Complete range of electrical components, wiring solutions, and lighting fixtures.",
      features: [
        "Cables & Wires",
        "Switches & Sockets",
        "Circuit Breakers",
        "LED Lights",
        "Electrical Panels",
        "Conduits & Fittings",
      ],
      colorScheme: {
        bg: "bg-gradient-to-br from-yellow-50 to-amber-100",
        iconBg: "bg-gradient-to-r from-yellow-500 to-amber-600",
        iconColor: "text-white",
        checkColor: "text-yellow-600",
        borderColor: "border-yellow-200",
        shadowColor: "hover:shadow-yellow-200/50",
      },
    },
    {
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      title: "Construction Materials",
      description:
        "High-quality cement, bricks, steel, and other essential building materials.",
      features: [
        "Portland Cement",
        "Steel Rods & Bars",
        "Bricks & Blocks",
        "Sand & Aggregates",
        "Roofing Materials",
        "Waterproofing",
      ],
      colorScheme: {
        bg: "bg-gradient-to-br from-red-50 to-rose-100",
        iconBg: "bg-gradient-to-r from-red-500 to-rose-600",
        iconColor: "text-white",
        checkColor: "text-red-600",
        borderColor: "border-red-200",
        shadowColor: "hover:shadow-red-200/50",
      },
    },
    {
      icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4",
      title: "Plumbing & Sanitation",
      description:
        "Complete plumbing solutions including pipes, fittings, and sanitary fixtures.",
      features: [
        "PVC Pipes",
        "Metal Pipes",
        "Pipe Fittings",
        "Bathroom Fixtures",
        "Kitchen Sinks",
        "Water Pumps",
      ],
      colorScheme: {
        bg: "bg-gradient-to-br from-cyan-50 to-blue-100",
        iconBg: "bg-gradient-to-r from-cyan-500 to-blue-600",
        iconColor: "text-white",
        checkColor: "text-cyan-600",
        borderColor: "border-cyan-200",
        shadowColor: "hover:shadow-cyan-200/50",
      },
    },
    {
      icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
      title: "Paint & Finishing",
      description:
        "Quality paints, primers, and finishing materials for interior and exterior applications.",
      features: [
        "Interior Paints",
        "Exterior Paints",
        "Primers & Sealers",
        "Wood Stains",
        "Brushes & Rollers",
        "Spray Equipment",
      ],
      colorScheme: {
        bg: "bg-gradient-to-br from-purple-50 to-violet-100",
        iconBg: "bg-gradient-to-r from-purple-500 to-violet-600",
        iconColor: "text-white",
        checkColor: "text-purple-600",
        borderColor: "border-purple-200",
        shadowColor: "hover:shadow-purple-200/50",
      },
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-slate-800 via-blue-900 to-indigo-900 shadow-xl border-b border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-28 py-4">
            <div className="flex items-center space-x-6">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F4fc264d2794b41bc8b3e094356cfa7f4%2F35ecaab49e544df4a62b1e71318bdbca?format=webp&width=800"
                alt="Sagar Hardware and Ply Stores Logo"
                className="h-20 w-24 rounded-xl bg-white shadow-lg object-contain p-2 hover:shadow-xl transition-shadow"
              />
              <div className="text-2xl lg:text-3xl font-bold text-white drop-shadow-sm">
                Sagar Hardware & Ply Stores
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-white hover:text-blue-200 font-medium transition-colors"
              >
                HOME
              </Link>
              <Link
                to="/register"
                className="text-white hover:text-blue-200 font-medium transition-colors"
              >
                NETWORK
              </Link>
              <Link
                to="/about"
                className="text-white hover:text-blue-200 font-medium transition-colors"
              >
                ABOUT
              </Link>
              <Link
                to="/services"
                className="text-orange-100 font-medium border-b-2 border-orange-100 pb-1"
              >
                SERVICES
              </Link>
              <Link
                to="/contact"
                className="text-white hover:text-blue-200 font-medium transition-colors"
              >
                CONTACT
              </Link>
            </nav>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-white">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  ></path>
                </svg>
                <span className="font-medium">{user.username}</span>
              </div>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-white text-sm font-medium rounded-lg text-white hover:bg-white hover:text-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Our Services
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover our comprehensive range of hardware, construction
            materials, and services designed to meet all your building and
            renovation needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div
              key={index}
              className={`${service.colorScheme.bg} rounded-xl shadow-lg p-8 transition-all duration-300 transform hover:scale-105 ${service.colorScheme.shadowColor} hover:shadow-2xl border-2 ${service.colorScheme.borderColor}`}
            >
              <div className="flex items-start space-x-4">
                <div
                  className={`w-20 h-20 ${service.colorScheme.iconBg} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg transform rotate-3 hover:rotate-0 transition-transform duration-300`}
                >
                  <svg
                    className={`w-10 h-10 ${service.colorScheme.iconColor}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={service.icon}
                    ></path>
                  </svg>
                </div>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800">
                    {service.title}
                  </h3>
                  <p className="text-gray-700 mb-6 leading-relaxed font-medium">
                    {service.description}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-3 bg-white/60 backdrop-blur-sm rounded-lg p-2 hover:bg-white/80 transition-colors"
                      >
                        <svg
                          className={`w-5 h-5 ${service.colorScheme.checkColor} flex-shrink-0`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M5 13l4 4L19 7"
                          ></path>
                        </svg>
                        <span className="text-sm font-semibold text-gray-800">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Services */}
        <div className="bg-gradient-to-r from-slate-50 to-gray-100 rounded-2xl shadow-xl p-10 mb-16 border border-gray-200">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-12">
            Additional Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-r from-teal-400 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-teal-600 transition-colors">
                Expert Consultation
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Get professional advice from our experienced team for your
                construction and renovation projects.
              </p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-r from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                Bulk Orders
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Special pricing and delivery arrangements for large quantity
                orders and commercial projects.
              </p>
            </div>

            <div className="text-center group hover:transform hover:scale-105 transition-all duration-300">
              <div className="w-24 h-24 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:shadow-xl transition-shadow">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-green-600 transition-colors">
                Fast Delivery
              </h3>
              <p className="text-gray-700 leading-relaxed">
                Quick and reliable delivery service to get your materials to
                your project site on time.
              </p>
            </div>
          </div>
        </div>

        {/* Quality Assurance */}
        <div className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 rounded-2xl shadow-2xl p-10 text-white mb-16 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
          <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-gradient-to-br from-white/10 to-transparent transform translate-x-32 -translate-y-32"></div>

          <div className="relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-6">Quality Assurance</h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                We stand behind every product we sell with our commitment to
                quality and customer satisfaction.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center group hover:transform hover:scale-110 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-2xl transition-shadow">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-green-200 transition-colors">
                  Certified Products
                </h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  All products meet industry standards
                </p>
              </div>

              <div className="text-center group hover:transform hover:scale-110 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-2xl transition-shadow">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-pink-200 transition-colors">
                  Warranty
                </h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Comprehensive warranty coverage
                </p>
              </div>

              <div className="text-center group hover:transform hover:scale-110 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-2xl transition-shadow">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-cyan-200 transition-colors">
                  Expert Support
                </h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Professional guidance available
                </p>
              </div>

              <div className="text-center group hover:transform hover:scale-110 transition-all duration-300">
                <div className="w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:shadow-2xl transition-shadow">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-bold mb-3 group-hover:text-yellow-200 transition-colors">
                  Best Prices
                </h3>
                <p className="text-sm opacity-90 leading-relaxed">
                  Competitive and fair pricing
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            Need Help Choosing?
          </h3>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Our expert team is ready to help you find the right products and
            solutions for your specific project needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-semibold rounded-lg hover:from-orange-700 hover:to-amber-700 transition-all shadow-lg"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                ></path>
              </svg>
              Contact Us
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 border-2 border-orange-600 text-orange-600 font-semibold rounded-lg hover:bg-orange-600 hover:text-white transition-colors"
            >
              Register for Better Prices
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
