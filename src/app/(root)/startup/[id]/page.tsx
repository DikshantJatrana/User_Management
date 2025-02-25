"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const StartupDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = useParams();
  const [startup, setStartup] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"details" | "buy">("details");
  const [quantity, setQuantity] = useState(1);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const res = await fetch(`/api/startup/${id}`);
        if (!res.ok) throw new Error("Failed to fetch startup details");
        const data = await res.json();
        setStartup(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStartup();
  }, [id]);

  if (loading)
    return (
      <div
        style={{
          backgroundImage: "url('/imgs/dot1.avif')",
          backgroundSize: "40%",
        }}
        className="text-2xl font-bold flex items-center justify-center w-full h-screen"
      >
        Loading...
      </div>
    );

  if (!startup)
    return (
      <div
        style={{
          backgroundImage: "url('/imgs/dot1.avif')",
          backgroundSize: "40%",
        }}
        className="text-2xl font-bold flex items-center justify-center w-full h-screen"
      >
        <p className="text-red-500">Startup not found</p>
      </div>
    );

  const isAdmin = session?.user?._id === startup?.admin?.[0];

  const handleBuyShares = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/orders/create/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ quantity, userId: session?.user?._id }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Shares purchased successfully!");
        router.push("/orders");
      } else {
        toast.error(data.error || "Failed to buy shares");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div
      style={{
        backgroundImage: "url('/imgs/dot1.avif')",
        backgroundSize: "40%",
      }}
      className="w-full min-h-screen"
    >
      <Navbar />

      <div className="max-w-4xl mx-auto py-10 px-4 md:px-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <Image
              src={startup?.logo}
              alt="Startup Logo"
              width={80}
              height={80}
              className="rounded-full border-2 border-white shadow-lg"
            />
            <h1 className="text-4xl font-bold text-gray-800">
              {startup?.title}
            </h1>
          </div>
          {isAdmin && (
            <Button
              onClick={() => {
                router.push(`/startup/${id}/edit`);
              }}
              className="bg-black text-white hover:bg-gray-800 transition-colors duration-300"
            >
              Edit
            </Button>
          )}
        </div>

        <div className="w-full h-96 mt-8 rounded-lg overflow-hidden relative">
          <Image
            src={startup?.coverImage}
            alt="Cover Image"
            fill
            className="object-cover"
          />
        </div>

        <div className="mt-8 flex gap-4">
          <Button
            onClick={() => setActiveTab("details")}
            className={`flex-1 ${
              activeTab === "details"
                ? "bg-[#ffcc00] text-black"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Details
          </Button>
          <Button
            onClick={() => setActiveTab("buy")}
            className={`flex-1 ${
              activeTab === "buy"
                ? "bg-[#ffcc00] text-black"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Buy Shares
          </Button>
        </div>

        {activeTab === "details" && (
          <div className="mt-8 bg-gray-50 p-3 rounded-md text-gray-900 prose max-w-full">
            <h2 className="text-2xl font-bold mb-4">About the Startup</h2>
            <ReactMarkdown>{startup?.description}</ReactMarkdown>

            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Share Information</h2>
              <p className="text-gray-600">
                <span className="font-semibold">Share Price:</span> ₹
                {startup?.sharePrice}
              </p>
              <p className="text-gray-600">
                <span className="font-semibold">Shares Available:</span>{" "}
                {startup?.shareQuantity}
              </p>
            </div>
          </div>
        )}

        {activeTab === "buy" && (
          <div className="mt-8 bg-gray-50 rounded-md p-6">
            <h2 className="text-2xl font-bold mb-4">Buy Shares</h2>
            <form onSubmit={handleBuyShares} className="space-y-4">
              <div className="grid md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-900">
                    Quantity
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    min="1"
                    max={startup?.shareQuantity}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm"
                    required
                  />
                </div>

                <div className="flex items-center justify-center">
                  <p className="text-3xl text-gray-900">
                    <span className="font-semibold">Total Cost:</span> ₹
                    {(startup?.sharePrice * quantity).toFixed(2)}
                  </p>
                </div>
              </div>
              <Button
                type="submit"
                className="w-full bg-[#ffcc00] text-black font-bold hover:bg-[#ffcc00]/90"
              >
                Confirm Purchase
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default StartupDetails;
