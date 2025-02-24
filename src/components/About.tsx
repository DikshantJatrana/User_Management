import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion, useInView } from "framer-motion";
import {
  Bolt,
  Users,
  Briefcase,
  Lightbulb,
  Handshake,
  DollarSign,
} from "lucide-react";
import Image from "next/image";
import { useRef } from "react";
import { useRouter } from "next/navigation";

const categories = [
  { name: "Startup Profiles", startups: 45, icon: <Briefcase /> },
  { name: "Valuation Tools", startups: 30, icon: <DollarSign /> },
  { name: "Discussion Rooms", startups: 20, icon: <Users /> },
  { name: "Investor Access", startups: 35, icon: <Handshake /> },
  { name: "Innovation", startups: 25, icon: <Lightbulb /> },
];

const About = () => {
  const ref = useRef(null);
  const router = useRouter();
  const handlebutton = () => {
    router.push("/auth/login");
  };
  return (
    <div
      ref={ref}
      className="min-h-screen bg-white text-black flex flex-col items-center py-20 px-4"
    >
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        whileInView={{
          y: 0,
          opacity: 1,
          scale: 1,
          transition: { duration: 1.5 },
        }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <span className="bg-gray-200 px-3 py-1 rounded-full text-sm inline-flex items-center gap-1 mb-4">
          <Bolt size={16} /> Startup Solutions
        </span>
        <h1 className="text-4xl font-bold mb-4">
          Everything You Need to Grow Your Startup
        </h1>
        <p className="text-gray-600 max-w-xl mx-auto">
          Discover tools and insights designed to help you build, manage, and
          scale your startup with ease.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
        <motion.div
          initial={{ x: -50, opacity: 0 }}
          whileInView={{
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 1.5 },
          }}
          viewport={{ once: true }}
          className="space-y-4 text-center md:text-left"
        >
          <h2 className="text-blue-600 text-lg font-semibold">
            Startup Categories
          </h2>
          <h3 className="text-2xl font-bold">
            Stay Informed with Diverse Startup Services
          </h3>
          <p className="text-gray-600">
            Access tools for startup profiles, valuations, discussion rooms, and
            investor connections to fuel your growth.
          </p>
          <Button onClick={handlebutton} className="rounded-full px-6 py-3">
            Learn more
          </Button>
        </motion.div>

        <motion.div
          initial={{ x: 50, opacity: 0, scale: 0.9 }}
          whileInView={{
            x: 0,
            opacity: 1,
            scale: 1,
            transition: { duration: 1.5 },
          }}
          viewport={{ once: true }}
        >
          <Card className="py-6 px-3 bg-[#ffcc00] text-white rounded-2xl shadow-lg">
            <CardContent>
              <div className="mb-4 p-4 bg-black rounded-xl shadow">
                <h4 className="text-lg font-semibold flex items-center gap-2">
                  <Image
                    src="/imgs/apple-Logo.png"
                    alt="Apple"
                    width={50}
                    height={25}
                  />{" "}
                  AAPL{" "}
                  <p className="text-gray-200 text-sm font-medium">
                    Apple Inc.
                  </p>
                  <span className="ml-auto text-green-500">$227.49</span>
                </h4>
              </div>
              <div className="flex flex-wrap gap-2 mt-10">
                {categories.map((cat, index) => (
                  <Button
                    key={index}
                    variant="default"
                    className="flex items-center gap-1 rounded-full px-2 py-2"
                  >
                    {cat.icon} {cat.name}
                    <span className="text-gray-200">
                      {cat.startups} Startups
                    </span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
