import React, { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { toast } from "sonner";

const EditVendorModal = ({ open, vendor, onClose }) => {
  const [form, setForm] = useState({ name: "", city: "" });
  const [error, setError] = useState("");
  
  useEffect(() => {
    if (vendor) setForm({ name: vendor.name, city: vendor.city });
  }, [vendor]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.city.trim()) {
      setError("Name and City are required.");
      return;
    }
    toast("Vendor updated!", { description: `${form.name} in ${form.city}` });
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Edit Vendor</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              Name
              <Input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                aria-label="Vendor Name"
                className="mt-1"
                placeholder="Enter vendor name"
              />
            </label>
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">
              City
              <Input
                value={form.city}
                onChange={(e) => setForm({ ...form, city: e.target.value })}
                aria-label="Vendor City"
                className="mt-1"
                placeholder="Enter city name"
              />
            </label>
          </div>
          {error && (
            <div className="text-sm text-red-500 bg-red-50 p-2 rounded-md">
              {error}
            </div>
          )}
          <DialogFooter className="gap-2 sm:gap-0">
            <Button type="submit" className="w-full sm:w-auto">
              Save Changes
            </Button>
            <Button 
              type="button" 
              variant="outline" 
              onClick={onClose}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditVendorModal;
