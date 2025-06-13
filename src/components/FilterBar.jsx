import React from "react";
import { Input } from "./ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

const categories = ["All", "Electrical", "Mechanical", "Diesel"];
const statuses = ["All", "Active", "Inactive"];
const types = ["All", "SAP", "Temp"];
const regions = ["All", "North", "South", "East", "West"];

const FilterBar = ({
  search,
  setSearch,
  category,
  setCategory,
  status,
  setStatus,
  type,
  setType,
  region,
  setRegion,
  fromDate,
  setFromDate,
  toDate,
  setToDate,
  onClearFilters,
}) => (
  <div className="space-y-4 w-full">
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 w-full">
      <div className="flex flex-col w-full">
        <label htmlFor="vendor-search" className="text-xs font-medium text-gray-600 mb-1">Search</label>
        <Input
          id="vendor-search"
          type="text"
          placeholder="Search by name, code, category, city"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search vendors"
          className="w-full"
        />
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="category-select" className="text-xs font-medium text-gray-600 mb-1">Category</label>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger id="category-select" className="w-full" aria-label="Filter by category">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="status-select" className="text-xs font-medium text-gray-600 mb-1">Status</label>
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger id="status-select" className="w-full" aria-label="Filter by status">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            {statuses.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="type-select" className="text-xs font-medium text-gray-600 mb-1">Type</label>
        <Select value={type} onValueChange={setType}>
          <SelectTrigger id="type-select" className="w-full" aria-label="Filter by type">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            {types.map((t) => (
              <SelectItem key={t} value={t}>
                {t}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col w-full">
        <label htmlFor="region-select" className="text-xs font-medium text-gray-600 mb-1">Region</label>
        <Select value={region} onValueChange={setRegion}>
          <SelectTrigger id="region-select" className="w-full" aria-label="Filter by region">
            <SelectValue placeholder="Region" />
          </SelectTrigger>
          <SelectContent>
            {regions.map((r) => (
              <SelectItem key={r} value={r}>
                {r}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
    
      <div className="flex items-end">
        <Button
          type="button"
          variant="outline"
          onClick={onClearFilters}
          className="w-full"
          aria-label="Clear all filters"
        >
          Clear Filters
        </Button>
      </div>
    </div>
  </div>
);

export default FilterBar;
