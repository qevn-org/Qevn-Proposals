'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { useProposalStore } from '@/store/proposal-store';
import { AppShell } from '@/components/layout/AppShell';
import { BookmarkPlus, Plus, ArrowRight, Layers, Trash2 } from 'lucide-react';

export default function TemplatesLibraryPage() {
  const router = useRouter();
  const { templates, createProposalFromTemplate, deleteTemplate } = useProposalStore();

  const handleUseTemplate = (templateId: string) => {
    const newId = createProposalFromTemplate(templateId, {
      name: 'New Client Enterprise',
      contactPerson: 'Executive'
    });
    router.push(`/proposals/${newId}`);
  };

  return (
    <AppShell>
      <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider bg-lime-100 text-lime-900 px-2 py-0.5 rounded border border-lime-300">
                MASTER TEMPLATES
              </span>
              <span className="text-xs font-semibold text-neutral-400">·</span>
              <span className="text-xs font-semibold text-neutral-500">
                {templates.length} Available
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              Proposal Templates
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-0.5">
              Launch client-ready proposals in seconds using standardized 13-page structures.
            </p>
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {templates.map((tmpl) => (
            <div
              key={tmpl.id}
              className="bg-white rounded-2xl border border-neutral-200/90 hover:border-lime-400 p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-lime-100 text-lime-900 border border-lime-200">
                    {tmpl.category}
                  </span>
                  <span className="text-xs font-bold text-neutral-400">
                    {tmpl.pagesCount} Pages
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-neutral-950 mb-2">
                  {tmpl.name}
                </h3>
                <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3 mb-4">
                  {tmpl.description}
                </p>

                <div className="flex items-center gap-2 text-[11px] font-semibold text-neutral-500 pb-2">
                  <span>Industry: {tmpl.industry}</span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center justify-between gap-2">
                <button
                  onClick={() => handleUseTemplate(tmpl.id)}
                  className="flex-1 py-2 px-4 rounded-xl bg-neutral-950 hover:bg-black text-[#A3FF38] text-xs font-extrabold transition-all flex items-center justify-center gap-2 shadow-xs"
                >
                  <span>Use This Template</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {!tmpl.isDefault && (
                  <button
                    onClick={() => {
                      if (confirm(`Delete custom template "${tmpl.name}"?`)) {
                        deleteTemplate(tmpl.id);
                      }
                    }}
                    className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete template"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
