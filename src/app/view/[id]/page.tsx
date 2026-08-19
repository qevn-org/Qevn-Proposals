'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useProposalStore } from '@/store/proposal-store';
import { ProposalPageRenderer } from '@/components/proposal/ProposalPageRenderer';
import { exportProposalToPdf } from '@/lib/pdf-export';
import { Download, ChevronLeft, ChevronRight, Printer } from 'lucide-react';
import { QevnLogo } from '@/components/brand/QevnLogo';

export default function PublicProposalViewPage() {
  const params = useParams();
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
        <p className="text-xs font-bold text-[#A3FF38]">Loading Proposal...</p>
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

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col justify-between select-none">
      {/* Top Header */}
      <header className="h-16 px-6 border-b border-white/10 bg-neutral-950/80 backdrop-blur-md flex items-center justify-between z-30 sticky top-0">
        <div className="flex items-center gap-3">
          <QevnLogo size="sm" variant="lime" showWordmark={true} />
          <span className="text-white/40">|</span>
          <span className="text-xs font-semibold text-white/90">
            Prepared for {activeProposal.client.name}
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

        {/* Export PDF */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-xl border border-white/20 text-white hover:bg-white/10 text-xs font-bold transition-all flex items-center gap-1.5"
          >
            <Printer className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Print</span>
          </button>

          <button
            onClick={handleExportPdf}
            disabled={isExporting}
            className="px-4 py-1.5 rounded-xl bg-[#A3FF38] text-black text-xs font-black hover:bg-[#90e82c] transition-all flex items-center gap-1.5 shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Generating...' : 'Download PDF'}</span>
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
      <footer className="h-20 border-t border-white/10 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center gap-3 px-6 overflow-x-auto">
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
      </footer>
    </div>
  );
}
