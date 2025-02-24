"use client";

import React from "react";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Work from "@/components/Work";
import Detail from "@/components/Detail";
import Footer from "@/components/Footer";

const ClientWrapper = () => {
  return (
    <div className="w-full min-h-screen">
      <Hero />
      <About />
      <Work />
      <Detail />
      <Footer />
    </div>
  );
};

export default ClientWrapper;
