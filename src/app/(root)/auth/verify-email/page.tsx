"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

function VerifyEmailContent() {
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
    <div className="h-screen flex items-center justify-center">
      <h1>{loading ? "Verifying..." : "Redirecting..."}</h1>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense
      fallback={
        <div className="h-screen flex items-center justify-center">
          Loading...
        </div>
      }
    >
      <VerifyEmailContent />
    </Suspense>
  );
}
