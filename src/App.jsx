"use client";

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import Loading from "./components/loading";
import Navbar from "./components/navbar";
import Carousel from "./components/carousel";

import Home from "./components/home";
import AboutUs from "./components/about-us";
import Service from "./components/service";
import Contact from "./components/contact";
import Gallery from "./components/gallery"; 
import Footer from "./components/footer"; 

import TermsAndConditions from "./components/terms-conditions"; 
import PrivacyPolicy from "./components/privacy-policy"; 

export default function App() {
  return (
    <Router>
      <Loading />
      <Navbar />
      <Carousel />

      <main>
        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="home" element={<Home />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="service" element={<Service />} />
          <Route path="gallery" element={<Gallery />} />
          <Route path="contact" element={<Contact />} />
          <Route path="terms-conditions" element={<TermsAndConditions />} />
          <Route path="privacy-policy" element={<PrivacyPolicy />} />
        </Routes>
      </main>
      
      <Footer />

    </Router>
  );
}
