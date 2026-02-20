import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { UserNav } from "@/components/ui/UserNav";

export default async function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <UserNav />
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
