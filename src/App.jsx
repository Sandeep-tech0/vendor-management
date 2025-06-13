import React from "react";
import VendorList from "./pages/VendorList";
import { Toaster } from "./components/ui/sonner";


function App() {
  return (
    <>
      <VendorList />
      <Toaster
        position="top-center"
        richColors
        duration={2000}
        closeButton
        theme="light"
      />
    </>
  );
}

export default App;
