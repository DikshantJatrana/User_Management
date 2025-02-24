"use client";
import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";

function Page() {
  const [startups, setStartups] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchStartups = async () => {
      try {
        const response = await fetch("/api/startup");
        if (!response.ok) {
          throw new Error("Failed to fetch startups");
        }
        const data = await response.json();
        setStartups(data.startups);
      } catch (error) {
        setError(error instanceof Error ? error.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchStartups();
  }, []);

  if (loading) {
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
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div
      style={{
        backgroundImage: "url('/imgs/dot1.avif')",
        backgroundSize: "40%",
      }}
      className="w-full min-h-screen"
    >
      <Navbar />
      <div className="flex bg-[#ffcc00] py-4 items-center justify-center mt-8">
        <Carousel className="w-full max-w-4xl">
          <CarouselContent>
            {startups.map((startup) => (
              <CarouselItem key={startup._id}>
                <div
                  className="relative h-96 overflow-hidden rounded-lg cursor-pointer group"
                  onClick={() => router.push(`/startup/${startup._id}`)}
                >
                  {/* Cover Image */}
                  <Image
                    src={startup.coverImage}
                    alt={startup.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />

                  {/* Startup Name on Hover */}
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <h2 className="text-white text-3xl font-bold">
                      {startup.title}
                    </h2>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>

      <div className="mt-12 flex items-center justify-center">
        <h1 className="text-center w-full text-2xl font-bold">StartUps</h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {startups.map((startup) => (
          <Card
            key={startup._id}
            className="cursor-pointer hover:shadow-lg transition-shadow duration-300"
            onClick={() => router.push(`/startup/${startup._id}`)}
          >
            <CardContent className="p-4">
              <div className="relative h-48 overflow-hidden rounded-lg">
                <Image
                  src={startup.coverImage}
                  alt={startup.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="flex items-center mt-4">
                <Image
                  src={startup.logo}
                  alt={startup.title}
                  width={48}
                  height={48}
                  className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                />
                <h2 className="ml-4 text-xl font-bold">{startup.title}</h2>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-600">Owner:</h3>
                <p className="text-sm text-gray-500">
                  {startup.admin[0].username}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Page;
