import { GithubLoginForm } from "@/components/GitHubAuth";
import { EmailPasswordLoginForm } from "@/components/EmailAuth";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
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
          <CardTitle className="text-2xl text-center">Login</CardTitle>
          <CardDescription className="text-center">
            Choose your preferred login method
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <EmailPasswordLoginForm />
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
            Create an new account?{" "}
            <Link
              href="/auth/sign-up"
              className="text-slate-700 hover:underline"
            >
              Sign Up
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
