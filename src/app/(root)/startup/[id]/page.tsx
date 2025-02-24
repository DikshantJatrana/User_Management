"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const StartupDetails = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = useParams();
  const [startup, setStartup] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchStartup = async () => {
      try {
        const res = await fetch(`/api/startup/${id}`);
        if (!res.ok) throw new Error("Failed to fetch startup details");
        const data = await res.json();
        setStartup(data);
        console.log(data);
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

        <div className="mt-8 text-gray-700 prose max-w-full">
          <ReactMarkdown>{startup?.description}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};

export default StartupDetails;
