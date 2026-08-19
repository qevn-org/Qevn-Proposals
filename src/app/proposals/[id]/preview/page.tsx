'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProposalStore } from '@/store/proposal-store';
import { ProposalPageRenderer } from '@/components/proposal/ProposalPageRenderer';
import { exportProposalToPdf } from '@/lib/pdf-export';
import {
  ArrowLeft,
  Download,
  ChevronLeft,
  ChevronRight,
  Printer,
  Sparkles
} from 'lucide-react';
import { QevnLogo } from '@/components/brand/QevnLogo';

export default function ProposalPreviewPage() {
  const params = useParams();
  const router = useRouter();
  const proposalId = params?.id as string;

  const { initDefaultData, loadProposal, activeProposal } = useProposalStore();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  useEffect(() => {
    initDefaultData();
    loadProposal(proposalId);
  }, [proposalId, initDefaultData, loadProposal]);

  if (!activeProposal) {
    return (
      <div className="min-h-screen bg-neutral-950 text-white flex items-center justify-center">
        <p className="text-xs font-bold text-[#A3FF38]">Loading Proposal Preview...</p>
      </div>
    );
  }

  const pages = activeProposal.pages.filter((p) => !p.hidden);
  const activePage = pages[currentPageIndex] || pages[0];

  const handleExportPdf = async () => {
    setIsExporting(true);
    try {
      await exportProposalToPdf(activeProposal);
    } finally {
      setIsExporting(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between select-none">
      {/* Top Header Bar */}
      <header className="h-16 px-6 border-b border-white/10 bg-neutral-900/80 backdrop-blur-md flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.push(`/proposals/${proposalId}`)}
            className="p-2 rounded-xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors flex items-center gap-1.5 text-xs font-bold"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Editor</span>
          </button>

          <div className="h-4 w-px bg-white/20" />

          <div className="flex items-center gap-2">
            <QevnLogo size="sm" variant="lime" showWordmark={false} />
            <span className="font-extrabold text-sm text-white">
              {activeProposal.client.name}
            </span>
          </div>
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

        {/* Export & Print */}
        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-3.5 py-1.5 rounded-xl border border-white/20 text-white hover:bg-white/10 text-xs font-bold transition-all flex items-center gap-1.5"
            title="Print Dialog"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print</span>
          </button>

          <button
            onClick={handleExportPdf}
            disabled={isExporting}
            className="px-4 py-1.5 rounded-xl bg-[#A3FF38] text-black text-xs font-black hover:bg-[#90e82c] transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Exporting PDF...' : 'Download PDF'}</span>
          </button>
        </div>
      </header>

      {/* Main Viewport */}
      <main className="flex-1 overflow-auto flex items-center justify-center p-8">
        {activePage && (
          <div className="shadow-2xl rounded-xs overflow-hidden transform scale-90 sm:scale-100 transition-transform">
            <ProposalPageRenderer
              page={activePage}
              proposal={activeProposal}
              isEditable={false}
            />
          </div>
        )}
      </main>

      {/* Bottom Thumbnail Strip */}
      <footer className="h-20 border-t border-white/10 bg-neutral-900/80 backdrop-blur-md flex items-center justify-center gap-3 px-6 overflow-x-auto">
        {pages.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setCurrentPageIndex(idx)}
            className={`w-9 h-12 rounded border text-[10px] font-bold flex items-center justify-center transition-all shrink-0 ${
              currentPageIndex === idx
                ? 'border-[#A3FF38] bg-[#A3FF38]/20 text-[#A3FF38] scale-110 shadow-sm'
                : 'border-white/20 text-white/60 hover:border-white/40'
            }`}
          >
            {p.pageNumber}
          </button>
        ))}
      </footer>
    </div>
  );
}
