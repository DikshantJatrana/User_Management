"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const verifyCode = searchParams.get("verifycode");
  const userId = searchParams.get("id");
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function verifyUser() {
      if (!userId || !verifyCode) {
        toast.error("Invalid verification link");
        router.push("/auth/login");
        return;
      }

      try {
        const res = await fetch("/api/auth/verify-otp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId, verifyCode }),
        });

        const data = await res.json();
        if (res.ok) {
          toast.success("Email verified successfully!");
          setTimeout(() => router.push("/auth/login"), 2000);
        } else {
          toast.error(data.error || "Verification failed.");
          setTimeout(() => router.push("/auth/login"), 2000);
        }
      } catch (error) {
        toast.error("Something went wrong!");
        setTimeout(() => router.push("/auth/login"), 2000);
      } finally {
        setLoading(false);
      }
    }

    verifyUser();
  }, [userId, verifyCode, router]);

  return (
    <div
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{
        backgroundImage: "url('/imgs/dot1.avif')",
        backgroundSize: "contain",
      }}
    >
      <div className="bg-black bg-opacity-70 px-6 py-4 rounded-lg text-white text-center">
        <h1 className="text-xl font-bold">
          {loading ? "Verifying..." : "Redirecting..."}
        </h1>
      </div>
    </div>
  );
}
