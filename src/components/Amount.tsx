"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useSession } from "next-auth/react";

export const Amount = () => {
  const [amount, setAmount] = useState<number | string>("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!session?.user?._id) {
        throw new Error("User not authenticated.");
      }

      const response = await fetch("/api/auth/add-money", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: session.user._id,
          amount: Number(amount),
        }),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Money added successfully!");
        router.push("/home");
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="amount">Amount</Label>
          <Input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            required
            min="1"
          />
        </div>
        <Button
          type="submit"
          className="w-full font-semibold"
          disabled={isLoading}
        >
          {isLoading ? "Adding money..." : "Add Money"}
        </Button>
      </form>
    </div>
  );
};
