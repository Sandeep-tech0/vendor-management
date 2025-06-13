import React, { useState, useMemo, useCallback } from "react";
import { vendors as mockVendors } from "../utils/mockData";
import { exportToCSV } from "../utils/downloadCSV";
import VendorTable from "../components/VendorTable";
import FilterBar from "../components/FilterBar";
import EditVendorModal from "../components/EditVendorModal";
import Pagination from "../components/Pagination";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "sonner";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "../components/ui/select";
import debounce from "lodash.debounce";

const ENTRIES_OPTIONS = [10, 25, 50, 100];

function ActionBar({ onFetchByCode, onFetchByDate }) {
  const [code, setCode] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  return (
    <div className="flex flex-col lg:flex-row gap-4 mb-6">
      <div className="flex-1 flex flex-col sm:flex-row gap-2">
        <Input 
          placeholder="Vendor Code" 
          value={code} 
          onChange={e => setCode(e.target.value)}
          aria-label="Vendor code input"
          className="w-full sm:w-auto"
        />
        <Button 
          onClick={() => onFetchByCode(code)}
          aria-label="Fetch vendor by code"
          className="w-full sm:w-auto"
        >
          Fetch by Code
        </Button>
      </div>
      <div className="flex-1 flex flex-col sm:flex-row gap-2">
        <div className="flex gap-2">
          <Input 
            type="date" 
            value={from} 
            onChange={e => setFrom(e.target.value)}
            aria-label="From date"
            className="w-full"
          />
          <Input 
            type="date" 
            value={to} 
            onChange={e => setTo(e.target.value)}
            aria-label="To date"
            className="w-full"
          />
        </div>
        <Button 
          onClick={() => onFetchByDate(from, to)}
          aria-label="Fetch vendors by date range"
          className="w-full sm:w-auto"
        >
          Fetch by Date
        </Button>
      </div>
    </div>
  );
}

const VendorList = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [status, setStatus] = useState("All");
  const [type, setType] = useState("All");
  const [region, setRegion] = useState("All");
  const [entries, setEntries] = useState(10);
  const [page, setPage] = useState(1);
  const [editVendor, setEditVendor] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Debounced search
  const debouncedSetSearch = useCallback(debounce(setSearch, 300), []);

  // Clear filters handler
  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setStatus("All");
    setType("All");
    setRegion("All");
    setFromDate(null);
    setToDate(null);
    setPage(1);
  };

  // Filtering logic
  const filteredVendors = useMemo(() => {
    let data = mockVendors;
    if (search) {
      data = data.filter(
        v =>
          v.name.toLowerCase().includes(search.toLowerCase()) ||
          v.code.toLowerCase().includes(search.toLowerCase()) ||
          v.category.toLowerCase().includes(search.toLowerCase()) ||
          v.city.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category !== "All") data = data.filter(v => v.category === category);
    if (status !== "All") data = data.filter(v => v.status === status);
    if (type !== "All") data = data.filter(v => v.type === type);
    if (region !== "All") data = data.filter(v => v.region === region);
    if (fromDate) data = data.filter(v => new Date(v.registrationDate) >= fromDate);
    if (toDate) data = data.filter(v => new Date(v.registrationDate) <= toDate);
    return data;
  }, [search, category, status, type, region, fromDate, toDate]);

  // Pagination logic
  const paginatedVendors = useMemo(
    () => filteredVendors.slice((page - 1) * entries, page * entries),
    [filteredVendors, page, entries]
  );

  // Handlers
  const handleEdit = (vendor) => {
    setEditVendor(vendor);
    setShowModal(true);
  };

  const handleResendEmail = (vendor) => {
    toast("Email Sent", { 
      description: `The email has been sent to ${vendor.name}.`,
      duration: 2000,
    });
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditVendor(null);
  };

  const handleFetchByCode = (code) => {
    setIsLoading(true);
    setSearch(code);
    // toast("Fetched by code", { description: code });
    setTimeout(() => setIsLoading(false), 500); // Simulate API call
  };

  const handleFetchByDate = (from, to) => {
    setIsLoading(true);
    setFromDate(from ? new Date(from) : null);
    setToDate(to ? new Date(to) : null);
    toast("Fetched by date", { description: `${from} - ${to}` });
    setTimeout(() => setIsLoading(false), 500); // Simulate API call
  };

  return (
    <div className="p-4 max-w-[1400px] mx-auto">
      <h1 className="text-2xl font-bold mb-6">Vendor Management</h1>
      <ActionBar onFetchByCode={handleFetchByCode} onFetchByDate={handleFetchByDate} />
      <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start gap-6 mb-6">
        <div className="w-full lg:w-auto">
          <FilterBar
            search={search}
            setSearch={debouncedSetSearch}
            category={category}
            setCategory={setCategory}
            status={status}
            setStatus={setStatus}
            type={type}
            setType={setType}
            region={region}
            setRegion={setRegion}
            fromDate={fromDate}
            setFromDate={setFromDate}
            toDate={toDate}
            setToDate={setToDate}
            onClearFilters={clearFilters}
          />
        </div>
        <div className="flex gap-2 w-full lg:w-auto">
          <Button 
            onClick={() => exportToCSV(filteredVendors)}
            aria-label="Export vendors to CSV"
            className="w-full lg:w-auto"
          >
            Export to CSV
          </Button>
        </div>
      </div>
      <div className="overflow-x-auto rounded-lg border">
        <VendorTable
          vendors={paginatedVendors}
          onEdit={handleEdit}
          onResendEmail={handleResendEmail}
          isLoading={isLoading}
        />
      </div>
      <div className="mt-6">
        <Pagination
          page={page}
          setPage={setPage}
          totalPages={Math.ceil(filteredVendors.length / entries)}
          entries={entries}
          setEntries={setEntries}
          entriesOptions={ENTRIES_OPTIONS}
        />
      </div>
      <EditVendorModal
        open={showModal}
        vendor={editVendor}
        onClose={handleModalClose}
      />
    </div>
  );
};

export default VendorList;