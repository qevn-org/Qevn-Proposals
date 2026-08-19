'use client';

import React, { useState, useEffect } from 'react';
import { useProposalStore } from '@/store/proposal-store';
import { EditorTopBar } from './EditorTopBar';
import { LeftPageNav } from './LeftPageNav';
import { CenterProposalCanvas } from './CenterProposalCanvas';
import { RightPropertiesPanel } from './RightPropertiesPanel';
import {
  DuplicateModal,
  SaveTemplateModal,
  AddPageModal,
  FullPreviewModal
} from './EditorModals';
import { AuthGuard } from '../auth/AuthGuard';

export function ProposalEditorLayout({ proposalId }: { proposalId: string }) {
  const { initDefaultData, loadProposal, activeProposal } = useProposalStore();

  const [isDuplicateOpen, setIsDuplicateOpen] = useState(false);
  const [isSaveTemplateOpen, setIsSaveTemplateOpen] = useState(false);
  const [isAddPageOpen, setIsAddPageOpen] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  useEffect(() => {
    initDefaultData();
    loadProposal(proposalId);
  }, [proposalId, initDefaultData, loadProposal]);

  if (!activeProposal) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-neutral-900 text-white">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#A3FF38] border-t-transparent rounded-full animate-spin" />
          <p className="text-xs font-bold uppercase tracking-widest text-[#A3FF38]">
            Loading Proposal Studio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <AuthGuard>
      <div className="min-h-screen flex flex-col bg-neutral-100 text-neutral-900 overflow-hidden font-sans">
        {/* Top Bar */}
        <EditorTopBar
          onOpenPreview={() => setIsPreviewOpen(true)}
          onOpenDuplicateModal={() => setIsDuplicateOpen(true)}
          onOpenSaveTemplateModal={() => setIsSaveTemplateOpen(true)}
        />

        {/* 3-Panel Main Studio Layout */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel: Pages Navigation & Reordering */}
          <LeftPageNav onAddPageModal={() => setIsAddPageOpen(true)} />

          {/* Center Panel: Live A4 Document Canvas */}
          <CenterProposalCanvas />

          {/* Right Panel: Contextual Properties, Branding & Block Library */}
          <RightPropertiesPanel />
        </div>

        {/* Interactive Modals */}
        <DuplicateModal
          isOpen={isDuplicateOpen}
          onClose={() => setIsDuplicateOpen(false)}
        />

        <SaveTemplateModal
          isOpen={isSaveTemplateOpen}
          onClose={() => setIsSaveTemplateOpen(false)}
        />

        <AddPageModal
          isOpen={isAddPageOpen}
          onClose={() => setIsAddPageOpen(false)}
        />

        <FullPreviewModal
          isOpen={isPreviewOpen}
          onClose={() => setIsPreviewOpen(false)}
        />
      </div>
    </AuthGuard>
  );
}
