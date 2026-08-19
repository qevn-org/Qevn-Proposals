'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useProposalStore } from '@/store/proposal-store';
import { AppShell } from '@/components/layout/AppShell';
import { ProposalCard } from '@/components/dashboard/ProposalCard';
import { DuplicateModal } from '@/components/editor/EditorModals';
import { Plus, Search, Filter, Layers, FileText } from 'lucide-react';
import { ProposalStatus } from '@/types/proposal';

export default function ProposalsLibraryPage() {
  const { proposals, initDefaultData, loadProposal } = useProposalStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [duplicateTargetId, setDuplicateTargetId] = useState<string | null>(null);

  useEffect(() => {
    initDefaultData();
  }, [initDefaultData]);

  const filteredProposals = proposals.filter((p) => {
    const matchesSearch =
      p.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.metadata.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.metadata.referenceNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'all' ? true : p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <AppShell>
      <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider bg-lime-100 text-lime-900 px-2 py-0.5 rounded border border-lime-300">
                PROPOSALS REPOSITORY
              </span>
              <span className="text-xs font-semibold text-neutral-400">·</span>
              <span className="text-xs font-semibold text-neutral-500">
                {proposals.length} Total
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              All Client Proposals
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-0.5">
              Manage, duplicate, edit, and export your complete client proposal portfolio.
            </p>
          </div>

          <Link
            href="/proposals/new"
            className="py-2.5 px-5 rounded-xl bg-neutral-950 hover:bg-black text-[#A3FF38] font-extrabold text-xs shadow-sm transition-all flex items-center gap-2 self-start md:self-auto"
          >
            <Plus className="w-4 h-4 text-[#A3FF38]" />
            <span>New Proposal</span>
          </Link>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-neutral-200/90 shadow-2xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by client, title, ref..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          </div>

          {/* Status Filter Chips */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            {[
              { id: 'all', label: 'All' },
              { id: 'draft', label: 'Draft' },
              { id: 'internal_review', label: 'In Review' },
              { id: 'final', label: 'Final' },
              { id: 'sent', label: 'Sent' },
              { id: 'approved', label: 'Approved' },
              { id: 'archived', label: 'Archived' }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setStatusFilter(f.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap ${
                  statusFilter === f.id
                    ? 'bg-neutral-950 text-[#A3FF38] shadow-2xs'
                    : 'bg-neutral-100/80 text-neutral-600 hover:text-black hover:bg-neutral-100'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Proposals Grid */}
        {filteredProposals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredProposals.map((proposal) => (
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                onDuplicateClick={(id) => {
                  loadProposal(id);
                  setDuplicateTargetId(id);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-dashed border-neutral-300 p-12 text-center space-y-3">
            <FileText className="w-8 h-8 text-neutral-400 mx-auto" />
            <h3 className="font-extrabold text-sm text-neutral-800">
              No matching proposals
            </h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto">
              Try adjusting your search criteria or create a new proposal from scratch.
            </p>
          </div>
        )}
      </div>

      <DuplicateModal
        isOpen={Boolean(duplicateTargetId)}
        onClose={() => setDuplicateTargetId(null)}
      />
    </AppShell>
  );
}
