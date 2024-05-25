import { getData } from "@/lib/api-client";
import Dashboard from "@/components/dashboard";

export default async function DashboardPage() {
  // TODO: Allow query parameters
  const data = await getData();
  return (
    <div>
      <h1>Dashboard</h1>
      <Dashboard initialData={data} />
    </div>
  );
}
