import React from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Rocket, Users, Eye, TrendingUp } from "lucide-react";
import { useRouter } from "next/navigation";

const features = [
  {
    icon: <Rocket size={24} />,
    title: "For Founders",
    description:
      "Showcase your startup’s vision, financials, and valuation. Attract investors and collaborate within the community.",
  },
  {
    icon: <Users size={24} />,
    title: "For Investors",
    description:
      "Discover promising startups, invest early, and track growth through transparent financials and active discussions.",
  },
];

const Detail = () => {
  const router = useRouter();
  const handlebutton = () => {
    router.push("/auth/login");
  };
  return (
    <div className="min-h-screen bg-white text-black pt-32 pb-12 px-4 flex flex-col items-center">
      <h2 className="text-4xl font-bold mb-10 text-center md:text-left">
        Your Startup’s Journey Starts Here
      </h2>
      <p className="text-gray-700 mb-10 text-center max-w-2xl">
        At FundNest, we provide a platform for startups to showcase their
        vision, financials, and valuation. Grow, collaborate, and succeed with
        our tools and community.
      </p>
      <div className="grid md:grid-cols-2 gap-8 w-full max-w-5xl">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className="bg-black p-6 rounded-2xl shadow-lg text-center flex flex-col items-center"
          >
            <div className="mb-4 bg-white p-3 rounded-full">{feature.icon}</div>
            <h3 className="text-xl text-white font-semibold mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-400 mb-4">{feature.description}</p>
          </motion.div>
        ))}
      </div>
      <Button
        onClick={handlebutton}
        className="mt-10 px-8 py-3 rounded-full bg-black text-white hover:bg-black/90"
      >
        Join Us
      </Button>
    </div>
  );
};

export default Detail;
