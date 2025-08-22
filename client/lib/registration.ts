// Customer and Supplier registration utilities for localStorage management

export interface CustomerSupplier {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  address: string;
  type: "customer" | "supplier";
  registrationDate: string;
  status: "active" | "pending";
}

const CUSTOMERS_KEY = "sagar_hardware_customers";
const SUPPLIERS_KEY = "sagar_hardware_suppliers";

/**
 * Generate unique ID for registration
 */
export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

/**
 * Get all customers from localStorage
 */
export function getStoredCustomers(): CustomerSupplier[] {
  try {
    const customers = localStorage.getItem(CUSTOMERS_KEY);
    return customers ? JSON.parse(customers) : [];
  } catch (error) {
    console.error("Error reading customers from localStorage:", error);
    return [];
  }
}

/**
 * Get all suppliers from localStorage
 */
export function getStoredSuppliers(): CustomerSupplier[] {
  try {
    const suppliers = localStorage.getItem(SUPPLIERS_KEY);
    return suppliers ? JSON.parse(suppliers) : [];
  } catch (error) {
    console.error("Error reading suppliers from localStorage:", error);
    return [];
  }
}

/**
 * Store customers array to localStorage
 */
export function storeCustomers(customers: CustomerSupplier[]): void {
  try {
    localStorage.setItem(CUSTOMERS_KEY, JSON.stringify(customers));
  } catch (error) {
    console.error("Error storing customers to localStorage:", error);
  }
}

/**
 * Store suppliers array to localStorage
 */
export function storeSuppliers(suppliers: CustomerSupplier[]): void {
  try {
    localStorage.setItem(SUPPLIERS_KEY, JSON.stringify(suppliers));
  } catch (error) {
    console.error("Error storing suppliers to localStorage:", error);
  }
}

/**
 * Check if email already exists
 */
export function emailExists(
  email: string,
  type: "customer" | "supplier",
): boolean {
  const records =
    type === "customer" ? getStoredCustomers() : getStoredSuppliers();
  return records.some(
    (record) => record.email.toLowerCase() === email.toLowerCase(),
  );
}

/**
 * Register a new customer or supplier
 */
export function registerCustomerSupplier(
  data: Omit<CustomerSupplier, "id" | "registrationDate" | "status">,
): { success: boolean; message: string; id?: string } {
  // Validation
  if (!data.name.trim()) {
    return { success: false, message: "Name is required" };
  }

  if (!data.email.trim()) {
    return { success: false, message: "Email is required" };
  }

  if (!data.phone.trim()) {
    return { success: false, message: "Phone number is required" };
  }

  if (!data.address.trim()) {
    return { success: false, message: "Address is required" };
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    return { success: false, message: "Please enter a valid email address" };
  }

  // Check if email already exists
  if (emailExists(data.email, data.type)) {
    return {
      success: false,
      message: `Email already registered as ${data.type}`,
    };
  }

  // Create new record
  const newRecord: CustomerSupplier = {
    ...data,
    id: generateId(),
    registrationDate: new Date().toISOString(),
    status: "pending",
  };

  // Store based on type
  if (data.type === "customer") {
    const customers = getStoredCustomers();
    customers.push(newRecord);
    storeCustomers(customers);
  } else {
    const suppliers = getStoredSuppliers();
    suppliers.push(newRecord);
    storeSuppliers(suppliers);
  }

  return {
    success: true,
    message: `${data.type === "customer" ? "Customer" : "Supplier"} registered successfully`,
    id: newRecord.id,
  };
}

/**
 * Get all registrations (customers + suppliers)
 */
export function getAllRegistrations(): CustomerSupplier[] {
  return [...getStoredCustomers(), ...getStoredSuppliers()];
}

/**
 * Get registration statistics
 */
