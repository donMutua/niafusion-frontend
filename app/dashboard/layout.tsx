import { redirect } from "next/navigation";

import { createClient } from "../../lib/supabase/server";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data } = await supabase.auth.getSession();

  if (!data.session) {
    redirect("/auth/sign-in");
  }

  return <>{children}</>;
}
