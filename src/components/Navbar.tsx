"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlignRight, X, Plus } from "lucide-react";
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [open, setOpen] = useState(false);
  const [balance, setBalance] = useState<number | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchBalance = async () => {
      if (session?.user?._id) {
        try {
          const response = await fetch(`/api/auth/profile`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ id: session.user._id }),
          });
          const data = await response.json();
          console.log(data);
          if (response.ok) {
            setBalance(data.user.balance);
          } else {
            console.error("Failed to fetch balance:", data.error);
          }
        } catch (error) {
          console.error("Error fetching balance:", error);
        }
      }
    };

    fetchBalance();
  }, [session]);

  const handleMenuToggle = () => setOpen((prev) => !prev);
  const handleDropdownToggle = () => setDropdownOpen((prev) => !prev);

  return (
    <div className="w-full flex items-center justify-center">
      <header className="w-[95%] z-50 flex justify-between text-black mt-5 items-center p-2 bg-white rounded-full border-2 border-black">
        <Image
          src="/imgs/Logo.png"
          width={75}
          height={40}
          alt="Logo"
          className="ml-3"
        />

        <nav className="hidden font-bold md:flex gap-10">
          <Link href="/home" className="hover:underline cursor-pointer">
            Home
          </Link>
          <Link
            href="/startup-guide"
            className="hover:underline cursor-pointer"
          >
            Startup Guide
          </Link>
        </nav>

        <div className="md:flex gap-2 hidden items-center">
          <Button
            onClick={() => router.push("/startup/create")}
            variant="secondary"
            className="rounded-full text-xl bg-[#ffcc00] hover:bg-[#ffcc00]/85"
          >
            <Plus />
          </Button>

          {session?.user ? (
            <div className="hidden md:flex items-center gap-2 relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={handleDropdownToggle}
              >
                <Image
                  src={session.user.image || "/imgs/avatar.png"}
                  width={40}
                  height={40}
                  alt="User Avatar"
                  className="rounded-full"
                />
              </div>

              {dropdownOpen && (
                <div className="absolute top-12 z-50 right-0 bg-white border border-gray-200 rounded-lg shadow-lg w-48">
                  <div className="p-4 font-semibold">
                    <p className="text-sm font-semibold text-gray-800">
                      Balance: ₹{balance !== null ? balance : "Loading..."}
                    </p>
                  </div>
                  <Link
                    href="/orders"
                    className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                  <Link
                    href="/add-money"
                    className="block px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                  >
                    Add Money
                  </Link>
                  <button
                    onClick={() => signOut()}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Button
              onClick={() => router.push("/auth/login")}
              variant="default"
              className="hidden md:flex rounded-full"
            >
              Sign In
            </Button>
          )}
        </div>

        <Button
          onClick={handleMenuToggle}
          variant="default"
          className="flex md:hidden rounded-full"
        >
          <AlignRight />
        </Button>
      </header>

      <div
        className={`w-[80%] md:hidden h-screen overflow-hidden bg-gray-900 absolute top-0 right-0 z-50 duration-1000 ${
          open ? "translate-x-0" : "translate-x-[100%]"
        }`}
      >
        <button
          onClick={handleMenuToggle}
          className="text-[#ffcc00] text-3xl p-2 hover:bg-gray-700 absolute top-4 rounded-full font-bold right-3"
        >
          <X />
        </button>
        <div className="flex flex-col text-4xl text-[#ffcc00] items-start font-bold w-full">
          <Link
            href="/home"
            className="px-3 py-6 border-y-2 border-gray-500 w-full hover:bg-gray-700 mt-20 cursor-pointer"
          >
            Home
          </Link>
          <Link
            href="/startup-guide"
            className="px-3 py-6 border-b-2 border-gray-500 w-full hover:bg-gray-700 cursor-pointer"
          >
            Startup Guide
          </Link>
          {!session?.user && (
            <>
              <Link
                href="/auth/sign-up"
                className="px-3 py-6 border-b-2 border-gray-500 w-full hover:bg-gray-700 cursor-pointer"
              >
                Sign up
              </Link>
              <Link
                href="/auth/login"
                className="px-3 py-6 border-b-2 border-gray-500 w-full hover:bg-gray-700 cursor-pointer"
              >
                Login
              </Link>
            </>
          )}

          {session?.user && (
            <>
              <button
                onClick={() => signOut()}
                className="px-3 py-6 border-b-2 border-gray-500 w-full hover:bg-gray-700 cursor-pointer text-left text-[#ffcc00]"
              >
                Logout
              </button>
              <Link
                href="/add-money"
                className="px-3 py-6 border-b-2 border-gray-500 w-full hover:bg-gray-700 cursor-pointer"
              >
                Add Money
              </Link>
              <Link
                href="/orders"
                className="px-3 py-6 border-b-2 border-gray-500 w-full hover:bg-gray-700 cursor-pointer"
              >
                Orders
              </Link>
              <Link
                href="/startup/create"
                className="px-3 py-6 border-b-2 border-gray-500 w-full hover:bg-gray-700 cursor-pointer"
              >
                Create Startup
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