export function getRegistrationStats() {
  const customers = getStoredCustomers();
  const suppliers = getStoredSuppliers();

  return {
    totalCustomers: customers.length,
    totalSuppliers: suppliers.length,
    activeCustomers: customers.filter((c) => c.status === "active").length,
    activeSuppliers: suppliers.filter((s) => s.status === "active").length,
    pendingCustomers: customers.filter((c) => c.status === "pending").length,
    pendingSuppliers: suppliers.filter((s) => s.status === "pending").length,
  };
}

/**
 * Update customer or supplier information
 */
export function updateCustomerSupplier(
  id: string,
  updatedData: Partial<Omit<CustomerSupplier, "id" | "registrationDate">>,
): { success: boolean; message: string } {
  const customers = getStoredCustomers();
  const suppliers = getStoredSuppliers();

  // Find in customers first
  const customerIndex = customers.findIndex((c) => c.id === id);
  if (customerIndex !== -1) {
    const customer = customers[customerIndex];

    // Validate email if it's being updated
    if (updatedData.email && updatedData.email !== customer.email) {
      if (emailExists(updatedData.email, "customer")) {
        return { success: false, message: "Email already exists" };
      }
    }

    customers[customerIndex] = { ...customer, ...updatedData };
    storeCustomers(customers);
    return { success: true, message: "Customer updated successfully" };
  }

  // Find in suppliers
  const supplierIndex = suppliers.findIndex((s) => s.id === id);
  if (supplierIndex !== -1) {
    const supplier = suppliers[supplierIndex];

    // Validate email if it's being updated
    if (updatedData.email && updatedData.email !== supplier.email) {
      if (emailExists(updatedData.email, "supplier")) {
        return { success: false, message: "Email already exists" };
      }
    }

    suppliers[supplierIndex] = { ...supplier, ...updatedData };
    storeSuppliers(suppliers);
    return { success: true, message: "Supplier updated successfully" };
  }

  return { success: false, message: "Record not found" };
}

/**
 * Delete customer or supplier
 */
export function deleteCustomerSupplier(id: string): {
  success: boolean;
  message: string;
} {
  let customers = getStoredCustomers();
  let suppliers = getStoredSuppliers();

  // Try to find and delete from customers
  const customerIndex = customers.findIndex((c) => c.id === id);
  if (customerIndex !== -1) {
    customers.splice(customerIndex, 1);
    storeCustomers(customers);
    return { success: true, message: "Customer deleted successfully" };
  }

  // Try to find and delete from suppliers
  const supplierIndex = suppliers.findIndex((s) => s.id === id);
  if (supplierIndex !== -1) {
    suppliers.splice(supplierIndex, 1);
    storeSuppliers(suppliers);
    return { success: true, message: "Supplier deleted successfully" };
  }

  return { success: false, message: "Record not found" };
}

/**
 * Get customer or supplier by ID
 */
export function getCustomerSupplierById(id: string): CustomerSupplier | null {
  const customers = getStoredCustomers();
  const suppliers = getStoredSuppliers();

  return (
    customers.find((c) => c.id === id) ||
    suppliers.find((s) => s.id === id) ||
    null
  );
}

/**
 * Update status of customer or supplier
 */
export function updateStatus(
  id: string,
  status: "active" | "pending",
): { success: boolean; message: string } {
  return updateCustomerSupplier(id, { status });
}

/**
 * Search customers and suppliers
 */
export function searchRegistrations(
  query: string,
  type?: "customer" | "supplier",
): CustomerSupplier[] {
  const customers = type !== "supplier" ? getStoredCustomers() : [];
  const suppliers = type !== "customer" ? getStoredSuppliers() : [];
  const allRecords = [...customers, ...suppliers];

  if (!query.trim()) {
    return allRecords;
  }

  const searchQuery = query.toLowerCase();
  return allRecords.filter(
    (record) =>
      record.name.toLowerCase().includes(searchQuery) ||
      record.email.toLowerCase().includes(searchQuery) ||
      record.phone.includes(searchQuery) ||
      record.company?.toLowerCase().includes(searchQuery) ||
      record.address.toLowerCase().includes(searchQuery),
  );
}
