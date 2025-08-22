import React, { useState, useEffect } from "react";
import {
  getStoredCustomers,
  getStoredSuppliers,
  updateCustomerSupplier,
  deleteCustomerSupplier,
  updateStatus,
  searchRegistrations,
  CustomerSupplier,
} from "@/lib/registration";

interface CustomerSupplierManagementProps {
  type: "customers" | "suppliers";
  onUpdate: () => void;
}

interface EditModalProps {
  record: CustomerSupplier | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (id: string, updatedData: Partial<CustomerSupplier>) => void;
}

const EditRecordModal: React.FC<EditModalProps> = ({ record, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    address: "",
    status: "pending" as "active" | "pending",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (record) {
      setFormData({
        name: record.name,
        email: record.email,
        phone: record.phone,
        company: record.company || "",
        address: record.address,
        status: record.status,
      });
      setError("");
    }
  }, [record]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!formData.email.trim()) {
      setError("Email is required");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!formData.phone.trim()) {
      setError("Phone number is required");
      return;
    }

    if (!formData.address.trim()) {
      setError("Address is required");
      return;
    }

    if (record) {
      onSave(record.id, formData);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Edit {record.type === "customer" ? "Customer" : "Supplier"}
          </h3>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter email address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Phone *
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter company name"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address *
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter full address"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="active">Active</option>
                </select>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="submit"
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
              >
                Save Changes
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

interface DeleteModalProps {
  record: CustomerSupplier | null;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (id: string) => void;
}

const DeleteRecordModal: React.FC<DeleteModalProps> = ({ record, isOpen, onClose, onConfirm }) => {
  if (!isOpen || !record) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-md w-full mx-4">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Delete {record.type === "customer" ? "Customer" : "Supplier"}
          </h3>
          <p className="text-gray-600 mb-6">
            Are you sure you want to delete <strong>{record.name}</strong>? 
            This action cannot be undone.
          </p>
          <div className="flex space-x-3">
            <button
              onClick={() => onConfirm(record.id)}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="flex-1 bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default function CustomerSupplierManagement({ type, onUpdate }: CustomerSupplierManagementProps) {
  const [records, setRecords] = useState<CustomerSupplier[]>([]);
  const [filteredRecords, setFilteredRecords] = useState<CustomerSupplier[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "pending">("all");
  const [editingRecord, setEditingRecord] = useState<CustomerSupplier | null>(null);
  const [deletingRecord, setDeletingRecord] = useState<CustomerSupplier | null>(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");

  useEffect(() => {
    loadRecords();
  }, [type]);

  useEffect(() => {
    filterRecords();
  }, [records, searchQuery, statusFilter]);

  const loadRecords = () => {
    const data = type === "customers" ? getStoredCustomers() : getStoredSuppliers();
    setRecords(data);
  };

  const filterRecords = () => {
    let filtered = records;

    if (searchQuery.trim()) {
      filtered = searchRegistrations(searchQuery, type === "customers" ? "customer" : "supplier");
    }

    if (statusFilter !== "all") {
      filtered = filtered.filter(record => record.status === statusFilter);
    }

    setFilteredRecords(filtered);
  };

  const showMessage = (msg: string, type: "success" | "error") => {
    setMessage(msg);
    setMessageType(type);
    setTimeout(() => {
      setMessage("");
      setMessageType("");
    }, 3000);
  };

  const handleEditRecord = (id: string, updatedData: Partial<CustomerSupplier>) => {
    const result = updateCustomerSupplier(id, updatedData);
    if (result.success) {
      showMessage(result.message, "success");
      setEditingRecord(null);
      loadRecords();
      onUpdate();
    } else {
      showMessage(result.message, "error");
    }
  };

  const handleDeleteRecord = (id: string) => {
    const result = deleteCustomerSupplier(id);
    if (result.success) {
      showMessage(result.message, "success");
      setDeletingRecord(null);
      loadRecords();
      onUpdate();
    } else {
      showMessage(result.message, "error");
    }
  };

  const handleStatusToggle = (id: string, currentStatus: "active" | "pending") => {
    const newStatus = currentStatus === "active" ? "pending" : "active";
    const result = updateStatus(id, newStatus);
    if (result.success) {
      showMessage(`Status updated to ${newStatus}`, "success");
      loadRecords();
      onUpdate();
    } else {
      showMessage(result.message, "error");
    }
  };

  const getStatusColor = (status: string) => {
    return status === "active" 
      ? "bg-green-100 text-green-800" 
      : "bg-yellow-100 text-yellow-800";
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 capitalize">
                {type} Management
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Manage {type} accounts and their information
              </p>
            </div>
            <div className="text-sm text-gray-500">
              Total: {filteredRecords.length} {type}
            </div>
          </div>
        </div>

        {message && (
          <div className={`mx-6 mt-4 p-3 rounded-md text-sm ${
            messageType === "success" 
              ? "bg-green-50 border border-green-200 text-green-700"
              : "bg-red-50 border border-red-200 text-red-700"
          }`}>
            {message}
          </div>
        )}

        {/* Search and Filters */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <input
                type="text"
                placeholder={`Search ${type}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value as "all" | "active" | "pending")}
                className="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="pending">Pending</option>
              </select>
            </div>
          </div>
        </div>

        <div className="p-6">
          {filteredRecords.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl mb-4 block">
                {type === "customers" ? "🛒" : "🏭"}
              </span>
              <h3 className="text-lg font-medium text-gray-900 mb-2">
                No {type} found
              </h3>
              <p className="text-gray-500">
                {searchQuery ? "No records match your search criteria." : `No ${type} are currently registered.`}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Name & Contact
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Company & Address
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Registered
                    </th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredRecords.map((record) => (
                    <tr key={record.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{record.name}</div>
                          <div className="text-sm text-gray-500">{record.email}</div>
                          <div className="text-sm text-gray-500">{record.phone}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          {record.company && (
                            <div className="text-sm font-medium text-gray-900">{record.company}</div>
                          )}
                          <div className="text-sm text-gray-500">{record.address}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleStatusToggle(record.id, record.status)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(record.status)} hover:opacity-80 transition-opacity`}
                        >
                          {record.status}
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(record.registrationDate).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex items-center justify-end space-x-2">
                          <button
                            onClick={() => setEditingRecord(record)}
                            className="text-blue-600 hover:text-blue-900 transition-colors"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => setDeletingRecord(record)}
                            className="text-red-600 hover:text-red-900 transition-colors"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <EditRecordModal
        record={editingRecord}
        isOpen={!!editingRecord}
        onClose={() => setEditingRecord(null)}
        onSave={handleEditRecord}
      />

      <DeleteRecordModal
        record={deletingRecord}
        isOpen={!!deletingRecord}
        onClose={() => setDeletingRecord(null)}
        onConfirm={handleDeleteRecord}
      />
    </div>
  );
}
