import React from "react";
import { Button } from "./ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "./ui/select";

const Pagination = ({
  page,
  setPage,
  totalPages,
  entries,
  setEntries,
  entriesOptions,
}) => (
  <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600">Show</span>
      <Select
        value={entries.toString()}
        onValueChange={(value) => {
          setEntries(Number(value));
          setPage(1);
        }}
      >
        <SelectTrigger className="w-[80px]">
          <SelectValue placeholder={entries} />
        </SelectTrigger>
        <SelectContent>
          {entriesOptions.map((opt) => (
            <SelectItem key={opt} value={opt.toString()}>
              {opt}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <span className="text-sm text-gray-600">entries</span>
    </div>
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage((p) => Math.max(1, p - 1))}
        disabled={page === 1}
        aria-label="Previous page"
      >
        Previous
      </Button>
      <span className="text-sm text-gray-600">
        Page {page} of {totalPages}
      </span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
        disabled={page === totalPages}
        aria-label="Next page"
      >
        Next
      </Button>
    </div>
  </div>
);

export default Pagination;
