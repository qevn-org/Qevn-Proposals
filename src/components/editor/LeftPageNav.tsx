'use client';

import React, { useState } from 'react';
import {
  FileText,
  Plus,
  Copy,
  Trash2,
  Eye,
  EyeOff,
  ChevronUp,
  ChevronDown,
  Layers,
  GripVertical
} from 'lucide-react';
import { useProposalStore } from '@/store/proposal-store';
import { ProposalPage } from '@/types/proposal';

interface LeftPageNavProps {
  onAddPageModal: () => void;
}

export function LeftPageNav({ onAddPageModal }: LeftPageNavProps) {
  const {
    activeProposal,
    activePageId,
    setActivePageId,
    duplicatePage,
    deletePage,
    toggleHidePage,
    reorderPages
  } = useProposalStore();

  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  if (!activeProposal) return null;

  const pages = activeProposal.pages;

  const handleDragStart = (e: React.DragEvent, index: number) => {
    setDraggedIndex(index);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', index.toString());
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetIndex: number) => {
    e.preventDefault();
    if (draggedIndex !== null && draggedIndex !== targetIndex) {
      reorderPages(draggedIndex, targetIndex);
    }
    setDraggedIndex(null);
  };

  const handleMoveUp = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (index > 0) {
      reorderPages(index, index - 1);
    }
  };

  const handleMoveDown = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    if (index < pages.length - 1) {
      reorderPages(index, index + 1);
    }
  };

  return (
    <aside className="w-64 border-r border-neutral-200 bg-neutral-50/60 flex flex-col h-[calc(100vh-3.5rem)] select-none shrink-0">
      {/* Header */}
      <div className="p-3.5 border-b border-neutral-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Layers className="w-4 h-4 text-neutral-700" />
          <span className="text-xs font-black uppercase tracking-wider text-neutral-800">
            Pages ({pages.length})
          </span>
        </div>

        <button
          onClick={onAddPageModal}
          className="p-1 px-2 rounded-lg bg-neutral-950 hover:bg-black text-[#A3FF38] text-[11px] font-bold flex items-center gap-1 transition-all shadow-xs"
          title="Add New Page"
        >
          <Plus className="w-3 h-3" />
          <span>Add</span>
        </button>
      </div>

      {/* Page Thumbnails List */}
      <div className="flex-1 overflow-y-auto p-2.5 space-y-2">
        {pages.map((page, idx) => {
          const isActive = page.id === activePageId;
          const isHidden = page.hidden;

          return (
            <div
              key={page.id}
              draggable
              onDragStart={(e) => handleDragStart(e, idx)}
              onDragOver={(e) => handleDragOver(e, idx)}
              onDrop={(e) => handleDrop(e, idx)}
              onClick={() => setActivePageId(page.id)}
              className={`group relative flex items-center gap-2.5 p-2 rounded-xl border transition-all cursor-pointer ${
                isActive
                  ? 'bg-white border-lime-400 ring-2 ring-lime-400/40 shadow-sm'
                  : 'bg-white/70 hover:bg-white border-neutral-200/80 hover:border-neutral-300'
              } ${isHidden ? 'opacity-50' : ''}`}
            >
              {/* Drag Grip Handle */}
              <div className="text-neutral-400 hover:text-neutral-700 cursor-grab active:cursor-grabbing p-0.5">
                <GripVertical className="w-3.5 h-3.5" />
              </div>

              {/* Mini A4 Aspect Thumbnail Representation */}
              <div
                className={`w-9 h-12 rounded border flex flex-col justify-between p-0.5 shrink-0 overflow-hidden shadow-2xs ${
                  isActive ? 'border-lime-500 bg-lime-50/20' : 'border-neutral-200 bg-white'
                }`}
              >
                <div
                  className="w-full h-1.5 rounded-xs"
                  style={{
                    background:
                      page.pageType === 'cover'
                        ? 'linear-gradient(135deg, #A3FF38 0%, #88E714 100%)'
                        : '#A3FF38'
                  }}
                />
                <div className="w-full space-y-0.5 px-0.5 my-auto">
                  <div className="w-3/4 h-0.5 bg-neutral-300 rounded-full" />
                  <div className="w-1/2 h-0.5 bg-neutral-200 rounded-full" />
                </div>
                <div className="w-full h-0.5 bg-lime-400 rounded-xs" />
              </div>

              {/* Page Title & Number */}
              <div className="flex-1 min-w-0 pr-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-[11px] font-black text-neutral-950">
                    {page.pageNumber}.
                  </span>
                  <span className="text-[11.5px] font-bold text-neutral-800 truncate block">
                    {page.title}
                  </span>
                </div>
                <span className="text-[10px] text-neutral-400 uppercase tracking-wider block font-semibold">
                  {page.pageType.replace(/_/g, ' ')}
                </span>
              </div>

              {/* Hover Actions Menu */}
              <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                {/* Move up / down */}
                <div className="flex flex-col">
                  {idx > 0 && (
                    <button
                      onClick={(e) => handleMoveUp(e, idx)}
                      className="p-0.5 text-neutral-400 hover:text-neutral-800"
                      title="Move Up"
                    >
                      <ChevronUp className="w-2.5 h-2.5" />
                    </button>
                  )}
                  {idx < pages.length - 1 && (
                    <button
                      onClick={(e) => handleMoveDown(e, idx)}
                      className="p-0.5 text-neutral-400 hover:text-neutral-800"
                      title="Move Down"
                    >
                      <ChevronDown className="w-2.5 h-2.5" />
                    </button>
                  )}
                </div>

                {/* Hide / Show */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleHidePage(page.id);
                  }}
                  className="p-1 rounded text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100"
                  title={isHidden ? 'Show in export' : 'Hide from export'}
                >
                  {isHidden ? (
                    <EyeOff className="w-3 h-3 text-amber-600" />
                  ) : (
                    <Eye className="w-3 h-3" />
                  )}
                </button>

                {/* Duplicate */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    duplicatePage(page.id);
                  }}
                  className="p-1 rounded text-neutral-400 hover:text-neutral-800 hover:bg-neutral-100"
                  title="Duplicate Page"
                >
                  <Copy className="w-3 h-3" />
                </button>

                {/* Delete */}
                {pages.length > 1 && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (confirm(`Delete page "${page.title}"?`)) {
                        deletePage(page.id);
                      }
                    }}
                    className="p-1 rounded text-neutral-400 hover:text-red-600 hover:bg-red-50"
                    title="Delete Page"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom info banner */}
      <div className="p-3 border-t border-neutral-200 text-center text-[11px] text-neutral-500 font-medium">
        Standard 13-Page QEVN Proposal
      </div>
    </aside>
  );
}
