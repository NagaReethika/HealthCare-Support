import React from "react";
import { Users, Heart, ClipboardCheck, Activity } from "lucide-react";
import { SupportSubmission } from "../types";

interface DashboardStatsProps {
  submissions: SupportSubmission[];
}

export function DashboardStats({ submissions }: DashboardStatsProps) {
  // Compute numbers based on dynamic submissions + realistic baseline
  const patientCount = submissions.filter((s) => s.type === "patient").length;
  const volunteerCount = submissions.filter((s) => s.type === "volunteer").length;
  const concernCount = submissions.filter((s) => s.type === "concern").length;

  const stats = [
    {
      label: "Registered Patients",
      value: 1240 + patientCount,
      change: `+${patientCount} recent`,
      colorClass: "bg-emerald-50 text-emerald-800 border-emerald-100",
      icon: Users,
    },
    {
      label: "Active Volunteers",
      value: 480 + volunteerCount,
      change: `+${volunteerCount} this month`,
      colorClass: "bg-teal-50 text-teal-800 border-teal-100",
      icon: Heart,
    },
    {
      label: "Raised Concerns",
      value: 28 + concernCount,
      change: `${concernCount} pending review`,
      colorClass: "bg-rose-50 text-rose-800 border-rose-100",
      icon: ClipboardCheck,
    },
    {
      label: "NGO Health Rating",
      value: "99.8%",
      change: "Active Duty Team",
      colorClass: "bg-blue-50 text-blue-800 border-blue-100",
      icon: Activity,
    },
  ];

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, idx) => (
        <div
          key={stat.label}
          className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm flex flex-col justify-between"
        >
          <div className="flex items-center justify-between gap-3 mb-2">
            <span className="text-[11px] font-semibold tracking-tight uppercase text-slate-500 truncate">
              {stat.label}
            </span>
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 border ${stat.colorClass}`}>
              <stat.icon className="w-4 h-4" />
            </div>
          </div>
          <div>
            <span className="text-2xl font-bold text-slate-900 tracking-tight font-sans">
              {stat.value}
            </span>
            <p className="text-[10px] text-slate-500 font-mono mt-0.5">{stat.change}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
