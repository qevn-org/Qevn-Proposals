'use client';

import React from 'react';
import { useProposalStore } from '@/store/proposal-store';
import { AppShell } from '@/components/layout/AppShell';
import { BookOpen, Plus, Sparkles, Layers, Check } from 'lucide-react';

export default function ContentLibraryPage() {
  const { reusableBlocks } = useProposalStore();

  return (
    <AppShell>
      <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider bg-lime-100 text-lime-900 px-2 py-0.5 rounded border border-lime-300">
                REUSABLE CONTENT
              </span>
              <span className="text-xs font-semibold text-neutral-400">·</span>
              <span className="text-xs font-semibold text-neutral-500">
                {reusableBlocks.length} Modular Blocks
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              Content Library
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-0.5">
              Standard QEVN company profiles, service cards, deliverables, and terms ready to insert into any proposal.
            </p>
          </div>
        </div>

        {/* Content Blocks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reusableBlocks.map((rb) => (
            <div
              key={rb.id}
              className="bg-white rounded-2xl border border-neutral-200/90 p-6 flex flex-col justify-between shadow-2xs space-y-4"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded bg-neutral-100 text-neutral-800 border border-neutral-200">
                    Category: {rb.category}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-500">
                    Type: {rb.block.type}
                  </span>
                </div>

                <h3 className="font-extrabold text-base text-neutral-950 mb-1">
                  {rb.name}
                </h3>
                {rb.description && (
                  <p className="text-xs text-neutral-600 mb-3">{rb.description}</p>
                )}

                {/* Data preview snippet */}
                <div className="p-3 rounded-xl bg-neutral-50 border border-neutral-200 text-xs text-neutral-700 font-mono line-clamp-3">
                  {JSON.stringify(rb.block.data, null, 2)}
                </div>
              </div>

              <div className="pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-500">
                <span>Available directly inside the Proposal Editor sidebar</span>
                <span className="text-lime-700 font-black">Active</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
