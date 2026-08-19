'use client';

import React, { useState } from 'react';
import { useProposalStore } from '@/store/proposal-store';
import { useRouter } from 'next/navigation';
import {
  X,
  Copy,
  BookmarkPlus,
  Plus,
  FileText,
  Check,
  Download,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Printer
} from 'lucide-react';
import { ProposalPageRenderer } from '../proposal/ProposalPageRenderer';
import { exportProposalToPdf } from '@/lib/pdf-export';
import { ProposalPage } from '@/types/proposal';

/* 1. DUPLICATE PROPOSAL MODAL */
export function DuplicateModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { activeProposal, duplicateProposal } = useProposalStore();
  const router = useRouter();
  const [newClientName, setNewClientName] = useState('');

  if (!isOpen || !activeProposal) return null;

  const handleDuplicate = () => {
    const clientName = newClientName.trim() || `${activeProposal.client.name} (Copy)`;
    const newId = duplicateProposal(activeProposal.id, clientName);
    onClose();
    if (newId) {
      router.push(`/proposals/${newId}`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-lime-100 text-lime-800">
              <Copy className="w-4 h-4" />
            </div>
            <h3 className="text-base font-extrabold text-neutral-950">
              Duplicate Proposal
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-black hover:bg-neutral-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
          Clone all 13 pages, sections, and pricing of &ldquo;{activeProposal.client.name}&rdquo; for a new client in one click.
        </p>

        <div className="space-y-3 mb-6">
          <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider">
            New Client Name
          </label>
          <input
            type="text"
            value={newClientName}
            onChange={(e) => setNewClientName(e.target.value)}
            placeholder="e.g. Acme Corporation"
            className="w-full px-3.5 py-2.5 text-xs font-bold bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
            autoFocus
          />
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-700 hover:bg-neutral-100"
          >
            Cancel
          </button>
          <button
            onClick={handleDuplicate}
            className="px-4 py-2 rounded-xl bg-neutral-950 hover:bg-black text-[#A3FF38] text-xs font-extrabold shadow-sm transition-all flex items-center gap-1.5"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Create Duplicate</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* 2. SAVE AS TEMPLATE MODAL */
export function SaveTemplateModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { activeProposal, saveActiveAsTemplate } = useProposalStore();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Custom');

  if (!isOpen || !activeProposal) return null;

  const handleSave = () => {
    if (!name.trim()) return;
    saveActiveAsTemplate(name, description, category);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-lime-100 text-lime-800">
              <BookmarkPlus className="w-4 h-4" />
            </div>
            <h3 className="text-base font-extrabold text-neutral-950">
              Save as Template
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-black hover:bg-neutral-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-xs text-neutral-600 mb-4 leading-relaxed">
          Store this proposal structure, styling, and block sequence into your organization&apos;s template library for future reuse.
        </p>

        <div className="space-y-3.5 mb-6">
          <div>
            <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-1">
              Template Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Enterprise AI Outbound Template"
              className="w-full px-3.5 py-2 text-xs font-bold bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
              autoFocus
            />
          </div>

          <div>
            <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
            >
              <option value="Lead Generation">Lead Generation</option>
              <option value="Voice & Calling AI">Voice & Calling AI</option>
              <option value="SaaS & Product">SaaS & Product</option>
              <option value="Custom">Custom</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Short description of when to use this template..."
              className="w-full px-3.5 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400 resize-none"
              rows={2}
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs font-bold text-neutral-700 hover:bg-neutral-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!name.trim()}
            className="px-4 py-2 rounded-xl bg-neutral-950 hover:bg-black text-[#A3FF38] text-xs font-extrabold shadow-sm transition-all disabled:opacity-50"
          >
            Save Template
          </button>
        </div>
      </div>
    </div>
  );
}

/* 3. ADD PAGE MODAL */
export function AddPageModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { addPage } = useProposalStore();

  if (!isOpen) return null;

  const pageTypes: { type: ProposalPage['pageType']; title: string; desc: string }[] = [
    {
      type: 'custom',
      title: 'Blank Rich Text Page',
      desc: 'Free-form page with rich heading and paragraph blocks'
    },
    {
      type: 'understanding_client',
      title: 'Challenge → Solution Table',
      desc: 'Connect client challenges with QEVN automated solutions'
    },
    {
      type: 'case_studies',
      title: 'Case Studies Page',
      desc: 'Showcase real client results, technologies, and achievements'
    },
    {
      type: 'pricing',
      title: 'Pricing Plan Page',
      desc: 'Subscription or one-time pricing with included features list'
    },
    {
      type: 'timeline',
      title: 'Project Timeline Table',
      desc: 'Weekly milestone schedule and deliverables matrix'
    },
    {
      type: 'deliverables',
      title: 'Deliverables Checklist',
      desc: 'Grouped checklist of all deliverables and scope items'
    }
  ];

  const handleSelect = (pageType: ProposalPage['pageType'], title: string) => {
    addPage(pageType, title);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 animate-in fade-in zoom-in-95">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-lime-100 text-lime-800">
              <Plus className="w-4 h-4" />
            </div>
            <h3 className="text-base font-extrabold text-neutral-950">
              Add New Proposal Page
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-neutral-400 hover:text-black hover:bg-neutral-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          {pageTypes.map((pt) => (
            <button
              key={pt.type}
              onClick={() => handleSelect(pt.type, pt.title)}
              className="p-3.5 rounded-xl border border-neutral-200 hover:border-lime-400 bg-neutral-50/50 hover:bg-lime-50/30 text-left transition-all group"
            >
              <span className="font-bold text-xs text-neutral-950 block mb-1 group-hover:text-lime-900">
                {pt.title}
              </span>
              <span className="text-[11px] text-neutral-500 block leading-snug">
                {pt.desc}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* 4. FULL SCREEN PRESENTATION PREVIEW MODAL */
export function FullPreviewModal({
  isOpen,
  onClose
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { activeProposal } = useProposalStore();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  if (!isOpen || !activeProposal) return null;

  const pages = activeProposal.pages.filter((p) => !p.hidden);
  const activePage = pages[currentPageIndex] || pages[0];

  const handleExport = async () => {
    setIsExporting(true);
    try {
      await exportProposalToPdf(activeProposal);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex flex-col items-center justify-between text-white select-none">
      {/* Top Floating Nav */}
      <div className="w-full h-16 px-6 flex items-center justify-between border-b border-white/10 bg-neutral-900/60">
        <div className="flex items-center gap-3">
          <span className="font-extrabold text-sm text-[#A3FF38]">
            QEVN Presentation Preview
          </span>
          <span className="text-white/40">|</span>
          <span className="text-xs font-semibold text-white/80">
            {activeProposal.client.name}
          </span>
        </div>

        {/* Page Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setCurrentPageIndex((prev) => Math.max(0, prev - 1))}
            disabled={currentPageIndex <= 0}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-xs font-bold text-white px-2">
            Page {currentPageIndex + 1} of {pages.length}
          </span>
          <button
            onClick={() =>
              setCurrentPageIndex((prev) => Math.min(pages.length - 1, prev + 1))
            }
            disabled={currentPageIndex >= pages.length - 1}
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 disabled:opacity-30"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Export & Close */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="px-3.5 py-1.5 rounded-xl bg-[#A3FF38] text-black text-xs font-black hover:bg-[#92eb2c] transition-all flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting...' : 'Export PDF'}</span>
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-white/80 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Center Viewport */}
      <div className="flex-1 w-full overflow-auto flex items-center justify-center p-6">
        {activePage && (
          <div className="shadow-2xl rounded-sm overflow-hidden scale-90 sm:scale-100 transition-transform">
            <ProposalPageRenderer
              page={activePage}
              proposal={activeProposal}
              isEditable={false}
            />
          </div>
        )}
      </div>

      {/* Bottom Thumbnail Strip */}
      <div className="w-full h-20 border-t border-white/10 bg-neutral-900/60 flex items-center justify-center gap-3 px-6 overflow-x-auto">
        {pages.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setCurrentPageIndex(idx)}
            className={`w-9 h-12 rounded border text-[10px] font-bold flex items-center justify-center transition-all shrink-0 ${
              currentPageIndex === idx
                ? 'border-[#A3FF38] bg-[#A3FF38]/20 text-[#A3FF38] scale-110'
                : 'border-white/20 text-white/60 hover:border-white/40'
            }`}
          >
            {p.pageNumber}
          </button>
        ))}
      </div>
    </div>
  );
}
