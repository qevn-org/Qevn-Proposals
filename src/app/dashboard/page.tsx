'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Plus,
  TrendingUp,
  Clock,
  CheckCircle2,
  Send,
  Search,
  Sparkles,
  ArrowRight,
  Layers,
  Building2
} from 'lucide-react';
import { useProposalStore } from '@/store/proposal-store';
import { AppShell } from '@/components/layout/AppShell';
import { ProposalCard } from '@/components/dashboard/ProposalCard';
import { DuplicateModal } from '@/components/editor/EditorModals';

export default function DashboardPage() {
  const router = useRouter();
  const {
    proposals,
    initDefaultData,
    templates,
    createProposalFromTemplate,
    loadProposal
  } = useProposalStore();

  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'draft' | 'sent' | 'approved'>('all');
  const [duplicateTargetId, setDuplicateTargetId] = useState<string | null>(null);

  useEffect(() => {
    initDefaultData();
  }, [initDefaultData]);

  const totalProposals = proposals.length;
  const draftCount = proposals.filter((p) => p.status === 'draft').length;
  const sentCount = proposals.filter((p) => p.status === 'sent').length;
  const approvedCount = proposals.filter((p) => p.status === 'approved').length;

  const filteredProposals = proposals.filter((p) => {
    const matchesSearch =
      p.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.metadata.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      activeFilter === 'all' ? true : p.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const handleTemplateClick = (templateId: string) => {
    const newId = createProposalFromTemplate(templateId, {
      name: 'New Client Enterprise',
      contactPerson: 'Executive'
    });
    router.push(`/proposals/${newId}`);
  };

  return (
    <AppShell>
      <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Top Greeting & Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-lime-100 text-lime-900 border border-lime-300">
                QEVN PROPOSAL OS
              </span>
              <span className="text-xs font-semibold text-neutral-400">·</span>
              <span className="text-xs font-semibold text-neutral-500">
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'short',
                  day: 'numeric'
                })}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              Good evening, Dhruv Pathak
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-0.5">
              Create, customize, and export client-ready 13-page proposals in minutes.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/proposals/new"
              className="py-2.5 px-5 rounded-xl bg-neutral-950 hover:bg-black text-[#A3FF38] font-extrabold text-xs shadow-md transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Plus className="w-4 h-4 text-[#A3FF38]" />
              <span>+ New Proposal</span>
            </Link>
          </div>
        </div>

        {/* Analytics & Metrics Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-bold uppercase tracking-wider">Total Proposals</span>
              <FileText className="w-4 h-4 text-neutral-700" />
            </div>
            <div className="text-3xl font-black text-neutral-950">{totalProposals}</div>
            <p className="text-[11px] text-neutral-500 font-medium">13-page standard proposals</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-bold uppercase tracking-wider">Drafts</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-black text-neutral-950">{draftCount}</div>
            <p className="text-[11px] text-amber-600 font-medium">In editing & customization</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-bold uppercase tracking-wider">Sent to Clients</span>
              <Send className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-3xl font-black text-neutral-950">{sentCount}</div>
            <p className="text-[11px] text-purple-600 font-medium">Delivered proposals</p>
          </div>

          <div className="bg-white p-5 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between text-neutral-500">
              <span className="text-xs font-bold uppercase tracking-wider">Approved</span>
              <CheckCircle2 className="w-4 h-4 text-lime-600" />
            </div>
            <div className="text-3xl font-black text-neutral-950">{approvedCount}</div>
            <p className="text-[11px] text-lime-700 font-medium">Accepted & active deals</p>
          </div>
        </div>

        {/* Prebuilt Templates Quick Launcher */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-black uppercase tracking-wider text-neutral-800">
              Quick Start from Template
            </h2>
            <Link
              href="/templates"
              className="text-xs font-bold text-neutral-600 hover:text-black flex items-center gap-1"
            >
              <span>View all templates</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.slice(0, 3).map((tmpl) => (
              <div
                key={tmpl.id}
                onClick={() => handleTemplateClick(tmpl.id)}
                className="bg-white rounded-2xl border border-neutral-200/90 hover:border-lime-400 p-5 cursor-pointer shadow-2xs hover:shadow-md transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-lime-100 text-lime-900 border border-lime-200">
                      {tmpl.category}
                    </span>
                    <span className="text-xs font-bold text-neutral-400">
                      {tmpl.pagesCount} Pages
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-neutral-950 group-hover:text-black mb-1">
                    {tmpl.name}
                  </h3>
                  <p className="text-xs text-neutral-500 line-clamp-2 leading-relaxed">
                    {tmpl.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-xs font-bold text-neutral-900 group-hover:text-lime-700">
                  <span>Create Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proposals List Section */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-sm font-black uppercase tracking-wider text-neutral-800">
              Recent Proposals ({filteredProposals.length})
            </h2>

            {/* Search & Filter Bar */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search client or title..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs font-medium bg-white border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400 w-52"
                />
              </div>

              <div className="flex items-center bg-neutral-200/70 p-0.5 rounded-xl text-xs font-bold text-neutral-600">
                {(['all', 'draft', 'sent', 'approved'] as const).map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-2.5 py-1 rounded-lg capitalize transition-all ${
                      activeFilter === filter
                        ? 'bg-white text-neutral-950 shadow-2xs'
                        : 'hover:text-neutral-950'
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
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
                No proposals found
              </h3>
              <p className="text-xs text-neutral-500 max-w-sm mx-auto">
                {searchQuery
                  ? 'Try searching for a different keyword or resetting your filter.'
                  : 'Get started by creating your first client proposal.'}
              </p>
              <Link
                href="/proposals/new"
                className="inline-flex items-center gap-1.5 py-2 px-4 rounded-xl bg-neutral-950 text-[#A3FF38] text-xs font-bold hover:bg-black transition-colors"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Proposal</span>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Quick Duplicate Modal */}
      <DuplicateModal
        isOpen={Boolean(duplicateTargetId)}
        onClose={() => setDuplicateTargetId(null)}
      />
    </AppShell>
  );
}
