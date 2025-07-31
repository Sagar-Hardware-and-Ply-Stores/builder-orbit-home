import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, clearCurrentUser, isLoggedIn } from "@/lib/auth";
import useEmblaCarousel from "embla-carousel-react";

const FeaturesCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
    slidesToScroll: 1,
    breakpoints: {
      "(min-width: 768px)": { slidesToScroll: 2 },
      "(min-width: 1024px)": { slidesToScroll: 3 },
    },
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  const features = [
    {
      icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z",
      title: "Quality Tools",
      description:
        "Professional-grade tools and equipment for all your projects.",
    },
    {
      icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
      title: "Ply & Timber",
      description:
        "Premium quality plywood and timber for construction and furniture.",
    },
    {
      icon: "M13 10V3L4 14h7v7l9-11h-7z",
      title: "Electrical Supplies",
      description:
        "Complete range of electrical components and wiring solutions.",
    },
    {
      icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
      title: "Construction Materials",
      description:
        "High-quality cement, bricks, steel, and building materials for all construction needs.",
    },
  ];

  return (
    <div className="relative mb-12">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {features.map((feature, index) => (
            <div
              key={index}
              className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 pl-4 first:pl-0"
            >
              <div className="bg-white rounded-xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow h-full">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-orange-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d={feature.icon}
                    ></path>
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={scrollPrev}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-10"
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
      </button>

      <button
        onClick={scrollNext}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-shadow z-10"
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5 text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5l7 7-7 7"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default function Index() {
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }

    // Update user state
    setUser(getCurrentUser());
  }, [navigate]);

  const handleLogout = () => {
    clearCurrentUser();
    navigate("/login");
  };

  // Show loading or redirect if not logged in
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50">
      {/* Header */}
      <header
        className="shadow-sm border-b border-orange-100"
        style={{ backgroundColor: "#D97706" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <img
                src="https://cdn.builder.io/api/v1/image/assets%2F4fc264d2794b41bc8b3e094356cfa7f4%2F35ecaab49e544df4a62b1e71318bdbca?format=webp&width=800"
                alt="Sagar Hardware and Ply Stores Logo"
                className="h-16 w-20 rounded-lg bg-white shadow-sm object-contain p-1"
              />
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  Sagar Hardware & Ply Stores
                </h1>
                <p className="text-sm text-gray-600">
                  Your trusted hardware partner
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, <span className="font-medium">{user.username}</span>
              </span>
              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Welcome to Sagar Hardware & Ply Stores
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your one-stop destination for all hardware and ply needs. Quality
            products, competitive prices, and exceptional service.
          </p>
        </div>

        {/* Features Carousel */}
        <FeaturesCarousel />

        {/* Registration Section */}
        <div className="bg-gradient-to-r from-orange-600 to-amber-600 rounded-xl shadow-lg p-8 text-center text-white mb-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">
              Join Our Network
            </h3>
            <p className="text-lg mb-8 opacity-90">
              Register as a customer to get exclusive deals or become a supplier to partner with us
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2">Customer Registration</h4>
                <p className="opacity-90 text-sm">
                  Get access to exclusive prices, special offers, and priority service for all your hardware needs.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"></path>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2">Supplier Registration</h4>
                <p className="opacity-90 text-sm">
                  Partner with us to supply quality materials and expand your business reach in the hardware industry.
                </p>
              </div>
            </div>

            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-orange-600 font-semibold rounded-lg hover:bg-gray-50 transition-colors shadow-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
              </svg>
              Register Now
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Visit our store for expert advice and competitive prices on all your
            hardware and construction needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="bg-orange-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Store Hours</h4>
              <p className="text-gray-700">Mon - Sat: 8:00 AM - 8:00 PM</p>
              <p className="text-gray-700">Sunday: 9:00 AM - 6:00 PM</p>
            </div>
            <div className="bg-orange-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-2">Contact Info</h4>
              <p className="text-gray-700">Phone: +91 98765 43210</p>
              <p className="text-gray-700">Email: info@sagarhardware.com</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-orange-100 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-600">
            <p>&copy; 2024 Sagar Hardware & Ply Stores. All rights reserved.</p>
            <p className="mt-2">
              Your trusted partner for quality hardware solutions.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
