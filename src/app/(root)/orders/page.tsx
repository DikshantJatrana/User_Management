"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { toast } from "sonner";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { signOut, useSession } from "next-auth/react";

interface Order {
  _id: string;
  amount: number;
  quantity: number;
  startup: {
    _id: string;
    title: string;
    sharePrice: number;
    logo: string;
  };
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    async function fetchOrders() {
      if (session?.user?._id) {
        try {
          const res = await fetch(`/api/orders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: session.user._id }),
          });
          if (!res.ok) throw new Error("Failed to fetch orders");
          const data = await res.json();
          setOrders(data.orders);
        } catch (error) {
          toast.error("Error loading orders");
        } finally {
          setLoading(false);
        }
      }
    }

    fetchOrders();
  }, [session]);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('/imgs/dot1.avif')",
        backgroundSize: "40%",
      }}
    >
      <Navbar />
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold text-center text-white">My Stocks</h1>
        {loading ? (
          <p className="text-white text-center mt-6">Loading...</p>
        ) : orders.length === 0 ? (
          <p className="text-white text-center mt-6">No orders found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {orders.map((order) => (
              <Card key={order._id} className="bg-white/90 backdrop-blur-md">
                <CardHeader className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <Image
                      src={order.startup.logo}
                      alt={order.startup.title}
                      width={50}
                      height={50}
                      className="rounded-lg"
                    />
                    <CardTitle className="text-lg font-semibold">
                      {order.startup.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-col gap-2">
                  <p className="text-gray-700">
                    <strong>Shares:</strong> {order.quantity}
                  </p>
                  <p className="text-gray-700">
                    <strong>Investment:</strong> ₹{order.amount}
                  </p>
                  <Button
                    className="w-full bg-black text-white hover:bg-gray-900"
                    onClick={() => router.push(`/startup/${order.startup._id}`)}
                  >
                    View Startup
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
