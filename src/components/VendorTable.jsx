import React from "react";
import { Button } from "./ui/button";
import { Skeleton } from "./ui/skeleton";

const VendorTable = ({ vendors, onEdit, onResendEmail, isLoading }) => {
  if (isLoading) {
    return (
      <div className="overflow-x-auto rounded-lg border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">City</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {[...Array(5)].map((_, i) => (
              <tr key={i}>
                {[...Array(6)].map((_, j) => (
                  <td key={j} className="px-4 py-3 whitespace-nowrap">
                    <Skeleton className="h-6 w-full" />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border" role="region" aria-label="Vendor List">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">ID</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Name</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Category</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">City</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Status</th>
            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" scope="col">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {vendors.map((v) => (
            <tr 
              key={v.id} 
              className="hover:bg-gray-50 transition-colors"
              role="row"
            >
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900" role="cell">{v.id}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900" role="cell">{v.name}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900" role="cell">{v.category}</td>
              <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900" role="cell">{v.city}</td>
              <td className="px-4 py-3 whitespace-nowrap" role="cell">
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                  v.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {v.status}
                </span>
              </td>
              <td className="px-4 py-3 whitespace-nowrap" role="cell">
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(v)}
                    aria-label={`Edit vendor ${v.name}`}
                    className="w-full sm:w-auto"
                  >
                    <span className="hidden sm:inline">✏️ Edit</span>
                    <span className="sm:hidden">✏️</span>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onResendEmail(v)}
                    aria-label={`Resend email to ${v.name}`}
                    className="w-full sm:w-auto"
                  >
                    <span className="hidden sm:inline">📧 Resend Email</span>
                    <span className="sm:hidden">📧</span>
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorTable;
