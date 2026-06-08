import React from "react";
import { User, Check, Heart, UserCheck, Trash2 } from "lucide-react";
import { SupportSubmission } from "../types";

interface SubmissionsListProps {
  submissions: SupportSubmission[];
  onUpdateStatus: (id: string, nextStatus: "Pending" | "Reviewed" | "Active") => void;
  onDeleteSubmission: (id: string) => void;
}

export function SubmissionsList({
  submissions,
  onUpdateStatus,
  onDeleteSubmission,
}: SubmissionsListProps) {
  if (submissions.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center shadow-sm">
        <div className="w-12 h-12 bg-slate-50 border border-slate-200/50 rounded-2xl flex items-center justify-center mx-auto mb-3 text-slate-400">
          <User className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-semibold text-slate-800 tracking-tight">No Active Registrations Yet</h4>
        <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">
          When you register a patient support file, apply as a volunteer, or submit a support concern, it will display here.
        </p>
      </div>
    );
  }

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "patient":
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-100 inline-flex items-center gap-1">
            <User className="w-3 h-3 text-emerald-600" /> Patient Support
          </span>
        );
      case "volunteer":
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-teal-50 text-teal-800 border border-teal-100 inline-flex items-center gap-1">
            <Heart className="w-3 h-3 text-teal-600" /> Volunteer Program
          </span>
        );
      case "concern":
      default:
        return (
          <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-rose-50 text-rose-800 border border-rose-100 inline-flex items-center gap-1">
            <UserCheck className="w-3 h-3 text-rose-600" /> Active Care Request
          </span>
        );
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Reviewed":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-blue-50 text-blue-700 border border-blue-100">
            Reviewed
          </span>
        );
      case "Active":
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-100">
            Approved/Active
          </span>
        );
      case "Pending":
      default:
        return (
          <span className="px-2 py-0.5 rounded-full text-[10px] font-medium bg-amber-50 text-amber-700 border border-amber-100 animate-pulse">
            Pending Review
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-5 shadow-sm">
      <div className="mb-4">
        <h3 className="font-semibold text-slate-900 text-sm tracking-tight">Active Portal Registry</h3>
        <p className="text-xs text-slate-500">Live submissions recorded in offline secure storage.</p>
      </div>

      <div className="space-y-3.5 max-h-[500px] overflow-y-auto pr-1">
        {submissions.map((sub) => (
          <div
            key={sub.id}
            className="p-4 rounded-xl border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors flex flex-col md:flex-row md:items-start justify-between gap-4"
          >
            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-xs text-slate-900 tracking-tight">{sub.fullName}</span>
                {getTypeBadge(sub.type)}
                {getStatusBadge(sub.status)}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-[11px] text-slate-500 font-mono">
                <div>Email: <span className="text-slate-700">{sub.email}</span></div>
                <div>Phone: <span className="text-slate-700">{sub.phone}</span></div>
              </div>

              <p className="text-xs text-slate-600 bg-white p-2.5 rounded-lg border border-slate-200/50 leading-relaxed font-sans shadow-sm">
                {sub.details}
              </p>

              <div className="text-[10px] text-slate-400 font-mono">
                Submitted at: {sub.submittedAt}
              </div>
            </div>

            {/* Quick Action Controls */}
            <div className="flex items-center gap-1.5 self-end md:self-start">
              {sub.status === "Pending" && (
                <button
                  type="button"
                  onClick={() => onUpdateStatus(sub.id, "Reviewed")}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-blue-50 text-blue-700 border border-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
                  title="Mark as Reviewed"
                >
                  <Check className="w-3.5 h-3.5" />
                  Review
                </button>
              )}
              {sub.status === "Reviewed" && (
                <button
                  type="button"
                  onClick={() => onUpdateStatus(sub.id, "Active")}
                  className="px-2.5 py-1 text-[11px] font-semibold bg-white hover:bg-emerald-50 text-emerald-700 border border-slate-200 rounded-lg transition-colors cursor-pointer flex items-center gap-1 shadow-sm"
                  title="Mark as Approved"
                >
                  <Check className="w-3.5 h-3.5" />
                  Approve
                </button>
              )}
              <button
                type="button"
                onClick={() => onDeleteSubmission(sub.id)}
                className="p-1 text-slate-400 hover:text-rose-600 hover:bg-rose-50 border border-transparent hover:border-rose-100 rounded-lg transition-all cursor-pointer"
                title="Remove Submission"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
