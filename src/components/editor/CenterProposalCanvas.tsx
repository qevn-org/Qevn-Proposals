'use client';

import React, { useState } from 'react';
import { useProposalStore } from '@/store/proposal-store';
import { ProposalPageRenderer } from '../proposal/ProposalPageRenderer';
import { FileText, Layers, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';

export function CenterProposalCanvas() {
  const {
    activeProposal,
    activePageId,
    setActivePageId,
    selectedBlockId,
    setSelectedBlockId,
    updateBlockData,
    zoomLevel,
    setZoomLevel
  } = useProposalStore();

  const [viewMode, setViewMode] = useState<'single' | 'all'>('single');

  if (!activeProposal) {
    return (
      <div className="flex-1 flex items-center justify-center bg-neutral-100/70 p-8">
        <p className="text-neutral-500 font-medium">No proposal loaded.</p>
      </div>
    );
  }

  const pages = activeProposal.pages;
  const activePageIndex = pages.findIndex((p) => p.id === activePageId);
  const activePage = pages[activePageIndex] || pages[0];

  const handlePrevPage = () => {
    if (activePageIndex > 0) {
      setActivePageId(pages[activePageIndex - 1].id);
    }
  };

  const handleNextPage = () => {
    if (activePageIndex < pages.length - 1) {
      setActivePageId(pages[activePageIndex + 1].id);
    }
  };

  const scaleValue = zoomLevel / 100;

  return (
    <main
      className="flex-1 bg-neutral-200/60 overflow-auto flex flex-col items-center relative h-[calc(100vh-3.5rem)]"
      onClick={() => setSelectedBlockId(null)}
    >
      {/* Floating Canvas View Controls Toolbar */}
      <div className="sticky top-3 z-20 flex items-center gap-2 bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-2xl shadow-lg border border-neutral-200/80 select-none">
        {/* Single Page vs All Pages Mode */}
        <div className="flex items-center bg-neutral-100 p-0.5 rounded-xl">
          <button
            onClick={() => setViewMode('single')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'single'
                ? 'bg-neutral-950 text-[#A3FF38] shadow-xs'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Single Page</span>
          </button>
          <button
            onClick={() => setViewMode('all')}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
              viewMode === 'all'
                ? 'bg-neutral-950 text-[#A3FF38] shadow-xs'
                : 'text-neutral-600 hover:text-black'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>All Pages ({pages.length})</span>
          </button>
        </div>

        {viewMode === 'single' && (
          <div className="flex items-center gap-1 pl-2 border-l border-neutral-200">
            <button
              onClick={handlePrevPage}
              disabled={activePageIndex <= 0}
              className="p-1 rounded-md text-neutral-600 hover:text-black disabled:opacity-30 disabled:hover:text-neutral-600"
              title="Previous Page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <span className="text-xs font-bold text-neutral-800 min-w-[70px] text-center">
              Page {activePage?.pageNumber || 1} of {pages.length}
            </span>
            <button
              onClick={handleNextPage}
              disabled={activePageIndex >= pages.length - 1}
              className="p-1 rounded-md text-neutral-600 hover:text-black disabled:opacity-30 disabled:hover:text-neutral-600"
              title="Next Page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Canvas container with scaled A4 Document */}
      <div className="py-8 px-4 flex flex-col items-center gap-8 w-full max-w-full">
        {viewMode === 'single' ? (
          activePage && (
            <div
              className="transition-transform duration-100 ease-out"
              style={{
                width: `${794 * scaleValue}px`,
                height: `${1123 * scaleValue}px`
              }}
            >
              <ProposalPageRenderer
                page={activePage}
                proposal={activeProposal}
                isEditable={true}
                selectedBlockId={selectedBlockId}
                onSelectBlock={setSelectedBlockId}
                onUpdateBlockData={updateBlockData}
                scale={scaleValue}
              />
            </div>
          )
        ) : (
          pages.map((pg) => (
            <div
              key={pg.id}
              onClick={() => setActivePageId(pg.id)}
              className="transition-transform duration-100 ease-out"
              style={{
                width: `${794 * scaleValue}px`,
                height: `${1123 * scaleValue}px`
              }}
            >
              <ProposalPageRenderer
                page={pg}
                proposal={activeProposal}
                isEditable={true}
                selectedBlockId={selectedBlockId}
                onSelectBlock={setSelectedBlockId}
                onUpdateBlockData={updateBlockData}
                scale={scaleValue}
              />
            </div>
          ))
        )}
      </div>
    </main>
  );
}
