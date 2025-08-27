// Shopping cart management utilities for localStorage

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  description: string;
  price: number;
  image?: string;
  category: string;
  quantity: number;
  addedAt: string;
}

export interface Cart {
  items: CartItem[];
  totalItems: number;
  totalAmount: number;
  updatedAt: string;
}

const CART_KEY = "sagar_hardware_cart";

/**
 * Get cart from localStorage
 */
export function getCart(): Cart {
  try {
    const cart = localStorage.getItem(CART_KEY);
    if (!cart) {
      return {
        items: [],
        totalItems: 0,
        totalAmount: 0,
        updatedAt: new Date().toISOString(),
      };
    }
    return JSON.parse(cart);
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return {
      items: [],
      totalItems: 0,
      totalAmount: 0,
      updatedAt: new Date().toISOString(),
    };
  }
}

/**
 * Save cart to localStorage
 */
export function saveCart(cart: Cart): void {
  try {
    cart.updatedAt = new Date().toISOString();
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to localStorage:", error);
  }
}

/**
 * Calculate cart totals
 */
function calculateCartTotals(items: CartItem[]): {
  totalItems: number;
  totalAmount: number;
} {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  return { totalItems, totalAmount };
}

/**
 * Add item to cart
 */
export function addToCart(
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    category: string;
  },
  quantity: number = 1,
): { success: boolean; message: string; cart: Cart } {
  try {
    const cart = getCart();

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item) => item.productId === product.id,
    );

    if (existingItemIndex >= 0) {
      // Update quantity if item exists
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      const cartItem: CartItem = {
        id: generateCartItemId(),
        productId: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        image: product.image,
        category: product.category,
        quantity: quantity,
        addedAt: new Date().toISOString(),
      };
      cart.items.push(cartItem);
    }

    // Recalculate totals
    const totals = calculateCartTotals(cart.items);
    cart.totalItems = totals.totalItems;
    cart.totalAmount = totals.totalAmount;

    saveCart(cart);

    return {
      success: true,
      message: `${product.name} added to cart`,
      cart: cart,
    };
  } catch (error) {
    console.error("Error adding to cart:", error);
    return {
      success: false,
      message: "Failed to add item to cart",
      cart: getCart(),
    };
  }
}

/**
 * Remove item from cart
 */
export function removeFromCart(cartItemId: string): {
  success: boolean;
  message: string;
  cart: Cart;
} {
  try {
    const cart = getCart();
    const itemIndex = cart.items.findIndex((item) => item.id === cartItemId);

    if (itemIndex === -1) {
      return {
        success: false,
        message: "Item not found in cart",
        cart: cart,
      };
    }

    const removedItem = cart.items[itemIndex];
    cart.items.splice(itemIndex, 1);

    // Recalculate totals
    const totals = calculateCartTotals(cart.items);
    cart.totalItems = totals.totalItems;
    cart.totalAmount = totals.totalAmount;

    saveCart(cart);

    return {
      success: true,
      message: `${removedItem.name} removed from cart`,
      cart: cart,
    };
  } catch (error) {
    console.error("Error removing from cart:", error);
    return {
      success: false,
      message: "Failed to remove item from cart",
      cart: getCart(),
    };
  }
}

/**
 * Update item quantity in cart
 */
export function updateCartItemQuantity(
  cartItemId: string,
  quantity: number,
): { success: boolean; message: string; cart: Cart } {
  try {
    if (quantity < 1) {
      return removeFromCart(cartItemId);
    }

    const cart = getCart();
    const itemIndex = cart.items.findIndex((item) => item.id === cartItemId);

    if (itemIndex === -1) {
      return {
        success: false,
        message: "Item not found in cart",
        cart: cart,
      };
    }

    cart.items[itemIndex].quantity = quantity;

    // Recalculate totals
    const totals = calculateCartTotals(cart.items);
    cart.totalItems = totals.totalItems;
    cart.totalAmount = totals.totalAmount;

    saveCart(cart);

    return {
      success: true,
      message: "Cart updated",
      cart: cart,
    };
  } catch (error) {
    console.error("Error updating cart item quantity:", error);
    return {
      success: false,
      message: "Failed to update cart",
      cart: getCart(),
    };
  }
}

/**
 * Clear entire cart
 */
export function clearCart(): { success: boolean; message: string; cart: Cart } {
  try {
    const emptyCart: Cart = {
      items: [],
      totalItems: 0,
      totalAmount: 0,
      updatedAt: new Date().toISOString(),
    };

    saveCart(emptyCart);

    return {
      success: true,
      message: "Cart cleared",
      cart: emptyCart,
    };
  } catch (error) {
    console.error("Error clearing cart:", error);
    return {
      success: false,
      message: "Failed to clear cart",
      cart: getCart(),
    };
  }
}

/**
 * Get cart item count
 */
export function getCartItemCount(): number {
  const cart = getCart();
  return cart.totalItems;
}

/**
 * Get cart total amount
 */
export function getCartTotal(): number {
  const cart = getCart();
  return cart.totalAmount;
}

/**
 * Check if product is in cart
 */
export function isProductInCart(productId: string): boolean {
  const cart = getCart();
  return cart.items.some((item) => item.productId === productId);
}

/**
 * Get cart item by product ID
 */
export function getCartItemByProductId(productId: string): CartItem | null {
  const cart = getCart();
  return cart.items.find((item) => item.productId === productId) || null;
}

/**
 * Generate unique cart item ID
 */
function generateCartItemId(): string {
  return `cart_item_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get cart summary
 */
export function getCartSummary(): {
  itemCount: number;
  totalAmount: number;
  isEmpty: boolean;
} {
  const cart = getCart();
  return {
    itemCount: cart.totalItems,
    totalAmount: cart.totalAmount,
    isEmpty: cart.items.length === 0,
  };
}

/**
 * Export cart data for checkout or backup
 */
export function exportCartData(): {
  items: CartItem[];
  summary: {
    totalItems: number;
    totalAmount: number;
    exportDate: string;
  };
} {
  const cart = getCart();
  return {
    items: cart.items,
    summary: {
      totalItems: cart.totalItems,
      totalAmount: cart.totalAmount,
      exportDate: new Date().toISOString(),
    },
  };
}
