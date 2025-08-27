import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authenticateUser, setCurrentUser, isLoggedIn, authenticateAdmin, setAdminSession } from "@/lib/auth";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Basic validation
    if (!username.trim() || !password.trim()) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Check if admin credentials first
    const adminResult = authenticateAdmin(username, password);

    if (adminResult.success) {
      // Admin login
      setCurrentUser({ username: username.trim() });
      setAdminSession();
      navigate("/admin");
    } else {
      // Regular user authentication
      const result = authenticateUser(username, password);

      if (result.success) {
        // Set session and redirect
        setCurrentUser({ username: username.trim() });
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-10">
        {/* Logo and Header */}
        <div className="text-center">
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F4fc264d2794b41bc8b3e094356cfa7f4%2F35ecaab49e544df4a62b1e71318bdbca?format=webp&width=800"
            alt="Sagar Hardware and Ply Stores Logo"
            className="mx-auto h-24 w-28 rounded-xl shadow-xl bg-white p-3 object-contain hover:shadow-2xl transition-shadow"
          />
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to your Sagar Hardware account
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
          <div className="bg-white rounded-2xl shadow-2xl p-10 space-y-8">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your username"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-slate-700 to-blue-800 hover:from-slate-800 hover:to-blue-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </div>

          <div className="text-center space-y-4">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-blue-600 hover:text-blue-700 transition-colors"
              >
                Sign up here
              </Link>
            </p>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs text-blue-800 font-medium mb-2">Admin Access:</p>
              <p className="text-xs text-blue-700">
                Username: <span className="font-mono bg-blue-100 px-1 rounded">admin</span><br/>
                Password: <span className="font-mono bg-blue-100 px-1 rounded">SagarAdmin2025!</span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
