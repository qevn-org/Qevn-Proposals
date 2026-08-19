'use client';

import React, { useState } from 'react';
import { useProposalStore } from '@/store/proposal-store';
import { AppShell } from '@/components/layout/AppShell';
import { Briefcase, Plus, Trash2, CheckCircle2, Sparkles, X } from 'lucide-react';
import { CaseStudy } from '@/types/proposal';

export default function CaseStudiesPage() {
  const { caseStudies, addCaseStudy, deleteCaseStudy } = useProposalStore();
  const [isAddOpen, setIsAddOpen] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [clientName, setClientName] = useState('');
  const [industry, setIndustry] = useState('');
  const [bullet1, setBullet1] = useState('');
  const [bullet2, setBullet2] = useState('');
  const [bullet3, setBullet3] = useState('');
  const [results, setResults] = useState('');

  const handleAdd = () => {
    if (!title || !clientName) return;
    const bullets = [bullet1, bullet2, bullet3].filter(Boolean);
    addCaseStudy({
      title,
      clientName,
      industry: industry || 'Technology',
      bullets: bullets.length > 0 ? bullets : ['Proven deployment and measurable ROI delivered.'],
      results
    });
    setIsAddOpen(false);
    setTitle('');
    setClientName('');
    setIndustry('');
    setBullet1('');
    setBullet2('');
    setBullet3('');
    setResults('');
  };

  return (
    <AppShell>
      <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider bg-lime-100 text-lime-900 px-2 py-0.5 rounded border border-lime-300">
                PROVEN RESULTS
              </span>
              <span className="text-xs font-semibold text-neutral-400">·</span>
              <span className="text-xs font-semibold text-neutral-500">
                {caseStudies.length} Case Studies
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              Case Study Repository
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-0.5">
              Reusable enterprise case studies including Education ERP, Lead Gen & AI Calling, and LMS deployments.
            </p>
          </div>

          <button
            onClick={() => setIsAddOpen(true)}
            className="py-2.5 px-5 rounded-xl bg-neutral-950 hover:bg-black text-[#A3FF38] font-extrabold text-xs shadow-sm transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#A3FF38]" />
            <span>Add Case Study</span>
          </button>
        </div>

        {/* Case Studies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {caseStudies.map((cs) => (
            <div
              key={cs.id}
              className="bg-white rounded-2xl border border-neutral-200/90 hover:border-lime-400 p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-lime-100 text-lime-900 border border-lime-200">
                    {cs.industry}
                  </span>
                  {caseStudies.length > 1 && (
                    <button
                      onClick={() => {
                        if (confirm(`Delete case study "${cs.title}"?`)) {
                          deleteCaseStudy(cs.id);
                        }
                      }}
                      className="p-1 rounded text-neutral-400 hover:text-red-600 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                <h3 className="font-extrabold text-base text-neutral-950 mb-1">
                  {cs.title}
                </h3>
                <p className="text-xs font-semibold text-neutral-600 mb-4">
                  Client: {cs.clientName}
                </p>

                {/* Bullets */}
                <ul className="space-y-1.5 text-xs text-neutral-700 mb-4">
                  {cs.bullets.map((b, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-neutral-900 font-bold">•</span>
                      <span className="leading-snug">{b}</span>
                    </li>
                  ))}
                </ul>

                {cs.results && (
                  <div className="p-3 rounded-xl bg-lime-50/50 border border-lime-200 text-[11px] font-medium text-lime-950">
                    <span className="font-bold block mb-0.5">Impact:</span>
                    {cs.results}
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-neutral-100 text-[11px] font-bold text-neutral-400 flex items-center justify-between">
                <span>Integrated in Page 9</span>
                <span className="text-neutral-950">Reusable</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-neutral-950">
                Add New Case Study
              </h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-lg text-neutral-400 hover:text-black"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-1">
                  Project / Solution Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Enterprise Voice AI Deployment"
                  className="w-full px-3 py-2 text-xs font-bold bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-1">
                  Client / Organization Name *
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. Global Tech Partners"
                  className="w-full px-3 py-2 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-1">
                  Industry
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="e.g. Healthcare / Logistics"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-1">
                  Key Bullets
                </label>
                <input
                  type="text"
                  value={bullet1}
                  onChange={(e) => setBullet1(e.target.value)}
                  placeholder="Bullet 1: Architecture deployed"
                  className="w-full px-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none mb-1.5"
                />
                <input
                  type="text"
                  value={bullet2}
                  onChange={(e) => setBullet2(e.target.value)}
                  placeholder="Bullet 2: Automated processes"
                  className="w-full px-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none mb-1.5"
                />
                <input
                  type="text"
                  value={bullet3}
                  onChange={(e) => setBullet3(e.target.value)}
                  placeholder="Bullet 3: Integrations delivered"
                  className="w-full px-3 py-1.5 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-1">
                  Measurable Results / ROI
                </label>
                <input
                  type="text"
                  value={results}
                  onChange={(e) => setResults(e.target.value)}
                  placeholder="e.g. Reduced manual cycle time by 70%"
                  className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setIsAddOpen(false)}
                className="px-4 py-2 text-xs font-bold text-neutral-600 hover:bg-neutral-100 rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleAdd}
                disabled={!title || !clientName}
                className="px-4 py-2 bg-neutral-950 text-[#A3FF38] text-xs font-black rounded-xl hover:bg-black disabled:opacity-50"
              >
                Save Case Study
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
