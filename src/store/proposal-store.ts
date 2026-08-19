'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';
import {
  Proposal,
  ProposalPage,
  BlockItem,
  ProposalStatus,
  ClientInfo,
  ProposalMetadata,
  BrandTheme,
  ProposalTemplate,
  ReusableBlock,
  CaseStudy
} from '@/types/proposal';
import {
  DEFAULT_QEVN_PROPOSAL,
  PREBUILT_TEMPLATES,
  PREBUILT_CASE_STUDIES,
  REUSABLE_BLOCK_LIBRARY
} from '@/lib/default-proposal';

interface ProposalStore {
  proposals: Proposal[];
  activeProposal: Proposal | null;
  templates: ProposalTemplate[];
  caseStudies: CaseStudy[];
  reusableBlocks: ReusableBlock[];

  // Editor State
  activePageId: string | null;
  selectedBlockId: string | null;
  saveStatus: 'saved' | 'saving' | 'unsaved' | 'error';
  lastSavedAt: string | null;
  zoomLevel: number; // 50 to 150
  undoStack: Proposal[];
  redoStack: Proposal[];

  // Actions
  initDefaultData: () => void;
  loadProposal: (id: string) => void;
  createProposalFromTemplate: (templateId?: string, clientInfo?: Partial<ClientInfo>, title?: string) => string;
  duplicateProposal: (id: string, newClientName?: string) => string;
  updateProposal: (updater: (proposal: Proposal) => void, saveHistory?: boolean) => void;
  deleteProposal: (id: string) => void;
  setProposalStatus: (status: ProposalStatus) => void;

  // Metadata & Client Actions
  updateClientInfo: (client: Partial<ClientInfo>) => void;
  updateMetadata: (meta: Partial<ProposalMetadata>) => void;
  updateBranding: (branding: Partial<BrandTheme>) => void;

  // Page Actions
  setActivePageId: (pageId: string) => void;
  setSelectedBlockId: (blockId: string | null) => void;
  addPage: (pageType: ProposalPage['pageType'], title?: string, insertAfterIndex?: number) => void;
  duplicatePage: (pageId: string) => void;
  deletePage: (pageId: string) => void;
  reorderPages: (startIndex: number, endIndex: number) => void;
  toggleHidePage: (pageId: string) => void;

  // Block Actions
  updateBlockData: (pageId: string, blockId: string, data: Record<string, any>) => void;
  updateBlockStyle: (pageId: string, blockId: string, style: Record<string, any>) => void;
  addBlockToPage: (pageId: string, block: Omit<BlockItem, 'id'>, insertIndex?: number) => void;
  removeBlockFromPage: (pageId: string, blockId: string) => void;
  reorderBlocks: (pageId: string, startIndex: number, endIndex: number) => void;

  // History Actions
  undo: () => void;
  redo: () => void;
  triggerManualSave: () => void;
  setZoomLevel: (zoom: number) => void;

  // Templates & Reusable blocks
  saveActiveAsTemplate: (name: string, description: string, category: string) => void;
  deleteTemplate: (templateId: string) => void;
  saveReusableBlock: (name: string, category: ReusableBlock['category'], block: BlockItem) => void;
  addCaseStudy: (study: Omit<CaseStudy, 'id'>) => void;
  updateCaseStudy: (id: string, study: Partial<CaseStudy>) => void;
  deleteCaseStudy: (id: string) => void;
}

