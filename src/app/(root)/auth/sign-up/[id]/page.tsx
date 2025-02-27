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

export default function VerifyEmail() {
  const { id } = useParams();
  console.log(id);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [email, setEmail] = useState("");

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
          toast.error(data.error || "Failed to fetch user");
        }
      } catch (error) {
        toast.error("Something went wrong!");
      }
    }
    fetchUser();
  }, [id]);

  const handleResendEmail = async () => {
    setResendLoading(true);
    try {
      const res = await fetch("/api/auth/signup/resend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      const data = await res.json();

      if (res.ok) {
        toast.success("Verification email has been resent.");
      } else {
        toast.error(data.error || "Failed to resend email");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    } finally {
      setResendLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-100">
      <Card className="w-full max-w-md bg-white shadow-lg border border-gray-200">
        <CardHeader className="text-center">
          <div className="flex justify-center">
            <Image
              src="/imgs/Logo.png"
              width={120}
              height={70}
              alt="Brand Logo"
            />
          </div>
          <CardTitle className="text-2xl font-bold">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-gray-600">
            We have sent a verification email to{" "}
            <span className="font-bold">{email || "your email"}</span>. Click
            the link in your email to verify your account.
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-gray-700 text-sm font-bold">
            Didn’t receive the email? Resend it below.
          </p>
          <p className="mt-2 bg-gray-200 text-sm text-center rounded-md">
            Email sending is not working because I donot have a paid domain; it
            only works in testing mode,check Github for Mail send Code in
            src/lib/sendMail.ts
          </p>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button
            onClick={handleResendEmail}
            disabled={resendLoading}
            className="bg-black text-white hover:bg-gray-900"
          >
            {resendLoading ? "Resending..." : "Resend Email"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
