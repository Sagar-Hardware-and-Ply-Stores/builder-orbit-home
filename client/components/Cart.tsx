import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  getCart,
  removeFromCart,
  updateCartItemQuantity,
  clearCart,
  Cart as CartType,
  CartItem,
} from "@/lib/cart";
import { toast } from "@/lib/toast";

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  onCartUpdate?: () => void;
}

export default function Cart({ isOpen, onClose, onCartUpdate }: CartProps) {
  const [cart, setCart] = useState<CartType>(getCart());
  const [isLoading, setIsLoading] = useState(false);

  const refreshCart = () => {
    setCart(getCart());
    onCartUpdate?.();
  };

  useEffect(() => {
    refreshCart();
  }, [isOpen]);

  const handleQuantityChange = async (
    cartItemId: string,
    newQuantity: number,
  ) => {
    setIsLoading(true);
    const result = updateCartItemQuantity(cartItemId, newQuantity);
    if (result.success) {
      setCart(result.cart);
      onCartUpdate?.();
      toast.success("Quantity updated");
    } else {
      toast.error(result.message);
    }
    setIsLoading(false);
  };

  const handleRemoveItem = async (cartItemId: string) => {
    setIsLoading(true);
    const result = removeFromCart(cartItemId);
    if (result.success) {
      setCart(result.cart);
      onCartUpdate?.();
    } else {
      alert(result.message);
    }
    setIsLoading(false);
  };

  const handleClearCart = async () => {
    if (
      window.confirm(
        "Are you sure you want to clear your cart? This action cannot be undone.",
      )
    ) {
      setIsLoading(true);
      const result = clearCart();
      if (result.success) {
        setCart(result.cart);
        onCartUpdate?.();
        toast.success("Cart cleared successfully");
      } else {
        toast.error(result.message);
      }
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-60 z-40 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Cart Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out border-l border-gray-100">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4m.6 0L6 11h12M7 13v6a1 1 0 001 1h8a1 1 0 001-1v-6M7 13l-4-8M7 13l1 8M10 17h4"
                ></path>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Shopping Cart</h2>
              <p className="text-sm text-gray-600">
                {cart.items.length} {cart.items.length === 1 ? "item" : "items"}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-white hover:shadow-md rounded-full transition-all duration-200 group"
          >
            <svg
              className="w-6 h-6 text-gray-500 group-hover:text-gray-700"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>

        {/* Cart Content */}
        <div className="flex flex-col h-full">
          {cart.items.length === 0 ? (
            /* Empty Cart */
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full flex items-center justify-center mb-6 border border-blue-200">
                <svg
                  className="w-16 h-16 text-blue-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4m.6 0L6 11h12M7 13v6a1 1 0 001 1h8a1 1 0 001-1v-6M7 13l-4-8M7 13l1 8M10 17h4"
                  ></path>
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Your cart is empty
              </h3>
              <p className="text-gray-600 mb-8 max-w-sm">
                Discover our amazing products and add them to your cart to get
                started
              </p>
              <Link
                to="/services"
                onClick={onClose}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
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
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  ></path>
                </svg>
                Start Shopping
              </Link>
            </div>
          ) : (
            <>
              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-6 space-y-3">
                {cart.items.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex items-center space-x-4 bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0">
                      {item.image ? (
                        <div className="w-18 h-18 rounded-xl overflow-hidden border-2 border-gray-200">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-18 h-18 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md">
                          <svg
                            className="w-10 h-10 text-white"
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
                      )}
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <h4 className="text-base font-semibold text-gray-900 truncate mb-1">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        ₹{item.price.toFixed(2)} each
                      </p>

                      {/* Quantity Controls */}
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-700">
                          Qty:
                        </span>
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity - 1)
                            }
                            disabled={isLoading || item.quantity <= 1}
                            className="w-10 h-10 bg-gray-50 hover:bg-gray-100 border-r border-gray-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <svg
                              className="w-4 h-4 text-gray-600"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M20 12H4"
                              ></path>
                            </svg>
                          </button>
                          <span className="w-12 h-10 bg-white flex items-center justify-center text-sm font-semibold text-gray-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              handleQuantityChange(item.id, item.quantity + 1)
                            }
                            disabled={isLoading}
                            className="w-10 h-10 bg-gray-50 hover:bg-gray-100 border-l border-gray-200 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                          >
                            <svg
                              className="w-4 h-4 text-gray-600"
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
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Item Total & Remove */}
                    <div className="flex flex-col items-end space-y-3">
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-900">
                          ₹{(item.price * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.quantity} × ₹{item.price.toFixed(2)}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        disabled={isLoading}
                        className="inline-flex items-center px-3 py-1.5 border border-red-200 text-red-600 hover:text-red-700 hover:bg-red-50 text-sm font-medium rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                      >
                        <svg
                          className="w-4 h-4 mr-1"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                          ></path>
                        </svg>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Footer */}
              <div className="border-t border-gray-200 bg-gray-50 p-6 space-y-6">
                {/* Cart Summary */}
                <div className="bg-white rounded-xl p-4 border border-gray-100">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>
                        Subtotal ({cart.totalItems}{" "}
                        {cart.totalItems === 1 ? "item" : "items"})
                      </span>
                      <span className="font-medium">
                        ₹{cart.totalAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="border-t border-gray-200 pt-3">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <span>Total</span>
                        <span className="text-xl">
                          ₹{cart.totalAmount.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-blue-700 hover:to-indigo-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    ) : (
                      <>
                        <svg
                          className="w-5 h-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          ></path>
                        </svg>
                        <span>Secure Checkout</span>
                      </>
                    )}
                  </button>

                  <div className="grid grid-cols-2 gap-3">
                    <Link
                      to="/services"
                      onClick={onClose}
                      className="text-center py-3 px-4 border-2 border-gray-200 rounded-xl font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                    >
                      Continue Shopping
                    </Link>
                    <button
                      onClick={handleClearCart}
                      disabled={isLoading}
                      className="py-3 px-4 border-2 border-red-200 rounded-xl font-medium text-red-600 hover:bg-red-50 hover:border-red-300 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      Clear Cart
                    </button>
                  </div>
                </div>

                {/* Security Badge */}
                <div className="flex items-center justify-center space-x-2 text-xs text-gray-500">
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    ></path>
                  </svg>
                  <span>Secure SSL Encryption</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
