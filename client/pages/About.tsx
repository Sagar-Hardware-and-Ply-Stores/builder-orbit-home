import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, isLoggedIn } from "@/lib/auth";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function About() {
  const [user, setUser] = useState(getCurrentUser());
  const navigate = useNavigate();

  useEffect(() => {
    setUser(getCurrentUser());
  }, []);


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">About Us</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn more about Sagar Hardware & Ply Stores, our mission, and our
            commitment to serving the community with quality products and
            exceptional service.
          </p>
        </div>

        {/* Company Story */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-gray-600 mb-4">
              Established with a vision to provide the finest quality hardware
              and construction materials, Sagar Hardware & Ply Stores has been
              serving the community for years. We started as a small local
              business with a simple goal: to offer reliable products at
              competitive prices.
            </p>
            <p className="text-gray-600 mb-4">
              Over the years, we have grown into a trusted name in the hardware
              industry, known for our extensive inventory, knowledgeable staff,
              and unwavering commitment to customer satisfaction.
            </p>
            <p className="text-gray-600">
              Today, we continue to evolve and adapt to meet the changing needs
              of our customers, while maintaining the same core values that have
              guided us from the beginning.
            </p>
          </div>
          <div className="bg-gradient-to-br from-slate-100 to-blue-100 rounded-xl p-8 border border-slate-200 shadow-lg">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h3>
            <p className="text-gray-700 mb-6">
              To be the leading provider of quality hardware and construction
              materials, delivering exceptional value and service to our
              customers while supporting their projects and dreams.
            </p>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Vision
            </h3>
            <p className="text-gray-700">
              To build lasting relationships with our customers and suppliers,
              contributing to the growth and development of our community
              through reliable products and trusted partnerships.
            </p>
          </div>
        </div>

        {/* Values Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 p-8 text-center hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Quality
              </h3>
              <p className="text-gray-600">
                We source only the finest materials and products from trusted
                manufacturers to ensure superior quality in everything we offer.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 p-8 text-center hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Service
              </h3>
              <p className="text-gray-600">
                Our knowledgeable team is dedicated to providing exceptional
                customer service and expert advice for all your project needs.
              </p>
            </div>

            <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 p-8 text-center hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-r from-slate-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  ></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Trust
              </h3>
              <p className="text-gray-600">
                Building lasting relationships based on honesty, reliability,
                and transparency in all our business dealings.
              </p>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="bg-white rounded-xl shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-8">
            Why Choose Us?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="bg-gradient-to-r from-slate-600 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">15+</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">
                Years Experience
              </h3>
              <p className="text-gray-600 text-sm">
                Serving the community with dedication
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-slate-600 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">1000+</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Products</h3>
              <p className="text-gray-600 text-sm">
                Wide range of quality materials
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-slate-600 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">24/7</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Support</h3>
              <p className="text-gray-600 text-sm">
                Always here when you need us
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gradient-to-r from-slate-600 to-blue-600 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-lg">
                <span className="text-2xl font-bold text-white">100%</span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Satisfaction</h3>
              <p className="text-gray-600 text-sm">
                Guaranteed customer satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-slate-700 via-blue-800 to-indigo-800 rounded-2xl shadow-2xl p-10 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
          <div className="relative z-10">
            <h3 className="text-3xl font-bold mb-4">
              Ready to Start Your Project?
            </h3>
            <p className="text-lg mb-8 opacity-90">
              Visit our store today and experience the difference quality makes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 bg-white text-slate-800 font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                Contact Us
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-lg hover:bg-white hover:text-slate-800 transition-all"
              >
                View Services
              </Link>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
