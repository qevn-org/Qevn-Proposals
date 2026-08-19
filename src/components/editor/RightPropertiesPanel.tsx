'use client';

import React, { useState } from 'react';
import { useProposalStore } from '@/store/proposal-store';
import {
  Sliders,
  Building2,
  FileSpreadsheet,
  Palette,
  Layers,
  BookOpen,
  Plus,
  Trash2,
  Check,
  UploadCloud,
  Sparkles
} from 'lucide-react';
import { BlockType } from '@/types/proposal';

export function RightPropertiesPanel() {
  const {
    activeProposal,
    activePageId,
    selectedBlockId,
    updateClientInfo,
    updateMetadata,
    updateBranding,
    reusableBlocks,
    caseStudies,
    addBlockToPage,
    removeBlockFromPage
  } = useProposalStore();

  const [activeTab, setActiveTab] = useState<'client' | 'meta' | 'page' | 'library'>('client');

  if (!activeProposal) return null;

  const client = activeProposal.client;
  const metadata = activeProposal.metadata;
  const branding = activeProposal.branding;

  const activePage = activeProposal.pages.find((p) => p.id === activePageId);
  const selectedBlock = activePage?.blocks.find((b) => b.id === selectedBlockId);

  const brandPresets = [
    { label: 'QEVN Signature Lime', color: '#A3FF38' },
    { label: 'Electric Mint', color: '#00F5A0' },
    { label: 'Sky Intelligence', color: '#00A3E0' },
    { label: 'Neon Yellow', color: '#FFEB3B' },
    { label: 'Vibrant Orange', color: '#FF6B00' }
  ];

  return (
    <aside className="w-80 border-l border-neutral-200 bg-white flex flex-col h-[calc(100vh-3.5rem)] select-none shrink-0">
      {/* Top Tabs */}
      <div className="flex border-b border-neutral-200 bg-neutral-50/70 p-1">
        <button
          onClick={() => setActiveTab('client')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'client'
              ? 'bg-white text-neutral-950 shadow-xs border border-neutral-200/80'
              : 'text-neutral-500 hover:text-neutral-950'
          }`}
          title="Client Information"
        >
          <Building2 className="w-3.5 h-3.5" />
          <span>Client</span>
        </button>

        <button
          onClick={() => setActiveTab('meta')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'meta'
              ? 'bg-white text-neutral-950 shadow-xs border border-neutral-200/80'
              : 'text-neutral-500 hover:text-neutral-950'
          }`}
          title="Proposal Info"
        >
          <FileSpreadsheet className="w-3.5 h-3.5" />
          <span>Meta</span>
        </button>

        <button
          onClick={() => setActiveTab('page')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'page'
              ? 'bg-white text-neutral-950 shadow-xs border border-neutral-200/80'
              : 'text-neutral-500 hover:text-neutral-950'
          }`}
          title="Page & Block Properties"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Page</span>
        </button>

        <button
          onClick={() => setActiveTab('library')}
          className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
            activeTab === 'library'
              ? 'bg-white text-neutral-950 shadow-xs border border-neutral-200/80'
              : 'text-neutral-500 hover:text-neutral-950'
          }`}
          title="Reusable Content Library"
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Library</span>
        </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 text-neutral-900 text-xs">
        {/* 1. CLIENT TAB */}
        {activeTab === 'client' && (
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-1">
                Client Company Name
              </label>
              <input
                type="text"
                value={client.name}
                onChange={(e) => updateClientInfo({ name: e.target.value })}
                className="w-full px-3 py-2 text-xs font-bold bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                placeholder="e.g. INFINIUM GLOBAL RESEARCH"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-1">
                Client Contact Person
              </label>
              <input
                type="text"
                value={client.contactPerson}
                onChange={(e) =>
                  updateClientInfo({ contactPerson: e.target.value })
                }
                className="w-full px-3 py-2 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                placeholder="e.g. Shrikant"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-1">
                Contact Email
              </label>
              <input
                type="email"
                value={client.email}
                onChange={(e) => updateClientInfo({ email: e.target.value })}
                className="w-full px-3 py-2 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                placeholder="shrikant@infinium.com"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-1">
                Website
              </label>
              <input
                type="url"
                value={client.website || ''}
                onChange={(e) => updateClientInfo({ website: e.target.value })}
                className="w-full px-3 py-2 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                placeholder="https://infiniumglobalresearch.com"
              />
            </div>

            {/* Client Logo URL / Upload */}
            <div>
              <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-1">
                Client Logo (URL or Upload)
              </label>
              <input
                type="text"
                value={client.logo || ''}
                onChange={(e) => updateClientInfo({ logo: e.target.value })}
                className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 mb-2"
                placeholder="Paste Image URL or select file..."
              />

              {/* Upload file directly to base64 for instant preview */}
              <label className="flex items-center justify-center gap-2 p-2.5 border border-dashed border-neutral-300 hover:border-lime-500 rounded-xl cursor-pointer bg-neutral-50/50 transition-colors">
                <UploadCloud className="w-4 h-4 text-neutral-500" />
                <span className="text-[11px] font-bold text-neutral-700">
                  Upload Logo File
                </span>
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (uploadEvent) => {
                        const result = uploadEvent.target?.result as string;
                        if (result) {
                          updateClientInfo({ logo: result });
                        }
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                />
              </label>
            </div>

            {/* Brand Color Theme */}
            <div className="pt-2 border-t border-neutral-200">
              <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-2">
                Brand Accent Theme
              </label>
              <div className="grid grid-cols-5 gap-2">
                {brandPresets.map((preset) => (
                  <button
                    key={preset.color}
                    onClick={() => updateBranding({ primaryColor: preset.color })}
                    className="w-8 h-8 rounded-full border-2 border-white shadow-sm flex items-center justify-center transition-transform hover:scale-110"
                    style={{ backgroundColor: preset.color }}
                    title={preset.label}
                  >
                    {branding.primaryColor === preset.color && (
                      <Check className="w-4 h-4 text-black stroke-[3]" />
                    )}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 2. META TAB */}
        {activeTab === 'meta' && (
          <div className="space-y-4">
            <div>
              <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-1">
                Proposal Title
              </label>
              <textarea
                value={metadata.title}
                onChange={(e) => updateMetadata({ title: e.target.value })}
                className="w-full px-3 py-2 text-xs font-bold bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 resize-none"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-1">
                Proposal Date (e.g. AUGUST 2026)
              </label>
              <input
                type="text"
                value={metadata.proposalDate}
                onChange={(e) => updateMetadata({ proposalDate: e.target.value })}
                className="w-full px-3 py-2 text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-1">
                Presented To
              </label>
              <textarea
                value={metadata.presentedTo}
                onChange={(e) => updateMetadata({ presentedTo: e.target.value })}
                className="w-full px-3 py-2 text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400 resize-none"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-1">
                Presented By
              </label>
              <input
                type="text"
                value={metadata.presentedBy}
                onChange={(e) => updateMetadata({ presentedBy: e.target.value })}
                className="w-full px-3 py-2 text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black text-neutral-700 uppercase tracking-wider mb-1">
                Reference Number
              </label>
              <input
                type="text"
                value={metadata.referenceNumber}
                onChange={(e) => updateMetadata({ referenceNumber: e.target.value })}
                className="w-full px-3 py-2 text-xs font-mono bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>
          </div>
        )}

        {/* 3. PAGE & BLOCK TAB */}
        {activeTab === 'page' && (
          <div className="space-y-4">
            {activePage ? (
              <div className="space-y-4">
                <div className="p-3 bg-neutral-50 rounded-xl border border-neutral-200 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-black uppercase tracking-wider text-neutral-700">
                      Current Page ({activePage.pageNumber})
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-lime-100 text-lime-800 uppercase">
                      {activePage.pageType.replace(/_/g, ' ')}
                    </span>
                  </div>
                  <input
                    type="text"
                    value={activePage.title}
                    onChange={(e) => {
                      activePage.title = e.target.value;
                      useProposalStore.setState({ activeProposal: { ...activeProposal } });
                    }}
                    className="w-full px-2.5 py-1.5 text-xs font-bold bg-white border border-neutral-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                </div>

                {/* Selected Block Info */}
                {selectedBlock ? (
                  <div className="p-3 bg-lime-50/30 rounded-xl border border-lime-300 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-black uppercase tracking-wider text-neutral-900">
                        Selected Block
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">
                        {selectedBlock.type}
                      </span>
                    </div>

                    <p className="text-[11.5px] text-neutral-600">
                      Click directly into the canvas on the left to edit this block&apos;s text and bullets in real-time.
                    </p>

                    <button
                      onClick={() => removeBlockFromPage(activePage.id, selectedBlock.id)}
                      className="w-full py-1.5 px-3 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 border border-red-200 transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove Block</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-4 rounded-xl border border-dashed border-neutral-300 text-center text-neutral-500">
                    <p className="text-xs">Click any section or card on the canvas to select its properties.</p>
                  </div>
                )}
              </div>
            ) : (
              <p className="text-neutral-500">Select a page from the left panel.</p>
            )}
          </div>
        )}

        {/* 4. LIBRARY TAB */}
        {activeTab === 'library' && (
          <div className="space-y-4">
            <div>
              <h4 className="text-[11px] font-black uppercase tracking-wider text-neutral-700 mb-2">
                Reusable Content Blocks
              </h4>
              <div className="space-y-2">
                {reusableBlocks.map((rb) => (
                  <div
                    key={rb.id}
                    className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 hover:bg-neutral-50 space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-neutral-950">
                        {rb.name}
                      </span>
                      <span className="text-[9px] uppercase font-bold text-neutral-500 bg-neutral-200 px-1.5 py-0.5 rounded">
                        {rb.category}
                      </span>
                    </div>
                    {rb.description && (
                      <p className="text-[10.5px] text-neutral-600 line-clamp-2">
                        {rb.description}
                      </p>
                    )}
                    {activePage && (
                      <button
                        onClick={() => addBlockToPage(activePage.id, rb.block)}
                        className="w-full mt-1 py-1 px-2 rounded-lg bg-white hover:bg-neutral-950 hover:text-[#A3FF38] text-neutral-900 border border-neutral-200 text-[11px] font-bold transition-colors flex items-center justify-center gap-1"
                      >
                        <Plus className="w-3 h-3" />
                        <span>Insert into Current Page</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Case Studies Insert */}
            <div className="pt-3 border-t border-neutral-200">
              <h4 className="text-[11px] font-black uppercase tracking-wider text-neutral-700 mb-2">
                Case Study Library
              </h4>
              <div className="space-y-2">
                {caseStudies.map((cs) => (
                  <div
                    key={cs.id}
                    className="p-2.5 rounded-xl border border-neutral-200 bg-neutral-50/50 space-y-1"
                  >
                    <span className="font-bold text-xs text-neutral-950 block">
                      {cs.title}
                    </span>
                    <span className="text-[10px] text-neutral-500 block">
                      {cs.clientName} · {cs.industry}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