export const useProposalStore = create<ProposalStore>()(
  persist(
    (set, get) => ({
      proposals: [],
      activeProposal: null,
      templates: PREBUILT_TEMPLATES,
      caseStudies: PREBUILT_CASE_STUDIES,
      reusableBlocks: REUSABLE_BLOCK_LIBRARY,

      activePageId: null,
      selectedBlockId: null,
      saveStatus: 'saved',
      lastSavedAt: null,
      zoomLevel: 100,
      undoStack: [],
      redoStack: [],

      initDefaultData: () => {
        const { proposals } = get();
        if (proposals.length === 0) {
          const now = new Date().toISOString();
          const initialProposal: Proposal = {
            id: 'prop-infinium-sample',
            slug: 'infinium-global-research',
            ...DEFAULT_QEVN_PROPOSAL,
            createdAt: now,
            updatedAt: now
          };
          set({
            proposals: [initialProposal],
            activeProposal: initialProposal,
            activePageId: initialProposal.pages[0]?.id || null,
            lastSavedAt: now
          });
        }
      },

      loadProposal: (id: string) => {
        const { proposals } = get();
        const found = proposals.find((p) => p.id === id);
        if (found) {
          set({
            activeProposal: JSON.parse(JSON.stringify(found)),
            activePageId: found.pages[0]?.id || null,
            selectedBlockId: null,
            undoStack: [],
            redoStack: [],
            saveStatus: 'saved'
          });
        }
      },

      createProposalFromTemplate: (templateId, clientInfo, title) => {
        const { templates } = get();
        const selectedTemplate =
          templates.find((t) => t.id === templateId) || templates[0];

        const newId = `prop-${nanoid(8)}`;
        const now = new Date().toISOString();
        const monthYear = new Date().toLocaleDateString('en-US', {
          month: 'long',
          year: 'numeric'
        }).toUpperCase();

        const baseData = selectedTemplate?.proposalData || DEFAULT_QEVN_PROPOSAL;

        const newProposal: Proposal = {
          id: newId,
          slug: (clientInfo?.name || 'new-proposal')
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-'),
          client: {
            ...baseData.client,
            id: `client-${nanoid(6)}`,
            name: clientInfo?.name || 'New Client',
            contactPerson: clientInfo?.contactPerson || 'Contact Person',
            email: clientInfo?.email || 'contact@client.com',
            website: clientInfo?.website || 'https://client.com',
            industry: clientInfo?.industry || 'Technology',
            location: clientInfo?.location || 'Global',
            logo: clientInfo?.logo || '',
            ...clientInfo
          },
          metadata: {
            ...baseData.metadata,
            title: title || baseData.metadata.title,
            proposalDate: monthYear,
            preparedFor: (clientInfo?.name || 'NEW CLIENT').toUpperCase(),
            presentedTo: `${(clientInfo?.contactPerson || 'Contact').toUpperCase()}\n${(clientInfo?.name || 'Client').toUpperCase()}`,
            presentedBy: 'Qevn',
            referenceNumber: `QEVN-PROP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
            version: 1
          },
          branding: { ...baseData.branding },
          status: 'draft',
          templateId: selectedTemplate?.id,
          pages: baseData.pages.map((p, idx) => ({
            ...p,
            id: `page-${nanoid(6)}`,
            pageNumber: idx + 1,
            blocks: p.blocks.map((b) => ({
              ...b,
              id: `blk-${nanoid(6)}`
            }))
          })),
          createdAt: now,
          updatedAt: now
        };

        set((state) => ({
          proposals: [newProposal, ...state.proposals],
          activeProposal: newProposal,
          activePageId: newProposal.pages[0]?.id || null,
          selectedBlockId: null,
          saveStatus: 'saved',
          lastSavedAt: now
        }));

        return newId;
      },

      duplicateProposal: (id: string, newClientName?: string) => {
        const { proposals } = get();
        const source = proposals.find((p) => p.id === id);
        if (!source) return '';

        const newId = `prop-${nanoid(8)}`;
        const now = new Date().toISOString();
        const clientName = newClientName || `${source.client.name} (Copy)`;

        const duplicated: Proposal = {
          ...JSON.parse(JSON.stringify(source)),
          id: newId,
          slug: clientName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
          client: {
            ...source.client,
            id: `client-${nanoid(6)}`,
            name: clientName
          },
          metadata: {
            ...source.metadata,
            preparedFor: clientName.toUpperCase(),
            referenceNumber: `QEVN-PROP-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
            version: 1
          },
          status: 'draft',
          pages: source.pages.map((p, idx) => ({
            ...p,
            id: `page-${nanoid(6)}`,
            pageNumber: idx + 1,
            blocks: p.blocks.map((b) => ({
              ...b,
              id: `blk-${nanoid(6)}`
            }))
          })),
          createdAt: now,
          updatedAt: now
        };

        set((state) => ({
          proposals: [duplicated, ...state.proposals],
          activeProposal: duplicated,
          activePageId: duplicated.pages[0]?.id || null,
          selectedBlockId: null,
          saveStatus: 'saved',
          lastSavedAt: now
        }));

        return newId;
      },

      updateProposal: (updater, saveHistory = true) => {
        const { activeProposal, undoStack } = get();
        if (!activeProposal) return;

        const prevSnapshot = JSON.parse(JSON.stringify(activeProposal));
        const updated = JSON.parse(JSON.stringify(activeProposal)) as Proposal;
        updater(updated);
        updated.updatedAt = new Date().toISOString();

        set((state) => ({
          activeProposal: updated,
          proposals: state.proposals.map((p) => (p.id === updated.id ? updated : p)),
          undoStack: saveHistory ? [...undoStack.slice(-20), prevSnapshot] : undoStack,
          redoStack: saveHistory ? [] : state.redoStack,
          saveStatus: 'saved',
          lastSavedAt: new Date().toLocaleTimeString()
        }));
      },

      deleteProposal: (id: string) => {
        set((state) => {
          const remaining = state.proposals.filter((p) => p.id !== id);
          return {
            proposals: remaining,
            activeProposal: state.activeProposal?.id === id ? remaining[0] || null : state.activeProposal
          };
        });
      },

      setProposalStatus: (status: ProposalStatus) => {
        const { updateProposal } = get();
        updateProposal((p) => {
          p.status = status;
        });
      },

      updateClientInfo: (clientUpdates) => {
        const { updateProposal } = get();
        updateProposal((p) => {
          p.client = { ...p.client, ...clientUpdates };
          if (clientUpdates.name) {
            p.metadata.preparedFor = clientUpdates.name.toUpperCase();
          }
        });
      },

      updateMetadata: (metaUpdates) => {
        const { updateProposal } = get();
        updateProposal((p) => {
          p.metadata = { ...p.metadata, ...metaUpdates };
        });
      },

      updateBranding: (brandingUpdates) => {
        const { updateProposal } = get();
        updateProposal((p) => {
          p.branding = { ...p.branding, ...brandingUpdates };
        });
      },

      setActivePageId: (pageId: string) => {
        set({ activePageId: pageId, selectedBlockId: null });
      },

      setSelectedBlockId: (blockId: string | null) => {
        set({ selectedBlockId: blockId });
      },

      addPage: (pageType, title = 'New Page', insertAfterIndex) => {
        const { updateProposal, activeProposal } = get();
        if (!activeProposal) return;

        const newPageId = `page-${nanoid(6)}`;
        const newPage: ProposalPage = {
          id: newPageId,
          pageNumber: (activeProposal.pages.length || 0) + 1,
          title: title || 'Custom Page',
          pageType: pageType || 'custom',
          blocks: [
            {
              id: `blk-${nanoid(6)}`,
              type: 'rich-text',
              title: title || 'New Section',
              data: {
                content: '<p>Click here to start editing this section content...</p>'
              }
            }
          ]
        };

        updateProposal((p) => {
          if (typeof insertAfterIndex === 'number' && insertAfterIndex >= 0) {
            p.pages.splice(insertAfterIndex + 1, 0, newPage);
          } else {
            p.pages.push(newPage);
          }
          // Recalculate page numbers
          p.pages.forEach((pg, idx) => {
            pg.pageNumber = idx + 1;
          });
        });

        set({ activePageId: newPageId, selectedBlockId: newPage.blocks[0]?.id || null });
      },

      duplicatePage: (pageId: string) => {
        const { updateProposal, activeProposal } = get();
        if (!activeProposal) return;

        const pageIdx = activeProposal.pages.findIndex((p) => p.id === pageId);
        if (pageIdx === -1) return;

        const targetPage = activeProposal.pages[pageIdx];
        const newPageId = `page-${nanoid(6)}`;
        const clonedPage: ProposalPage = {
          ...JSON.parse(JSON.stringify(targetPage)),
          id: newPageId,
          title: `${targetPage.title} (Copy)`,
          blocks: targetPage.blocks.map((b) => ({
            ...b,
            id: `blk-${nanoid(6)}`
          }))
        };

        updateProposal((p) => {
          p.pages.splice(pageIdx + 1, 0, clonedPage);
          p.pages.forEach((pg, idx) => {
            pg.pageNumber = idx + 1;
          });
        });

        set({ activePageId: newPageId });
      },

      deletePage: (pageId: string) => {
        const { updateProposal, activeProposal } = get();
        if (!activeProposal || activeProposal.pages.length <= 1) return;

        const pageIdx = activeProposal.pages.findIndex((p) => p.id === pageId);
        const nextActiveIdx = Math.max(0, pageIdx - 1);
        const nextActive = activeProposal.pages[nextActiveIdx]?.id;

        updateProposal((p) => {
          p.pages = p.pages.filter((pg) => pg.id !== pageId);
          p.pages.forEach((pg, idx) => {
            pg.pageNumber = idx + 1;
          });
        });

        set({ activePageId: nextActive || null, selectedBlockId: null });
      },

      reorderPages: (startIndex: number, endIndex: number) => {
        const { updateProposal } = get();
        updateProposal((p) => {
          const [moved] = p.pages.splice(startIndex, 1);
          p.pages.splice(endIndex, 0, moved);
          p.pages.forEach((pg, idx) => {
            pg.pageNumber = idx + 1;
          });
        });
      },

      toggleHidePage: (pageId: string) => {
        const { updateProposal } = get();
        updateProposal((p) => {
          const page = p.pages.find((pg) => pg.id === pageId);
          if (page) {
            page.hidden = !page.hidden;
          }
        });
      },

      updateBlockData: (pageId: string, blockId: string, data: Record<string, any>) => {
        const { updateProposal } = get();
        updateProposal((p) => {
          const page = p.pages.find((pg) => pg.id === pageId);
          if (!page) return;
          const block = page.blocks.find((b) => b.id === blockId);
          if (!block) return;
          block.data = { ...block.data, ...data };
        }, false); // Keep keystroke updates responsive
      },

      updateBlockStyle: (pageId: string, blockId: string, style: Record<string, any>) => {
        const { updateProposal } = get();
        updateProposal((p) => {
          const page = p.pages.find((pg) => pg.id === pageId);
          if (!page) return;
          const block = page.blocks.find((b) => b.id === blockId);
          if (!block) return;
          block.style = { ...block.style, ...style };
        });
      },

      addBlockToPage: (pageId: string, blockData, insertIndex) => {
        const { updateProposal } = get();
        const newBlockId = `blk-${nanoid(6)}`;
        const newBlock: BlockItem = {
          ...blockData,
          id: newBlockId
        };

        updateProposal((p) => {
          const page = p.pages.find((pg) => pg.id === pageId);
          if (!page) return;
          if (typeof insertIndex === 'number') {
            page.blocks.splice(insertIndex, 0, newBlock);
          } else {
            page.blocks.push(newBlock);
          }
        });

        set({ selectedBlockId: newBlockId });
      },

      removeBlockFromPage: (pageId: string, blockId: string) => {
        const { updateProposal } = get();
        updateProposal((p) => {
          const page = p.pages.find((pg) => pg.id === pageId);
          if (!page) return;
          page.blocks = page.blocks.filter((b) => b.id !== blockId);
        });
        set({ selectedBlockId: null });
      },

      reorderBlocks: (pageId: string, startIndex: number, endIndex: number) => {
        const { updateProposal } = get();
        updateProposal((p) => {
          const page = p.pages.find((pg) => pg.id === pageId);
          if (!page) return;
          const [moved] = page.blocks.splice(startIndex, 1);
          page.blocks.splice(endIndex, 0, moved);
        });
      },

      undo: () => {
        const { undoStack, activeProposal, redoStack } = get();
        if (undoStack.length === 0 || !activeProposal) return;

        const previous = undoStack[undoStack.length - 1];
        const newUndo = undoStack.slice(0, -1);

        set((state) => ({
          activeProposal: previous,
          proposals: state.proposals.map((p) => (p.id === previous.id ? previous : p)),
          undoStack: newUndo,
          redoStack: [activeProposal, ...redoStack]
        }));
      },

      redo: () => {
        const { redoStack, activeProposal, undoStack } = get();
        if (redoStack.length === 0 || !activeProposal) return;

        const next = redoStack[0];
        const newRedo = redoStack.slice(1);

        set((state) => ({
          activeProposal: next,
          proposals: state.proposals.map((p) => (p.id === next.id ? next : p)),
          undoStack: [...undoStack, activeProposal],
          redoStack: newRedo
        }));
      },

      triggerManualSave: () => {
        set({ saveStatus: 'saving' });
        setTimeout(() => {
          set({
            saveStatus: 'saved',
            lastSavedAt: new Date().toLocaleTimeString()
          });
        }, 300);
      },

      setZoomLevel: (zoom: number) => {
        set({ zoomLevel: Math.max(50, Math.min(150, zoom)) });
      },

      saveActiveAsTemplate: (name, description, category) => {
        const { activeProposal, templates } = get();
        if (!activeProposal) return;

        const newTemplate: ProposalTemplate = {
          id: `template-${nanoid(6)}`,
          name,
          description,
          category: category || 'Custom',
          industry: activeProposal.client.industry || 'General',
          pagesCount: activeProposal.pages.length,
          proposalData: {
            client: { ...activeProposal.client },
            metadata: { ...activeProposal.metadata },
            branding: { ...activeProposal.branding },
            status: 'draft',
            pages: JSON.parse(JSON.stringify(activeProposal.pages))
          }
        };

        set({ templates: [...templates, newTemplate] });
      },

      deleteTemplate: (templateId: string) => {
        set((state) => ({
          templates: state.templates.filter((t) => t.id !== templateId)
        }));
      },

      saveReusableBlock: (name, category, block) => {
        const { reusableBlocks } = get();
        const newBlock: ReusableBlock = {
          id: `reuse-${nanoid(6)}`,
          name,
          category,
          block: JSON.parse(JSON.stringify(block))
        };
        set({ reusableBlocks: [...reusableBlocks, newBlock] });
      },

      addCaseStudy: (study) => {
        const newStudy: CaseStudy = {
          id: `cs-${nanoid(6)}`,
          ...study
        };
        set((state) => ({ caseStudies: [newStudy, ...state.caseStudies] }));
      },

      updateCaseStudy: (id, updates) => {
        set((state) => ({
          caseStudies: state.caseStudies.map((cs) =>
            cs.id === id ? { ...cs, ...updates } : cs
          )
        }));
      },

      deleteCaseStudy: (id) => {
        set((state) => ({
          caseStudies: state.caseStudies.filter((cs) => cs.id !== id)
        }));
      }
    }),
    {
      name: 'qevn_proposal_studio_storage',
      partialize: (state) => ({
        proposals: state.proposals,
        templates: state.templates,
        caseStudies: state.caseStudies,
        reusableBlocks: state.reusableBlocks
      })
    }
  )
);
