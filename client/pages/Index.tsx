import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCurrentUser, clearCurrentUser, isLoggedIn } from "@/lib/auth";
import {
  getStoredCategories,
  getActiveProducts,
  getProductsByCategory,
} from "@/lib/products";
import { addToCart } from "@/lib/cart";
import { toast } from "@/lib/toast";
import useEmblaCarousel from "embla-carousel-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const ProductsCarousel = () => {
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

  const categories = getStoredCategories();
  const activeProducts = getActiveProducts();

  // Get featured products (limit to first 6 for carousel)
  const featuredProducts = activeProducts.slice(0, 6);

  const handleAddToCart = (product: any) => {
    if (!product.price) {
      alert("This item is not available for purchase.");
      return;
    }

    const category = categories.find((c) => c.id === product.category);
    const result = addToCart({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      image: product.image,
      category: product.category,
    });

    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="relative mb-12">
      <div className="embla overflow-hidden" ref={emblaRef}>
        <div className="embla__container flex">
          {featuredProducts.length > 0
            ? featuredProducts.map((product, index) => {
                const category = categories.find(
                  (c) => c.id === product.category,
                );
                return (
                  <div
                    key={product.id}
                    className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 pl-4 first:pl-0"
                  >
                    <div
                      onClick={() => handleAddToCart(product)}
                      className={`bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 p-8 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full ${
                        product.price ? "cursor-pointer" : "cursor-default"
                      }`}
                      title={
                        product.price
                          ? `Click to add ${product.name} to cart`
                          : "Price not available"
                      }
                    >
                      {product.image ? (
                        <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden border-4 border-slate-200">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-16 h-16 ${category?.colorScheme.iconBg || "bg-gradient-to-r from-slate-600 to-blue-600"} rounded-full flex items-center justify-center mx-auto mb-4`}
                        >
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
                              d={
                                category?.icon ||
                                "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                              }
                            ></path>
                          </svg>
                        </div>
                      )}
                      <h3 className="text-xl font-bold text-slate-800 mb-2">
                        {product.name}
                      </h3>
                      <p className="text-slate-600 mb-3">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-center gap-2">
                        {product.price && (
                          <p className="text-lg font-semibold text-blue-600">
                            ₹{product.price.toFixed(2)}
                          </p>
                        )}
                        {product.price && (
                          <svg
                            className="w-5 h-5 text-green-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                          </svg>
                        )}
                      </div>
                      {product.price && (
                        <p className="text-xs text-gray-500 mt-2">
                          Click to add to cart
                        </p>
                      )}
                    </div>
                  </div>
                );
              })
            : // Fallback to default categories if no products
              categories.slice(0, 4).map((category, index) => (
                <div
                  key={category.id}
                  className="embla__slide flex-none w-full md:w-1/2 lg:w-1/3 pl-4 first:pl-0"
                >
                  <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 p-8 text-center hover:shadow-2xl hover:scale-105 transition-all duration-300 h-full">
                    <div
                      className={`w-16 h-16 ${category.colorScheme.iconBg} rounded-full flex items-center justify-center mx-auto mb-4`}
                    >
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
                          d={category.icon}
                        ></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-slate-600">{category.description}</p>
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
    // Update user state without redirecting
    setUser(getCurrentUser());
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Welcome Section */}
        <div className="text-center mb-20">
          {/* Hero Image */}
          <div
            className="h-96 bg-cover bg-center bg-no-repeat rounded-2xl mb-12 shadow-2xl"
            style={{
              backgroundImage:
                "url(https://cdn.builder.io/api/v1/image/assets%2F4fc264d2794b41bc8b3e094356cfa7f4%2F09bd28e6a07a4535b5bec92ee45c891f?format=webp&width=800)",
            }}
          ></div>

          {/* Welcome Text */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Welcome to Sagar Hardware & Ply Stores
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10 leading-relaxed">
              Your one-stop destination for all hardware, construction materials
              and ply needs. Quality products, competitive prices, and
              exceptional service.
            </p>

            {/* Login Button for non-authenticated users */}
            {!user && (
              <div className="mt-6">
                <Link
                  to="/login"
                  className="inline-flex items-center px-6 py-3 text-sm bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                  Member Login
                </Link>
              </div>
            )}

            {/* Welcome message for authenticated users */}
            {user && (
              <div className="mt-6">
                <p className="text-lg text-blue-600 font-medium">
                  Welcome back, {user.username}!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Products Carousel */}
        <div className="mb-24 bg-gray-50 py-16 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 rounded-3xl">
          <h2 className="text-4xl font-bold text-gray-900 text-center mb-16">
            {getActiveProducts().length > 0
              ? "Featured Products"
              : "Our Product Categories"}
          </h2>
          <ProductsCarousel />
        </div>

        {/* Registration Section */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl shadow-2xl p-12 text-center text-white mb-24 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent"></div>
          <div className="relative z-10 max-w-4xl mx-auto">
            <h3 className="text-3xl font-bold mb-4">Join Our Network</h3>
            <p className="text-lg mb-8 opacity-90">
              Register as a customer to get exclusive deals or become a supplier
              to partner with us
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
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
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2">
                  Customer Registration
                </h4>
                <p className="opacity-90 text-sm">
                  Get access to exclusive prices, special offers, and priority
                  service for all your hardware needs.
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
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
                      d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2-2v2m8 0V6a2 2 0 012 2v6a2 2 0 01-2 2H6a2 2 0 01-2-2V8a2 2 0 012-2V6"
                    ></path>
                  </svg>
                </div>
                <h4 className="text-xl font-semibold mb-2">
                  Supplier Registration
                </h4>
                <p className="opacity-90 text-sm">
                  Partner with us to supply quality materials and expand your
                  business reach in the hardware industry.
                </p>
              </div>
            </div>

            <Link
              to="/register"
              className="inline-flex items-center px-8 py-4 bg-white text-slate-800 font-semibold rounded-lg hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
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
                  d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                ></path>
              </svg>
              Register Now
            </Link>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 p-10 text-center">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Ready to Start Your Project?
          </h3>
          <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
            Visit our store for expert advice and competitive prices on all your
            hardware and construction needs.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-600 to-blue-700 rounded-xl p-8 transform hover:scale-105 transition-all shadow-lg">
              <h4 className="font-bold text-white mb-3 text-lg">Store Hours</h4>
              <p className="text-blue-100">
                Sunday- Saturday: 8:00 AM - 8:00 PM
              </p>
            </div>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl p-8 transform hover:scale-105 transition-all shadow-lg">
              <h4 className="font-bold text-white mb-3 text-lg">
                Contact Info
              </h4>
              <p className="text-blue-100">Phone: +977 9846078267</p>
              <p className="text-blue-100">
                Email: sagarhardwareandplystores@gmail.com
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
