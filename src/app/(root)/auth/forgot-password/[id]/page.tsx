"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Image from "next/image";

export default function ResetPasswordConfirmation() {
  const { id } = useParams();
  const [email, setEmail] = useState("");
  const [resending, setResending] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      if (!id) return;
      try {
        const res = await fetch(`/api/auth/profile`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id }),
        });
        const data = await res.json();
        if (res.ok) {
          setEmail(data.user.email);
        } else {
          toast.error(data.error || "Failed to fetch user details");
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
    fetchUser();
  }, [id]);

  const handleResendEmail = async () => {
    if (resending) return;
    setResending(true);
    try {
      const res = await fetch(`/api/auth/email-check/resend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();
      if (res.ok) {
        toast.success("Password reset email has been resent!");
      } else {
        toast.error(data.error || "Failed to resend email");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setResending(false);
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
        <CardHeader className="text-center space-y-2">
          <div className="flex justify-center">
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
          <CardDescription className="text-gray-600">
            {email
              ? `A password reset link has been sent to ${email}. Click the link to reset your password.`
              : "Fetching email..."}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-sm text-gray-700 font-bold">
            Didn’t receive the email? Click below to resend.
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={handleResendEmail}
            disabled={resending}
            className="bg-black text-white hover:bg-gray-900"
          >
            {resending ? "Resending..." : "Resend Email"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
