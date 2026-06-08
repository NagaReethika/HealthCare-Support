import React, { useState } from "react";
import { UserPlus, HeartHandshake, AlertCircle, CheckCircle } from "lucide-react";
import { FormType, SupportSubmission } from "../types";

interface SupportFormProps {
  onNewSubmission: (submission: SupportSubmission) => void;
}

export function SupportForm({ onNewSubmission }: SupportFormProps) {
  const [formType, setFormType] = useState<FormType>("patient");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [details, setDetails] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !phone.trim() || !details.trim()) {
      return;
    }

    const newSubmission: SupportSubmission = {
      id: "sub-" + Math.random().toString(36).substring(2, 9),
      type: formType,
      fullName,
      email,
      phone,
      details,
      submittedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      status: "Pending",
    };

    onNewSubmission(newSubmission);

    // Form Reset & Success Feedback
    setIsSuccess(true);
    setFullName("");
    setEmail("");
    setPhone("");
    setDetails("");

    setTimeout(() => {
      setIsSuccess(false);
    }, 4000);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 p-6 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-slate-100 pb-5">
        <div>
          <h3 className="font-semibold text-slate-900 text-sm tracking-tight">Support & Hub Registration</h3>
          <p className="text-xs text-slate-500">Select the appropriate form to request healthcare support or volunteer.</p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-slate-50 p-1 rounded-xl border border-slate-200/50 self-start">
          <button
            type="button"
            onClick={() => { setFormType("patient"); setIsSuccess(false); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
              formType === "patient"
                ? "bg-white text-emerald-700 shadow-sm border border-slate-100"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <UserPlus className="w-3.5 h-3.5 text-emerald-600" />
            Patient Register
          </button>
          <button
            type="button"
            onClick={() => { setFormType("volunteer"); setIsSuccess(false); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
              formType === "volunteer"
                ? "bg-white text-teal-700 shadow-sm border border-slate-100"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5 text-teal-600" />
            Volunteer Enrollment
          </button>
          <button
            type="button"
            onClick={() => { setFormType("concern"); setIsSuccess(false); }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold tracking-tight transition-all cursor-pointer ${
              formType === "concern"
                ? "bg-white text-rose-700 shadow-sm border border-slate-100"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            Submit Concern
          </button>
        </div>
      </div>

      {isSuccess && (
        <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl flex items-start gap-2.5 text-xs">
          <CheckCircle className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
          <div>
            <p className="font-semibold">Submission Successfully Saved!</p>
            <p className="text-emerald-600 mt-0.5">
              {formType === "patient"
                ? "Your patient support file has been initialised in local state. Ready for audit."
                : formType === "volunteer"
                ? "Thank you! Volunteer application registered. Active team reviews every month."
                : "Urgent healthcare concern recorded. Our duty doctor will make secondary review."}
            </p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-semibold tracking-tight uppercase text-slate-500 mb-1.5">
              Full Name / Primary Contact
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Eleanor Vance"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none transition-all placeholder:text-slate-400"
            />
          </div>

          <div>
            <label className="block text-[11px] font-semibold tracking-tight uppercase text-slate-500 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              placeholder="e.g. eleanor@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-semibold tracking-tight uppercase text-slate-500 mb-1.5">
            Contact Phone Number
          </label>
          <input
            type="tel"
            required
            placeholder="e.g. +1 (555) 234-5678"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none transition-all placeholder:text-slate-400"
          />
        </div>

        <div>
          <label className="block text-[11px] font-semibold tracking-tight uppercase text-slate-500 mb-1.5">
            {formType === "patient"
              ? "Support Required & Health Description"
              : formType === "volunteer"
              ? "Availability, Specialisation or Skills"
              : "Describe Your Urgent Concern"}
          </label>
          <textarea
            required
            rows={3}
            placeholder={
              formType === "patient"
                ? "Describe clinical, home care, or financial healthcare support required"
                : formType === "volunteer"
                ? "Share clinical skills, availability, or general healthcare awareness fields"
                : "Submit the symptoms, urgency level and what type of specialist or nurse response is requested..."
            }
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full bg-slate-50 border border-slate-200/80 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-3.5 py-2.5 text-xs text-slate-800 focus:outline-none transition-all placeholder:text-slate-400 resize-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs tracking-tight py-3 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-slate-950"
        >
          {formType === "patient" && "Register Patient File"}
          {formType === "volunteer" && "Apply as Volunteer"}
          {formType === "concern" && "Submit Urgent Case Concern"}
        </button>
      </form>
    </div>
  );
}
