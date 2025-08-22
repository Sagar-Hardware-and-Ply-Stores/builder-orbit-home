import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getCurrentUser, isLoggedIn } from "@/lib/auth";
import { getRegistrationStats } from "@/lib/registration";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import UserManagement from "@/components/UserManagement";
import CustomerSupplierManagement from "@/components/CustomerSupplierManagement";

interface TabProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const TabNavigation: React.FC<TabProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: "overview", label: "Overview", icon: "📊" },
    { id: "users", label: "Users", icon: "👥" },
    { id: "customers", label: "Customers", icon: "🛒" },
    { id: "suppliers", label: "Suppliers", icon: "🏭" },
  ];

  return (
    <div className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex space-x-8" aria-label="Tabs">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 inline-flex items-center space-x-2 border-b-2 font-medium text-sm ${
                activeTab === tab.id
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } transition-colors`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>
    </div>
  );
};

export default function Admin() {
  const [user, setUser] = useState(getCurrentUser());
  const [activeTab, setActiveTab] = useState("overview");
  const [stats, setStats] = useState(getRegistrationStats());
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
      return;
    }
    setUser(getCurrentUser());
  }, [navigate]);

  useEffect(() => {
    // Refresh stats when tab changes
    setStats(getRegistrationStats());
  }, [activeTab]);

  const refreshStats = () => {
    setStats(getRegistrationStats());
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Admin Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="mt-1 text-sm text-gray-500">
                Welcome back, {user.username}! Manage your hardware store operations.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-sm text-gray-500">
                Last updated: {new Date().toLocaleTimeString()}
              </div>
              <button
                onClick={refreshStats}
                className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
              >
                🔄 Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === "overview" && (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">👥</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Total Customers</h3>
                    <p className="text-3xl font-bold text-blue-600">{stats.totalCustomers}</p>
                    <p className="text-sm text-gray-500">
                      {stats.activeCustomers} active, {stats.pendingCustomers} pending
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">🏭</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Total Suppliers</h3>
                    <p className="text-3xl font-bold text-green-600">{stats.totalSuppliers}</p>
                    <p className="text-sm text-gray-500">
                      {stats.activeSuppliers} active, {stats.pendingSuppliers} pending
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">⏳</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Pending Reviews</h3>
                    <p className="text-3xl font-bold text-orange-600">
                      {stats.pendingCustomers + stats.pendingSuppliers}
                    </p>
                    <p className="text-sm text-gray-500">Require attention</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                      <span className="text-2xl">📈</span>
                    </div>
                  </div>
                  <div className="ml-4">
                    <h3 className="text-lg font-semibold text-gray-900">Total Active</h3>
                    <p className="text-3xl font-bold text-purple-600">
                      {stats.activeCustomers + stats.activeSuppliers}
                    </p>
                    <p className="text-sm text-gray-500">Active partnerships</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button
                  onClick={() => setActiveTab("customers")}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🛒</span>
                    <div>
                      <h3 className="font-medium text-gray-900">Manage Customers</h3>
                      <p className="text-sm text-gray-500">View, edit, and manage customer accounts</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("suppliers")}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🏭</span>
                    <div>
                      <h3 className="font-medium text-gray-900">Manage Suppliers</h3>
                      <p className="text-sm text-gray-500">View, edit, and manage supplier partnerships</p>
                    </div>
                  </div>
                </button>

                <button
                  onClick={() => setActiveTab("users")}
                  className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 text-left transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">👥</span>
                    <div>
                      <h3 className="font-medium text-gray-900">Manage Users</h3>
                      <p className="text-sm text-gray-500">Admin user account management</p>
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "users" && (
          <UserManagement onUpdate={refreshStats} />
        )}

        {(activeTab === "customers" || activeTab === "suppliers") && (
          <CustomerSupplierManagement 
            type={activeTab as "customers" | "suppliers"} 
            onUpdate={refreshStats}
          />
        )}
      </main>

      <Footer />
    </div>
  );
}
