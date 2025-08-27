// Sample products data for initial setup
import { Product, addProduct, getStoredProducts } from './products';

const SAMPLE_PRODUCTS: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>[] = [
  // Hardware Tools & Equipment
  {
    name: "Professional Drill Set",
    description: "High-quality cordless drill with multiple bits for all your drilling needs",
    category: "hardware-tools",
    price: 2500.00,
    features: ["Cordless Design", "Multiple Drill Bits", "LED Light", "Variable Speed"],
    isActive: true,
  },
  {
    name: "Hammer Set",
    description: "Durable steel hammers in various sizes for construction work",
    category: "hardware-tools", 
    price: 850.00,
    features: ["Steel Construction", "Ergonomic Handle", "Multiple Sizes", "Non-slip Grip"],
    isActive: true,
  },
  {
    name: "Screwdriver Kit",
    description: "Complete set of precision screwdrivers for various applications",
    category: "hardware-tools",
    price: 450.00,
    features: ["Magnetic Tips", "Precision Engineered", "Multiple Sizes", "Storage Case"],
    isActive: true,
  },

  // Plywood & Timber
  {
    name: "Marine Grade Plywood",
    description: "Premium waterproof plywood suitable for marine and outdoor applications",
    category: "plywood-timber",
    price: 3200.00,
    features: ["Waterproof", "High Durability", "Smooth Finish", "8x4 feet"],
    isActive: true,
  },
  {
    name: "Teak Wood Planks",
    description: "Premium quality teak wood planks for furniture and interior work",
    category: "plywood-timber",
    price: 1800.00,
    features: ["Natural Teak", "Premium Grade", "Smooth Finish", "Kiln Dried"],
    isActive: true,
  },
  {
    name: "Commercial Plywood",
    description: "Standard commercial grade plywood for general construction use",
    category: "plywood-timber",
    price: 1450.00,
    features: ["BWR Grade", "Termite Resistant", "Smooth Surface", "Multiple Sizes"],
    isActive: true,
  },

  // Electrical Supplies
  {
    name: "LED Tube Lights",
    description: "Energy efficient LED tube lights for home and office illumination",
    category: "electrical-supplies",
    price: 320.00,
    features: ["Energy Efficient", "Long Lasting", "Bright Light", "Easy Installation"],
    isActive: true,
  },
  {
    name: "Electrical Cables",
    description: "High quality copper electrical cables for house wiring",
    category: "electrical-supplies",
    price: 180.00,
    features: ["Pure Copper", "ISI Marked", "Fire Resistant", "Multiple Gauge"],
    isActive: true,
  },
  {
    name: "Switch & Socket Set",
    description: "Modular switches and sockets for modern electrical installations",
    category: "electrical-supplies",
    price: 75.00,
    features: ["Modular Design", "Easy Installation", "Durable Plastic", "Multiple Colors"],
    isActive: true,
  },

  // Construction Materials
  {
    name: "Portland Cement",
    description: "High strength Portland cement for all construction applications",
    category: "construction-materials",
    price: 420.00,
    features: ["High Strength", "Fast Setting", "Weather Resistant", "50kg Bag"],
    isActive: true,
  },
  {
    name: "Steel TMT Bars",
    description: "High tensile strength TMT bars for reinforced concrete construction",
    category: "construction-materials",
    price: 52.00,
    features: ["High Tensile Strength", "Corrosion Resistant", "Earthquake Resistant", "Fe500 Grade"],
    isActive: true,
  },
  {
    name: "Red Bricks",
    description: "High quality red bricks for construction and masonry work",
    category: "construction-materials",
    price: 8.50,
    features: ["High Strength", "Uniform Shape", "Low Water Absorption", "Standard Size"],
    isActive: true,
  },

  // Plumbing & Sanitation
  {
    name: "PVC Pipes",
    description: "Durable PVC pipes for plumbing and drainage applications",
    category: "plumbing-sanitation",
    price: 125.00,
    features: ["Corrosion Resistant", "Lightweight", "Easy Installation", "Multiple Sizes"],
    isActive: true,
  },
  {
    name: "Water Taps",
    description: "Premium quality brass water taps for kitchen and bathroom",
    category: "plumbing-sanitation",
    price: 450.00,
    features: ["Brass Construction", "Chrome Finish", "Leak Proof", "Modern Design"],
    isActive: true,
  },
  {
    name: "Bathroom Fittings",
    description: "Complete set of bathroom fittings including shower and accessories",
    category: "plumbing-sanitation",
    price: 2200.00,
    features: ["Complete Set", "Stainless Steel", "Modern Design", "Easy Installation"],
    isActive: true,
  },

  // Paint & Finishing
  {
    name: "Interior Wall Paint",
    description: "Premium quality interior wall paint with excellent coverage",
    category: "paint-finishing",
    price: 280.00,
    features: ["Washable", "Low Odor", "Excellent Coverage", "Multiple Colors"],
    isActive: true,
  },
  {
    name: "Wood Stain",
    description: "High quality wood stain for furniture and wooden surfaces",
    category: "paint-finishing",
    price: 420.00,
    features: ["Deep Penetration", "Weather Resistant", "Natural Finish", "Multiple Shades"],
    isActive: true,
  },
  {
    name: "Paint Brushes Set",
    description: "Professional quality paint brushes for all painting applications",
    category: "paint-finishing",
    price: 180.00,
    features: ["Natural Bristles", "Multiple Sizes", "Ergonomic Handle", "Durable"],
    isActive: true,
  },
];

/**
 * Initialize sample products if no products exist
 */
export function initializeSampleProducts(): { success: boolean; message: string; productsAdded: number } {
  try {
    const existingProducts = getStoredProducts();
    
    if (existingProducts.length > 0) {
      return { 
        success: true, 
        message: "Products already exist, no initialization needed", 
        productsAdded: 0 
      };
    }

    let successCount = 0;
    let errorCount = 0;

    for (const productData of SAMPLE_PRODUCTS) {
      const result = addProduct(productData);
      if (result.success) {
        successCount++;
      } else {
        errorCount++;
        console.error(`Failed to add sample product ${productData.name}:`, result.message);
      }
    }

    return {
      success: errorCount === 0,
      message: `Sample products initialized: ${successCount} added${errorCount > 0 ? `, ${errorCount} failed` : ''}`,
      productsAdded: successCount
    };

  } catch (error) {
    console.error("Error initializing sample products:", error);
    return {
      success: false,
      message: "Failed to initialize sample products",
      productsAdded: 0
    };
  }
}

/**
 * Check if sample products should be initialized and do it automatically
 */
export function autoInitializeSampleProducts(): void {
  const existingProducts = getStoredProducts();
  if (existingProducts.length === 0) {
    const result = initializeSampleProducts();
    if (result.success) {
      console.log("Sample products initialized automatically:", result.message);
    } else {
      console.error("Failed to auto-initialize sample products:", result.message);
    }
  }
}
