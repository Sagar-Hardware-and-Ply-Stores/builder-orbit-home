// Product management utilities for localStorage

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  price?: number;
  image?: string;
  icon?: string;
  features?: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  colorScheme: {
    bg: string;
    iconBg: string;
    iconColor: string;
    checkColor: string;
    borderColor: string;
    shadowColor: string;
  };
}

const PRODUCTS_KEY = "sagar_hardware_products";
const CATEGORIES_KEY = "sagar_hardware_categories";

// Default categories
const DEFAULT_CATEGORIES: ProductCategory[] = [
  {
    id: "hardware-tools",
    name: "Hardware Tools & Equipment",
    description:
      "Professional-grade tools and equipment for all your construction and maintenance needs.",
    icon: "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z",
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
    id: "plywood-timber",
    name: "Plywood & Timber",
    description:
      "Premium quality plywood, timber, and wood products for construction and furniture making.",
    icon: "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4",
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
    id: "electrical-supplies",
    name: "Electrical Supplies",
    description:
      "Complete range of electrical components, wiring solutions, and lighting fixtures.",
    icon: "M13 10V3L4 14h7v7l9-11h-7z",
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
    id: "construction-materials",
    name: "Construction Materials",
    description:
      "High-quality cement, bricks, steel, and other essential building materials.",
    icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10",
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
    id: "plumbing-sanitation",
    name: "Plumbing & Sanitation",
    description:
      "Complete plumbing solutions including pipes, fittings, and sanitary fixtures.",
    icon: "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4",
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
    id: "paint-finishing",
    name: "Paint & Finishing",
    description:
      "Quality paints, primers, and finishing materials for interior and exterior applications.",
    icon: "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z",
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

/**
 * Get all products from localStorage
 */
export function getStoredProducts(): Product[] {
  try {
    const products = localStorage.getItem(PRODUCTS_KEY);
    return products ? JSON.parse(products) : [];
  } catch (error) {
    console.error("Error reading products from localStorage:", error);
    return [];
  }
}

/**
 * Store products array to localStorage
 */
export function storeProducts(products: Product[]): void {
  try {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  } catch (error) {
    console.error("Error storing products to localStorage:", error);
  }
}

/**
 * Get all categories from localStorage
 */
export function getStoredCategories(): ProductCategory[] {
  try {
    const categories = localStorage.getItem(CATEGORIES_KEY);
    if (!categories) {
      // Initialize with default categories
      storeCategories(DEFAULT_CATEGORIES);
      return DEFAULT_CATEGORIES;
    }
    return JSON.parse(categories);
  } catch (error) {
    console.error("Error reading categories from localStorage:", error);
    return DEFAULT_CATEGORIES;
  }
}

/**
 * Store categories array to localStorage
 */
export function storeCategories(categories: ProductCategory[]): void {
  try {
    localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
  } catch (error) {
    console.error("Error storing categories to localStorage:", error);
  }
}

/**
 * Get active products only
 */
export function getActiveProducts(): Product[] {
  return getStoredProducts().filter((product) => product.isActive);
}

/**
 * Get products by category
 */
export function getProductsByCategory(categoryId: string): Product[] {
  return getActiveProducts().filter(
    (product) => product.category === categoryId,
  );
}

/**
 * Add a new product
 */
export function addProduct(
  productData: Omit<Product, "id" | "createdAt" | "updatedAt">,
): { success: boolean; message: string; product?: Product } {
  try {
    const products = getStoredProducts();

    const newProduct: Product = {
      ...productData,
      id: generateProductId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    products.push(newProduct);
    storeProducts(products);

    return {
      success: true,
      message: "Product added successfully",
      product: newProduct,
    };
  } catch (error) {
    console.error("Error adding product:", error);
    return { success: false, message: "Failed to add product" };
  }
}

/**
 * Update an existing product
 */
export function updateProduct(
  productId: string,
  updates: Partial<Omit<Product, "id" | "createdAt">>,
): { success: boolean; message: string } {
  try {
    const products = getStoredProducts();
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      return { success: false, message: "Product not found" };
    }

    products[productIndex] = {
      ...products[productIndex],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    storeProducts(products);
    return { success: true, message: "Product updated successfully" };
  } catch (error) {
    console.error("Error updating product:", error);
    return { success: false, message: "Failed to update product" };
  }
}

/**
 * Delete a product
 */
export function deleteProduct(productId: string): {
  success: boolean;
  message: string;
} {
  try {
    const products = getStoredProducts();
    const filteredProducts = products.filter((p) => p.id !== productId);

    if (filteredProducts.length === products.length) {
      return { success: false, message: "Product not found" };
    }

    storeProducts(filteredProducts);
    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error deleting product:", error);
    return { success: false, message: "Failed to delete product" };
  }
}

/**
 * Toggle product active status
 */
export function toggleProductStatus(productId: string): {
  success: boolean;
  message: string;
} {
  try {
    const products = getStoredProducts();
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
      return { success: false, message: "Product not found" };
    }

    products[productIndex].isActive = !products[productIndex].isActive;
    products[productIndex].updatedAt = new Date().toISOString();

    storeProducts(products);
    return {
      success: true,
      message: `Product ${products[productIndex].isActive ? "activated" : "deactivated"} successfully`,
    };
  } catch (error) {
    console.error("Error toggling product status:", error);
    return { success: false, message: "Failed to update product status" };
  }
}

/**
 * Get product by ID
 */
export function getProductById(productId: string): Product | null {
  const products = getStoredProducts();
  return products.find((p) => p.id === productId) || null;
}

/**
 * Get category by ID
 */
export function getCategoryById(categoryId: string): ProductCategory | null {
  const categories = getStoredCategories();
  return categories.find((c) => c.id === categoryId) || null;
}

/**
 * Generate unique product ID
 */
function generateProductId(): string {
  return `product_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Get product statistics
 */
export function getProductStats() {
  const products = getStoredProducts();
  const activeProducts = products.filter((p) => p.isActive);
  const categories = getStoredCategories();

  const categoryStats = categories.map((category) => ({
    categoryId: category.id,
    categoryName: category.name,
    totalProducts: products.filter((p) => p.category === category.id).length,
    activeProducts: activeProducts.filter((p) => p.category === category.id)
      .length,
  }));

  return {
    totalProducts: products.length,
    activeProducts: activeProducts.length,
    inactiveProducts: products.length - activeProducts.length,
    totalCategories: categories.length,
    categoryStats,
  };
}

/**
 * Search products
 */
export function searchProducts(query: string): Product[] {
  const products = getActiveProducts();
  const searchTerm = query.toLowerCase().trim();

  if (!searchTerm) return products;

  return products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm) ||
      product.description.toLowerCase().includes(searchTerm) ||
      product.features?.some((feature) =>
        feature.toLowerCase().includes(searchTerm),
      ) ||
      getCategoryById(product.category)
        ?.name.toLowerCase()
        .includes(searchTerm),
  );
}
