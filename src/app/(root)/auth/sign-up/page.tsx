import { SignupForm } from "@/components/SignupForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import { GithubLoginForm } from "@/components/GitHubAuth";
import Image from "next/image";
export default function SignupPage() {
  return (
    <div
      style={{
        backgroundImage: "url('/imgs/dot1.avif')",
        backgroundSize: "contain",
      }}
      className="flex items-center justify-center min-h-screen"
    >
      <Card className="w-full max-w-[350px]">
        <CardHeader>
          <div className="w-full flex items-center justify-center">
            <Image
              src="/imgs/Logo.png"
              width={120}
              height={70}
              alt="Logo of brand"
            />
          </div>
          <CardTitle className="text-center text-2xl">Sign up</CardTitle>
          <CardDescription className="text-center">
            Create a new account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <SignupForm />
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>
          <GithubLoginForm />
          <div className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/login" className="text-slate-700 hover:underline">
              Log in
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
