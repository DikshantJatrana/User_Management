import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { UserPlus, Share2, MessageSquare, TrendingUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const steps = [
  {
    icon: <UserPlus size={24} />,
    title: "Create Your Startup Profile",
    description:
      "Sign up and create a detailed profile for your startup. Add your vision, financials, and valuation.",
  },
  {
    icon: <Share2 size={24} />,
    title: "Share Equity & Attract Investors",
    description:
      "Use our tools to determine your startup’s valuation and share equity with interested investors.",
  },
  {
    icon: <MessageSquare size={24} />,
    title: "Engage in Discussion Rooms",
    description:
      "Join discussion rooms to share progress, discuss ideas, and connect with the community.",
  },
  {
    icon: <TrendingUp size={24} />,
    title: "Grow Your Startup",
    description:
      "Track your growth, attract more investors, and take your startup to the next level.",
  },
];

const Work = () => {
  const router = useRouter();
  const handlebutton = () => {
    router.push("/auth/login");
  };
  return (
    <div className="min-h-screen relative bg-black text-white pt-20 px-4 flex flex-col items-center">
      <div className="w-full h-[60%] grid md:grid-cols-2 gap-8">
        <div className="md:pl-5 text-center md:text-left">
          <h2 className="text-4xl font-bold mb-8">
            Start Your Journey with Confidence
          </h2>
          <p className="text-gray-400 mb-10 text-left max-w-xl">
            We provide the tools and network to help you build, connect, and
            grow your startup seamlessly.
          </p>
          <Button
            onClick={handlebutton}
            className="px-8 py-3 rounded-full bg-white text-black hover:bg-gray-300"
          >
            Get Started
          </Button>
        </div>
        <div className="grid md:grid-cols-2 gap-8 pb-3 w-full max-w-5xl">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="bg-white p-2 text-black border-2 border-[#ffcc00] rounded-2xl shadow-lg text-center flex flex-col items-center"
            >
              <div className="mb-2 bg-white p-3 rounded-full">{step.icon}</div>
              <h3 className="text-sm font-semibold mb-1">{step.title}</h3>
              <p className="text-gray-700 text-xs mb-2">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="w-full hidden md:flex h-[40%] items-end absolute bottom-0 gap-5 justify-center">
        <div className="w-44 h-44 rounded-full bg-white flex items-center justify-center">
          <Image
            alt="logo"
            src="/imgs/airbab-Logo.jpg"
            width={176}
            height={176}
            className="rounded-full"
          />
        </div>
        <div className="w-56 h-56 rounded-full bg-white flex items-center justify-center">
          <Image
            alt="logo"
            src="/imgs/nivida-Logo.png"
            width={224}
            height={224}
            className="rounded-full"
          />
        </div>
        <div className="w-44 h-44 rounded-full bg-white flex items-center justify-center">
          <Image
            alt="logo"
            src="/imgs/tesla-Logo.jpg"
            width={150}
            height={150}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Work;
