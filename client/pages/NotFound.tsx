import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-amber-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <img
          src="https://via.placeholder.com/100x100?text=Logo"
          alt="Sagar Hardware and Ply Stores Logo"
          className="mx-auto h-24 w-24 rounded-lg shadow-lg bg-white p-2 mb-8"
        />

        <h1 className="text-6xl font-bold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
          Sorry, the page you're looking for doesn't exist. Let's get you back
          to our store.
        </p>

        <div className="space-y-4">
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors"
          >
            Return to Home
          </Link>

          <p className="text-sm text-gray-500 mt-4">
            Sagar Hardware & Ply Stores - Your trusted hardware partner
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
