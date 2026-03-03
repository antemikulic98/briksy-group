import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import BugReportForm from "./bug-report-form";

export const metadata = { title: "Novi bug report" };

export default async function NewBugReportPage() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") redirect("/login");

  return (
    <>
      <h1 className="mb-6 text-2xl font-bold text-foreground">
        Novi bug report
      </h1>
      <div className="max-w-2xl">
        <BugReportForm />
      </div>
    </>
  );
}
