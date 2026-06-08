/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { Heart, Activity, Shield, Landmark, ExternalLink, Calendar, HelpCircle } from "lucide-react";
import { motion } from "motion/react";
import { SupportSubmission } from "./types";
import { DashboardStats } from "./components/DashboardStats";
import { SupportForm } from "./components/SupportForm";
import { SubmissionsList } from "./components/SubmissionsList";
import { Chatbot } from "./components/Chatbot";

const STORAGE_KEY = "health_ngo_portal_submissions";

const INITIAL_DEMO_DATA: SupportSubmission[] = [
  {
    id: "sub-demo-1",
    type: "patient",
    fullName: "Eleanor Vance",
    email: "eleanor.v@outlook.com",
    phone: "+1 (555) 789-1234",
    details: "Requires specialized pediatric outpatient nursing assistance and monthly health awareness home-kits due to a chronic bone ailment.",
    submittedAt: "06/05/2026, 09:12 AM",
    status: "Active",
  },
  {
    id: "sub-demo-2",
    type: "volunteer",
    fullName: "Benjamin Miller",
    email: "dr.benjamin@healthcare.org",
    phone: "+1 (555) 341-9876",
    details: "Experienced pediatrician specializing in pediatric respiratory systems. Available for clinical volunteering on alternate Saturdays.",
    submittedAt: "06/07/2026, 03:45 PM",
    status: "Reviewed",
  },
];

export default function App() {
  const [submissions, setSubmissions] = useState<SupportSubmission[]>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? JSON.parse(stored) : INITIAL_DEMO_DATA;
    } catch {
      return INITIAL_DEMO_DATA;
    }
  });

  // Keep localStorage updated when state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(submissions));
  }, [submissions]);

  const handleNewSubmission = (newSub: SupportSubmission) => {
    setSubmissions((prev) => [newSub, ...prev]);
  };

  const handleUpdateStatus = (id: string, nextStatus: "Pending" | "Reviewed" | "Active") => {
    setSubmissions((prev) =>
      prev.map((sub) => (sub.id === id ? { ...sub, status: nextStatus } : sub))
    );
  };

  const handleDeleteSubmission = (id: string) => {
    setSubmissions((prev) => prev.filter((sub) => sub.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 antialiased selection:bg-emerald-100 selection:text-emerald-900 pb-16">
      {/* Top Banner Navigation */}
      <header className="sticky top-0 z-40 bg-white/85 backdrop-blur-md border-b border-slate-100 py-3.5 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 flex items-center justify-center text-white shadow-sm shadow-emerald-600/15">
              <Heart className="w-5 h-5" />
            </div>
            <div>
              <span className="font-display font-bold text-base text-slate-900 tracking-tight flex items-center gap-1.5">
                BioWave Support Hub
              </span>
              <p className="text-[10px] text-slate-400 font-medium font-mono uppercase tracking-wider">
                Community Health Agency
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 border border-slate-200/50 rounded-lg text-xs font-semibold text-slate-600">
              <Activity className="w-3.5 h-3.5 text-emerald-600" />
              Emergency Duty: Active
            </span>
            <div className="text-xs text-slate-500 font-mono hidden sm:inline-block">
              Portal Ref: <span className="font-semibold text-slate-900">NGO-827-26</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 pt-6 space-y-6">
        {/* Hero Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-6 md:p-8 text-white relative overflow-hidden shadow-md">
          {/* Decorative subtle ambient glows */}
          <div className="absolute -right-16 -top-16 w-56 h-56 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
          <div className="absolute right-1/4 -bottom-16 w-72 h-72 rounded-full bg-teal-500/10 blur-3xl pointer-events-none" />

          <div className="max-w-3xl relative z-10 space-y-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] uppercase font-semibold tracking-wider font-mono border border-emerald-500/20">
              <Shield className="w-3.5 h-3.5" /> Healthcare Support Portal
            </div>
            
            <h1 className="text-2xl md:text-4xl font-display font-medium tracking-tight leading-tight">
              Aiding Care, Training Nurses, and Elevating Health Awareness
            </h1>
            
            <p className="text-xs md:text-sm text-slate-330 text-slate-300 leading-relaxed font-sans max-w-2xl">
              BioWave offers personalized clinical medical assistance, local public education drives, and professional volunteering setups. Use this digital portal to complete patient registries, query our support desk, or volunteer in dynamic clinical cohorts.
            </p>

            <div className="pt-2 flex flex-wrap gap-4 items-center text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Landmark className="w-4 h-4 text-emerald-400" /> Authorized NGO Board
              </span>
              <span className="hidden sm:inline-block">•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-emerald-400" /> Clinical Review: 2026 Cycles
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic Statistics Board */}
        <DashboardStats submissions={submissions} />

        {/* Core Layout Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Main Controls - 7 Column spaces */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Patient & Volunteer support form */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <SupportForm onNewSubmission={handleNewSubmission} />
            </motion.div>

            {/* Live Submissions database */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <SubmissionsList
                submissions={submissions}
                onUpdateStatus={handleUpdateStatus}
                onDeleteSubmission={handleDeleteSubmission}
              />
            </motion.div>

          </div>

          {/* Assistant Chatbot - 5 Column spaces */}
          <div className="lg:col-span-5 lg:sticky lg:top-[84px] space-y-5">
            
            {/* Guide Board details */}
            <div className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm space-y-3.5">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-slate-900 text-xs tracking-tight uppercase">Portal Guidelines</h4>
                <HelpCircle className="w-4 h-4 text-emerald-600" />
              </div>
              <ul className="space-y-2.5 text-xs text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="text-emerald-500 font-semibold">•</span>
                  <span><strong>Registering Clinic Patients:</strong> Use the dedicated form tab to register a new profile. Our duty nurses will review within 24 hours.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-teal-500 font-semibold">•</span>
                  <span><strong>Becoming a Volunteer:</strong> Sign up using the volunteer form. Active registry checks commence in monthly cycles.</span>
                </li>
              </ul>
              <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-semibold text-slate-500">
                <span>Support Email:</span>
                <a href="mailto:support@healthcare.org" className="text-emerald-600 hover:underline flex items-center gap-1 font-mono">
                  support@healthcare.org <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Chatbot Engine Wrapper */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <Chatbot />
            </motion.div>

          </div>

        </div>
      </main>

      {/* Elegant minimalist footer */}
      <footer className="mt-16 border-t border-slate-200/50 pt-8 max-w-7xl mx-auto px-4 text-center space-y-2">
        <p className="text-xs text-slate-400">
          © 2026 BioWave Community Health Agency. Operational records held securely under local offline state schemas.
        </p>
        <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wider">
          Compliance Level: Level A Clinical Ethics Verification
        </p>
      </footer>
    </div>
  );
}
