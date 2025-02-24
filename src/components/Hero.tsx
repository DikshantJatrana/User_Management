"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Link as ScrollLink } from "react-scroll";
import Navbar from "./Navbar";

const Hero = () => {
  const router = useRouter();
  const handlebutton = () => {
    router.push("/auth/login");
  };

  return (
    <div className="h-screen overflow-hidden w-full relative bg-[url(/imgs/bg.jpg)] bg-contain text-white flex flex-col items-center">
      <div className="w-full h-full grad opacity-95 absolute top-0 left-0 z-10"></div>
      <div className="w-full z-20 flex justify-center">
        <Navbar />
      </div>
      <main className="flex z-20 flex-col w-full items-center justify-center text-center mt-28 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="w-full flex flex-col items-center space-y-6"
        >
          <span className="bg-gray-800 px-3 py-1 rounded-full text-sm mb-2 inline-block">
            New Join our growth invest community
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-10">
            Empowering <span className="text-[#ffcc00]">Startups</span>,
            <br />
            <span className="text-[#ffcc00]">Connecting</span> Visionaries
          </h1>
          <p className="text-gray-200 text-center w-full flex items-center mb-8 max-w-xl">
            Showcase your startup’s vision, finances, and valuation. Connect
            with investors, share equity, and grow together in a collaborative
            ecosystem.
          </p>
          <Button
            onClick={handlebutton}
            variant="secondary"
            size="lg"
            className="font-bold rounded-full"
          >
            Get Started <ArrowRight />
          </Button>
        </motion.div>
      </main>
      <div className="z-20 flex w-full">
        <Image
          src="/imgs/st1.png"
          alt="stock 1"
          width={150}
          height={70}
          className="rounded-lg w-[29%] absolute -bottom-5 z-30 left-1/2 -translate-x-1/2"
        />
        <Image
          src="/imgs/st2.png"
          alt="stock 2"
          width={150}
          height={70}
          className="rounded-lg w-[20%] absolute -bottom-2 left-[2%] -rotate-12"
        />
        <Image
          src="/imgs/st3.png"
          alt="stock 3"
          width={150}
          height={70}
          className="rounded-lg w-[25%] absolute -bottom-3 left-[20%] -rotate-12"
        />
        <Image
          src="/imgs/st4.png"
          alt="stock 4"
          width={150}
          height={70}
          className="rounded-lg w-[25%] absolute -bottom-3 left-[60%] rotate-12"
        />
        <Image
          src="/imgs/st5.png"
          alt="stock 5"
          width={150}
          height={70}
          className="rounded-lg w-[20%] absolute -bottom-2 left-[78%] rotate-12"
        />
      </div>
    </div>
  );
};

export default Hero;
