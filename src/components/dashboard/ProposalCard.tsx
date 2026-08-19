'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  FileText,
  Copy,
  Download,
  Eye,
  Trash2,
  MoreVertical,
  ExternalLink,
  Clock,
  Layers
} from 'lucide-react';
import { Proposal, ProposalStatus } from '@/types/proposal';
import { useProposalStore } from '@/store/proposal-store';
import { exportProposalToPdf } from '@/lib/pdf-export';

interface ProposalCardProps {
  proposal: Proposal;
  onDuplicateClick?: (proposalId: string) => void;
}

export function ProposalCard({ proposal, onDuplicateClick }: ProposalCardProps) {
  const router = useRouter();
  const { deleteProposal, duplicateProposal } = useProposalStore();
  const [isExporting, setIsExporting] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const statusBadges: Record<
    ProposalStatus,
    { label: string; bg: string; text: string; dot: string }
  > = {
    draft: { label: 'Draft', bg: 'bg-amber-50', text: 'text-amber-700 border-amber-200', dot: 'bg-amber-500' },
    internal_review: { label: 'In Review', bg: 'bg-blue-50', text: 'text-blue-700 border-blue-200', dot: 'bg-blue-500' },
    final: { label: 'Final', bg: 'bg-emerald-50', text: 'text-emerald-700 border-emerald-200', dot: 'bg-emerald-500' },
    sent: { label: 'Sent', bg: 'bg-purple-50', text: 'text-purple-700 border-purple-200', dot: 'bg-purple-500' },
    approved: { label: 'Approved', bg: 'bg-lime-50', text: 'text-lime-900 border-lime-300', dot: 'bg-lime-500' },
    rejected: { label: 'Rejected', bg: 'bg-red-50', text: 'text-red-700 border-red-200', dot: 'bg-red-500' },
    archived: { label: 'Archived', bg: 'bg-neutral-100', text: 'text-neutral-600 border-neutral-200', dot: 'bg-neutral-400' }
  };

  const status = statusBadges[proposal.status] || statusBadges.draft;

  const handleExport = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setIsExporting(true);
    try {
      await exportProposalToPdf(proposal);
    } finally {
      setIsExporting(false);
    }
  };

  const handleQuickDuplicate = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (onDuplicateClick) {
      onDuplicateClick(proposal.id);
    } else {
      const newId = duplicateProposal(proposal.id);
      if (newId) router.push(`/proposals/${newId}`);
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (confirm(`Are you sure you want to delete proposal for "${proposal.client.name}"?`)) {
      deleteProposal(proposal.id);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-neutral-200/90 hover:border-lime-400 p-5 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group relative">
      <div>
        {/* Top Header: Client Logo/Initial & Status */}
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {proposal.client.logo ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={proposal.client.logo}
                alt={proposal.client.name}
                className="w-10 h-10 object-contain rounded-xl border border-neutral-100 p-1 bg-neutral-50"
              />
            ) : (
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-[#A3FF38] font-black text-sm flex items-center justify-center border border-black/10">
                {proposal.client.name.substring(0, 2).toUpperCase()}
              </div>
            )}

            <div>
              <h3 className="font-extrabold text-sm text-neutral-950 tracking-tight group-hover:text-black">
                {proposal.client.name}
              </h3>
              <p className="text-[11px] font-semibold text-neutral-500">
                {proposal.metadata.proposalDate || 'August 2026'}
              </p>
            </div>
          </div>

          <div
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${status.bg} ${status.text}`}
          >
            <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
            <span>{status.label}</span>
          </div>
        </div>

        {/* Proposal Title */}
        <Link href={`/proposals/${proposal.id}`} className="block mb-4">
          <h4 className="text-xs font-bold text-neutral-800 line-clamp-2 leading-snug group-hover:text-black">
            {proposal.metadata.title.replace(/\n/g, ' ')}
          </h4>
        </Link>

        {/* Meta details */}
        <div className="flex items-center gap-4 text-[11px] text-neutral-500 font-medium pt-3 border-t border-neutral-100">
          <div className="flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-neutral-400" />
            <span>{proposal.pages.length} Pages</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-neutral-400" />
            <span>Ref: {proposal.metadata.referenceNumber || 'QEVN-001'}</span>
          </div>
        </div>
      </div>

      {/* Action Buttons Toolbar */}
      <div className="flex items-center justify-between gap-2 mt-5 pt-3 border-t border-neutral-100">
        <Link
          href={`/proposals/${proposal.id}`}
          className="flex-1 py-1.5 px-3 rounded-xl bg-neutral-950 hover:bg-black text-[#A3FF38] text-xs font-extrabold text-center transition-all shadow-xs"
        >
          Open Editor
        </Link>

        <button
          onClick={handleQuickDuplicate}
          className="p-2 rounded-xl text-neutral-600 hover:text-black hover:bg-neutral-100 border border-neutral-200 transition-colors"
          title="Duplicate Proposal"
        >
          <Copy className="w-3.5 h-3.5" />
        </button>

        <Link
          href={`/proposals/${proposal.id}/preview`}
          className="p-2 rounded-xl text-neutral-600 hover:text-black hover:bg-neutral-100 border border-neutral-200 transition-colors"
          title="Preview Proposal"
        >
          <Eye className="w-3.5 h-3.5" />
        </Link>

        <button
          onClick={handleExport}
          disabled={isExporting}
          className="p-2 rounded-xl text-neutral-600 hover:text-black hover:bg-neutral-100 border border-neutral-200 transition-colors"
          title="Export PDF"
        >
          <Download className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={handleDelete}
          className="p-2 rounded-xl text-neutral-400 hover:text-red-600 hover:bg-red-50 transition-colors"
          title="Delete Proposal"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
