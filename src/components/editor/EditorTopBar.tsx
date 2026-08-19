'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft,
  Undo2,
  Redo2,
  Eye,
  Copy,
  Download,
  BookmarkPlus,
  CheckCircle2,
  Clock,
  Sparkles,
  ZoomIn,
  ZoomOut,
  ChevronDown,
  Printer
} from 'lucide-react';
import { useProposalStore } from '@/store/proposal-store';
import { ProposalStatus } from '@/types/proposal';
import { QevnLogo } from '../brand/QevnLogo';
import { exportProposalToPdf } from '@/lib/pdf-export';

interface EditorTopBarProps {
  onOpenPreview: () => void;
  onOpenDuplicateModal: () => void;
  onOpenSaveTemplateModal: () => void;
}

export function EditorTopBar({
  onOpenPreview,
  onOpenDuplicateModal,
  onOpenSaveTemplateModal
}: EditorTopBarProps) {
  const {
    activeProposal,
    updateMetadata,
    setProposalStatus,
    undo,
    redo,
    undoStack,
    redoStack,
    saveStatus,
    lastSavedAt,
    zoomLevel,
    setZoomLevel
  } = useProposalStore();

  const [isExporting, setIsExporting] = useState(false);
  const [exportProgress, setExportProgress] = useState({ percent: 0, message: '' });
  const [statusMenuOpen, setStatusMenuOpen] = useState(false);

  if (!activeProposal) return null;

  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      await exportProposalToPdf(activeProposal, (percent, message) => {
        setExportProgress({ percent, message });
      });
    } catch (err) {
      console.error('Export failed', err);
      alert('PDF export failed. You can also press Cmd+P / Print to save as PDF.');
    } finally {
      setIsExporting(false);
    }
  };

  const statusColors: Record<ProposalStatus, { bg: string; text: string; label: string }> = {
    draft: { bg: 'bg-amber-500/10 text-amber-600 border-amber-500/20', text: 'text-amber-600', label: 'Draft' },
    internal_review: { bg: 'bg-blue-500/10 text-blue-600 border-blue-500/20', text: 'text-blue-600', label: 'Internal Review' },
    final: { bg: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20', text: 'text-emerald-600', label: 'Final' },
    sent: { bg: 'bg-purple-500/10 text-purple-600 border-purple-500/20', text: 'text-purple-600', label: 'Sent' },
    approved: { bg: 'bg-[#A3FF38]/20 text-black border-[#A3FF38]', text: 'text-black', label: 'Approved' },
    rejected: { bg: 'bg-red-500/10 text-red-600 border-red-500/20', text: 'text-red-600', label: 'Rejected' },
    archived: { bg: 'bg-neutral-500/10 text-neutral-600 border-neutral-500/20', text: 'text-neutral-600', label: 'Archived' }
  };

  const currentStatus = statusColors[activeProposal.status] || statusColors.draft;

  return (
    <header className="h-14 border-b border-neutral-200 bg-white/90 backdrop-blur-md px-4 flex items-center justify-between select-none z-30 sticky top-0">
      {/* Left side: Back to dashboard & Proposal title */}
      <div className="flex items-center gap-3 min-w-0">
        <Link
          href="/dashboard"
          className="p-1.5 rounded-lg text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100 transition-colors"
          title="Back to Dashboard"
        >
          <ArrowLeft className="w-4 h-4" />
        </Link>

        <div className="h-4 w-px bg-neutral-200" />

        <div className="flex items-center gap-2">
          <QevnLogo size="sm" variant="badge" showWordmark={false} />
          <span className="font-extrabold text-sm tracking-tight text-neutral-900 hidden sm:inline">
            Studio
          </span>
        </div>

        <div className="h-4 w-px bg-neutral-200" />

        {/* Client / Title breadcrumb */}
        <div className="flex items-center gap-2 min-w-0">
          <span className="text-xs font-bold text-neutral-950 truncate max-w-[140px]">
            {activeProposal.client.name}
          </span>
          <span className="text-neutral-400 text-xs">/</span>
          <span className="text-xs font-medium text-neutral-600 truncate max-w-[200px] hidden md:inline">
            {activeProposal.metadata.title.replace(/\n/g, ' ')}
          </span>
        </div>
      </div>

      {/* Middle: Undo/Redo, Zoom, Autosave status */}
      <div className="flex items-center gap-2">
        {/* Undo / Redo */}
        <div className="flex items-center bg-neutral-100/80 rounded-lg p-0.5">
          <button
            onClick={undo}
            disabled={undoStack.length === 0}
            className="p-1.5 rounded-md text-neutral-600 hover:text-neutral-950 disabled:opacity-30 disabled:hover:text-neutral-600 hover:bg-white transition-all shadow-2xs disabled:shadow-none"
            title="Undo (Ctrl+Z)"
          >
            <Undo2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={redo}
            disabled={redoStack.length === 0}
            className="p-1.5 rounded-md text-neutral-600 hover:text-neutral-950 disabled:opacity-30 disabled:hover:text-neutral-600 hover:bg-white transition-all shadow-2xs disabled:shadow-none"
            title="Redo (Ctrl+Shift+Z)"
          >
            <Redo2 className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Zoom Controls */}
        <div className="hidden lg:flex items-center bg-neutral-100/80 rounded-lg p-0.5 text-xs text-neutral-700">
          <button
            onClick={() => setZoomLevel(zoomLevel - 10)}
            className="p-1.5 hover:text-black rounded-md hover:bg-white transition-colors"
            title="Zoom Out"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="px-2 font-semibold text-[11px] min-w-[40px] text-center">
            {zoomLevel}%
          </span>
          <button
            onClick={() => setZoomLevel(zoomLevel + 10)}
            className="p-1.5 hover:text-black rounded-md hover:bg-white transition-colors"
            title="Zoom In"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Save Status Badge */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs text-neutral-500 px-2 py-1 bg-neutral-50 rounded-md border border-neutral-100">
          {saveStatus === 'saving' ? (
            <>
              <Clock className="w-3 h-3 text-amber-500 animate-spin" />
              <span className="text-[11px] text-amber-600 font-medium">Saving...</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="w-3 h-3 text-emerald-500" />
              <span className="text-[11px] text-neutral-600 font-medium">
                {lastSavedAt ? `Saved ${lastSavedAt}` : 'Saved'}
              </span>
            </>
          )}
        </div>
      </div>

      {/* Right side: Status dropdown & Main actions */}
      <div className="flex items-center gap-2">
        {/* Status Dropdown */}
        <div className="relative">
          <button
            onClick={() => setStatusMenuOpen(!statusMenuOpen)}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold border transition-colors ${currentStatus.bg}`}
          >
            <span>{currentStatus.label}</span>
            <ChevronDown className="w-3 h-3 opacity-60" />
          </button>

          {statusMenuOpen && (
            <div className="absolute right-0 mt-1.5 w-40 bg-white border border-neutral-200 rounded-xl shadow-lg p-1 z-50 animate-in fade-in zoom-in-95">
              {(
                [
                  'draft',
                  'internal_review',
                  'final',
                  'sent',
                  'approved',
                  'rejected',
                  'archived'
                ] as ProposalStatus[]
              ).map((st) => (
                <button
                  key={st}
                  onClick={() => {
                    setProposalStatus(st);
                    setStatusMenuOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-semibold hover:bg-neutral-100 flex items-center justify-between ${
                    activeProposal.status === st ? 'bg-neutral-100 text-neutral-950 font-bold' : 'text-neutral-700'
                  }`}
                >
                  {statusColors[st].label}
                  {activeProposal.status === st && (
                    <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Duplicate Button */}
        <button
          onClick={onOpenDuplicateModal}
          className="p-1.5 px-2.5 rounded-lg text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 border border-neutral-200 text-xs font-bold transition-colors hidden md:flex items-center gap-1.5"
          title="Duplicate for another client (Ctrl+D)"
        >
          <Copy className="w-3.5 h-3.5" />
          <span>Duplicate</span>
        </button>

        {/* Save as Template */}
        <button
          onClick={onOpenSaveTemplateModal}
          className="p-1.5 px-2.5 rounded-lg text-neutral-700 hover:text-neutral-950 hover:bg-neutral-100 border border-neutral-200 text-xs font-bold transition-colors hidden xl:flex items-center gap-1.5"
          title="Save this proposal as template"
        >
          <BookmarkPlus className="w-3.5 h-3.5" />
          <span>Save as Template</span>
        </button>

        {/* Preview Button */}
        <button
          onClick={onOpenPreview}
          className="p-1.5 px-3 rounded-lg text-neutral-800 hover:text-black hover:bg-neutral-100 border border-neutral-200 text-xs font-bold transition-colors flex items-center gap-1.5"
          title="Full-screen Presentation Preview"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Preview</span>
        </button>

        {/* Export PDF Button */}
        <button
          onClick={handleExportPdf}
          disabled={isExporting}
          className="p-1.5 px-3.5 rounded-lg bg-neutral-950 hover:bg-black text-[#A3FF38] text-xs font-extrabold transition-all shadow-sm flex items-center gap-1.5 hover:shadow-md hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
        >
          {isExporting ? (
            <>
              <div className="w-3.5 h-3.5 border-2 border-[#A3FF38] border-t-transparent rounded-full animate-spin" />
              <span>{exportProgress.message || 'Exporting...'}</span>
            </>
          ) : (
            <>
              <Download className="w-3.5 h-3.5 text-[#A3FF38]" />
              <span>Export PDF</span>
            </>
          )}
        </button>
      </div>
    </header>
  );
}
