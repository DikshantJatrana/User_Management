import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import ClientWrapper from "@/components/ClientWrapper";

const HomePage = async () => {
  const session = await auth();

  if (session?.user) {
    redirect("/home");
  }

  return <ClientWrapper />;
};

export default HomePage;
