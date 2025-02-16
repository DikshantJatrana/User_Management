"use client";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const GithubLoginForm = () => {
  const router = useRouter();

  const handleGithubLogin = async () => {
    try {
      const result = await signIn("github", {
        redirect: false,
        callbackUrl: "/",
      });

      if (result?.error) {
        toast.error("Login failed. Please try again.");
      } else {
        toast.success("Login successful");
        router.push("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <Button
      variant={"secondary"}
      className="w-full flex items-center font-semibold justify-center gap-2"
      onClick={handleGithubLogin}
    >
      <FaGithub className="w-5 h-5" />
      GitHub
    </Button>
  );
};
