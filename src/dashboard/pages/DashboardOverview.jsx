import { useEffect, useState } from "react";
import { fetchConferenceStats } from "../services/registrations.service";

export default function DashboardOverview() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchConferenceStats().then(setCount);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard title="Conference Registrations" value={count} />
    </div>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <p className="text-sm text-gray-500">{title}</p>
      <p className="text-3xl font-bold mt-2">{value}</p>
    </div>
  );
}
