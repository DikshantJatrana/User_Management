"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleReset = async () => {
    const response = await fetch("/api/auth/email-check", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      toast.success("Email Found");
      router.push(`/auth/forgot-password/${data.user.id}`);
    } else {
      toast.error(data.error || "Something went wrong!");
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('/imgs/dot1.avif')",
        backgroundSize: "contain",
      }}
    >
      <Card className="w-full max-w-[350px] bg-white">
        <CardHeader className="space-y-1 text-center">
          <div className="w-full flex items-center justify-center">
            <Image
              src="/imgs/Logo.png"
              width={120}
              height={70}
              alt="Logo of brand"
            />
          </div>
          <CardTitle className="text-2xl text-black">Forgot Password</CardTitle>
          <CardDescription className="text-gray-600">
            Enter your email to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-black">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your Email"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button
            className="w-full bg-black text-white hover:bg-gray-900"
            onClick={handleReset}
          >
            Reset Password
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
