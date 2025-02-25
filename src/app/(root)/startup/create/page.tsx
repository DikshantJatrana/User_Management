"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import MDEditor from "@uiw/react-md-editor";

const CreateStartup = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<string | null>(null);
  const [sharePrice, setSharePrice] = useState<number>(0);
  const [shareQuantity, setShareQuantity] = useState<number>(0);
  const [details, setDetails] = useState("");
  const logoInputRef = useRef<HTMLInputElement>(null!);
  const coverInputRef = useRef<HTMLInputElement>(null!);
  const user = session?.user._id;

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setImage: React.Dispatch<React.SetStateAction<string | null>>
  ) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => setImage(e.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  const triggerFileUpload = (inputRef: React.RefObject<HTMLInputElement>) => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!user) {
        throw new Error("User is not authenticated.");
      }

      const formData = new FormData();

      formData.append("title", title);
      formData.append("description", description);
      formData.append("user", user);
      formData.append("sharePrice", sharePrice.toString());
      formData.append("shareQuantity", shareQuantity.toString());
      formData.append("details", details);

      if (logo) {
        formData.append("logo", logo);
      }
      if (coverImage) {
        formData.append("coverImage", coverImage);
      }

      const response = await fetch("/api/startup/create", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Startup Created");
        router.push("/");
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };

  return (
    <div
      className="w-full min-h-screen pb-8 bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/imgs/dot1.avif')",
        backgroundSize: "40%",
      }}
    >
      <Navbar />

      <div className="max-w-3xl mx-auto mt-12 p-6 rounded-lg bg-white shadow-lg">
        <h1 className="text-3xl font-bold text-center text-[#ffcc00] mb-6">
          Create Your Startup
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex flex-col items-center">
            <label className="text-lg font-semibold text-gray-800 mb-2">
              Logo
            </label>
            <div
              className="w-24 h-24 border border-gray-500 rounded-full flex items-center justify-center overflow-hidden cursor-pointer bg-gray-50"
              onClick={() => triggerFileUpload(logoInputRef)}
            >
              {logo ? (
                <Image src={logo} alt="Logo Preview" width={96} height={96} />
              ) : (
                <span className="text-gray-400 text-center">
                  Click to Upload
                </span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={logoInputRef}
              className="hidden"
              onChange={(e) => handleImageUpload(e, setLogo)}
            />
          </div>

          <div>
            <label className="text-lg font-semibold text-gray-800 mb-1">
              Title
            </label>
            <Input
              type="text"
              placeholder="Enter Startup Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-black"
            />
          </div>

          <div className="flex flex-col items-center">
            <label className="text-lg font-semibold text-gray-800 mb-2">
              Cover Image
            </label>
            <div
              className="w-full h-40 border border-gray-500 rounded-lg flex items-center justify-center overflow-hidden cursor-pointer bg-gray-50"
              onClick={() => triggerFileUpload(coverInputRef)}
            >
              {coverImage ? (
                <Image
                  src={coverImage}
                  alt="Cover Preview"
                  width={400}
                  height={160}
                />
              ) : (
                <span className="text-gray-400">Click to Upload</span>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={coverInputRef}
              className="hidden"
              onChange={(e) => handleImageUpload(e, setCoverImage)}
            />
          </div>

          <div>
            <label className="text-lg font-semibold text-gray-800 mb-1">
              Share Price
            </label>
            <Input
              type="number"
              placeholder="Enter Share Price"
              value={sharePrice}
              onChange={(e) => setSharePrice(Number(e.target.value))}
              className="text-black"
            />
          </div>

          <div>
            <label className="text-lg font-semibold text-gray-800 mb-1">
              Share Quantity
            </label>
            <Input
              type="number"
              placeholder="Enter Share Quantity"
              value={shareQuantity}
              onChange={(e) => setShareQuantity(Number(e.target.value))}
              className="text-black"
            />
          </div>

          <div>
            <label className="text-lg font-semibold text-gray-800 mb-1">
              Details
            </label>
            <Input
              type="text"
              placeholder="Enter Additional Details"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              className="text-black"
            />
          </div>

          <div>
            <label className="text-lg font-semibold text-gray-800 mb-1">
              Description
            </label>
            <MDEditor
              value={description}
              onChange={(value) => setDescription(value as string)}
              id="pitch"
              preview="edit"
              height={300}
              style={{ borderRadius: 10, overflow: "hidden" }}
              textareaProps={{
                placeholder:
                  "Briefly describe your idea and what problem it solves",
              }}
              previewOptions={{
                disallowedElements: ["style"],
              }}
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-[#ffcc00] text-black font-bold hover:bg-[#ffcc00]/90"
          >
            Create Startup
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateStartup;
