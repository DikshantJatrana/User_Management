import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  if (!session) redirect("/auth/login");
  return (
    <div className="w-full h-screen border-2 flex flex-col items-center justify-center">
      <h1 className="flex items-center justify-center">
        {session.user?.email}
      </h1>
    </div>
  );
}
