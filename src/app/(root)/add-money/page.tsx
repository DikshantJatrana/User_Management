import { Amount } from "@/components/Amount";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";

export default function AddMoneyPage() {
  return (
    <div
      style={{
        backgroundImage: "url('/imgs/dot1.avif')",
        backgroundSize: "contain",
      }}
      className="flex items-center min-h-screen flex-col"
    >
      <Navbar />
      <Card className="w-full max-w-[350px] mt-20">
        <CardHeader>
          <div className="w-full flex items-center justify-center">
            <Image
              src="/imgs/Logo.png"
              width={120}
              height={70}
              alt="Logo of brand"
            />
          </div>
          <CardTitle className="text-center text-2xl">Add Money</CardTitle>
          <CardDescription className="text-center">
            Add funds to your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Amount />
          <div className="text-center text-sm">
            Want to check your balance?{" "}
            <Link href="/orders" className="text-slate-700 hover:underline">
              Orders
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
