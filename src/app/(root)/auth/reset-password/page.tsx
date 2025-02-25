"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import Image from "next/image";

function ResetPasswordContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const forgotcode = searchParams.get("forgotcode");
  const id = searchParams.get("id");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!forgotcode || !id) {
      toast.error("Invalid or expired reset link");
      router.push("/auth/login");
    }
  }, [forgotcode, id, router]);

  const handleResetPassword = async () => {
    if (!password) {
      toast.error("Please enter a new password");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ forgotcode, id, password }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Password reset successfully!");
        router.push("/auth/login");
      } else {
        toast.error(data.error || "Failed to reset password");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{
        backgroundImage: "url('/imgs/dot1.avif')",
        backgroundSize: "contain",
      }}
    >
      <Card className="w-full max-w-[350px] bg-white/90 backdrop-blur-sm border border-gray-200 shadow-lg">
        <CardHeader className="text-center">
          <div className="w-full flex justify-center">
            <Image
              src="/imgs/Logo.png"
              width={120}
              height={70}
              alt="Brand Logo"
            />
          </div>
          <CardTitle className="text-2xl font-bold text-black">
            Reset Password
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-black">
              New Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-black border-gray-300 focus:border-black focus:ring-2 focus:ring-black"
            />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button
            className="w-full bg-black text-white hover:bg-gray-900"
            onClick={handleResetPassword}
            disabled={loading}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

export default function ResetPassword() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <ResetPasswordContent />
    </Suspense>
  );
}
