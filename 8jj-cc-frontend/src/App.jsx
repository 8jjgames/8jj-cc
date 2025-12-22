import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";


import { useState, useEffect } from "react";

export default function App() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);



  return (
    <BrowserRouter>
     
        {/* Always visible */}
        <Header/>
        {/* Page content changes here */}
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Footer />
      
    </BrowserRouter>
  );
}
