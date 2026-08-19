'use client';

import React from 'react';
import { ProposalPage, BlockItem, Proposal } from '@/types/proposal';
import { ProposalPageHeader, ProposalPageFooter } from './ProposalPageHeader';
import { CoverBlock } from './blocks/CoverBlock';
import { ExecutiveSummaryBlock } from './blocks/ExecutiveSummaryBlock';
import { AboutScopeBlock } from './blocks/AboutScopeBlock';
import { ChallengeSolutionBlock } from './blocks/ChallengeSolutionBlock';
import { SolutionLayersBlock } from './blocks/SolutionLayersBlock';
import { BenefitsGridBlock } from './blocks/BenefitsGridBlock';
import { InfrastructureBlock } from './blocks/InfrastructureBlock';
import { DevelopmentApproachBlock } from './blocks/DevelopmentApproachBlock';
import { CaseStudyListBlock } from './blocks/CaseStudyListBlock';
import { PricingBlock } from './blocks/PricingBlock';
import { TimelineBlock } from './blocks/TimelineBlock';
import { DeliverablesBlock } from './blocks/DeliverablesBlock';
import { TermsClosingBlock } from './blocks/TermsClosingBlock';
import { RichTextBlock } from './blocks/RichTextBlock';

interface ProposalPageRendererProps {
  page: ProposalPage;
  proposal: Proposal;
  isEditable?: boolean;
  selectedBlockId?: string | null;
  onSelectBlock?: (blockId: string) => void;
  onUpdateBlockData?: (pageId: string, blockId: string, data: Record<string, any>) => void;
  scale?: number;
  className?: string;
}

export function ProposalPageRenderer({
  page,
  proposal,
  isEditable = false,
  selectedBlockId,
  onSelectBlock,
  onUpdateBlockData,
  scale = 1,
  className = ''
}: ProposalPageRendererProps) {
  const isCover = page.pageType === 'cover';
  const client = proposal.client;
  const metadata = proposal.metadata;
  const branding = proposal.branding;

  const renderBlock = (block: BlockItem) => {
    const isSelected = selectedBlockId === block.id;

    const handleUpdate = (data: Record<string, any>) => {
      onUpdateBlockData?.(page.id, block.id, data);
    };

    let BlockComponent: React.ReactNode = null;

    switch (block.type) {
      case 'cover':
        BlockComponent = (
          <CoverBlock
            block={block}
            isEditable={isEditable}
            onUpdate={handleUpdate}
          />
        );
        break;
      case 'executive-summary':
        BlockComponent = (
          <ExecutiveSummaryBlock
            block={block}
            isEditable={isEditable}
            onUpdate={handleUpdate}
          />
        );
        break;
      case 'about-scope':
        BlockComponent = (
          <AboutScopeBlock
            block={block}
            isEditable={isEditable}
            onUpdate={handleUpdate}
          />
        );
        break;
      case 'challenge-solution-table':
        BlockComponent = (
          <ChallengeSolutionBlock
            block={block}
            isEditable={isEditable}
            onUpdate={handleUpdate}
          />
        );
        break;
      case 'solution-layers':
        BlockComponent = (
          <SolutionLayersBlock
            block={block}
            isEditable={isEditable}
            onUpdate={handleUpdate}
          />
        );
        break;
      case 'benefits-grid':
        BlockComponent = (
          <BenefitsGridBlock
            block={block}
            isEditable={isEditable}
            onUpdate={handleUpdate}
          />
        );
        break;
      case 'infrastructure-system':
        BlockComponent = (
          <InfrastructureBlock
            block={block}
            isEditable={isEditable}
            onUpdate={handleUpdate}
          />
        );
        break;
      case 'development-approach':
        BlockComponent = (
          <DevelopmentApproachBlock
            block={block}
            isEditable={isEditable}
            onUpdate={handleUpdate}
          />
        );
        break;
      case 'case-study-list':
        BlockComponent = (
          <CaseStudyListBlock
            block={block}
            isEditable={isEditable}
            onUpdate={handleUpdate}
          />
        );
        break;
      case 'pricing-card':
        BlockComponent = (
          <PricingBlock
            block={block}
            isEditable={isEditable}
            onUpdate={handleUpdate}
          />
        );
        break;
      case 'timeline-table':
        BlockComponent = (
          <TimelineBlock
            block={block}
            isEditable={isEditable}
            onUpdate={handleUpdate}
          />
        );
        break;
      case 'deliverables-checklist':
        BlockComponent = (
          <DeliverablesBlock
            block={block}
            isEditable={isEditable}
            onUpdate={handleUpdate}
          />
        );
        break;
      case 'terms-closing':
        BlockComponent = (
          <TermsClosingBlock
            block={block}
            isEditable={isEditable}
            onUpdate={handleUpdate}
          />
        );
        break;
      case 'rich-text':
      default:
        BlockComponent = (
          <RichTextBlock
            block={block}
            isEditable={isEditable}
            onUpdate={handleUpdate}
          />
        );
        break;
    }

    return (
      <div
        key={block.id}
        onClick={(e) => {
          if (isEditable) {
            e.stopPropagation();
            onSelectBlock?.(block.id);
          }
        }}
        className={`transition-all duration-150 relative ${
          isEditable
            ? `cursor-pointer hover:outline-1 hover:outline-lime-400 ${
                isSelected
                  ? 'ring-2 ring-lime-500 rounded-sm bg-lime-50/10'
                  : ''
              }`
            : ''
        }`}
      >
        {BlockComponent}
      </div>
    );
  };

  return (
    <div
      id={`proposal-page-${page.pageNumber}`}
      data-page-number={page.pageNumber}
      className={`proposal-a4-page bg-white shadow-xl flex flex-col justify-between overflow-hidden relative ${className}`}
      style={{
        width: '794px',
        minWidth: '794px',
        maxWidth: '794px',
        height: '1123px',
        minHeight: '1123px',
        maxHeight: '1123px',
        fontFamily: branding.fontFamily || 'inherit',
        transform: scale !== 1 ? `scale(${scale})` : undefined,
        transformOrigin: 'top center'
      }}
    >
      {/* 1. Header */}
      <ProposalPageHeader
        clientName={client.name}
        clientLogo={client.logo}
        date={metadata.proposalDate}
        primaryColor={branding.primaryColor}
        isCover={isCover}
      />

      {/* 2. Main Content Area */}
      <div className="flex-1 flex flex-col justify-start relative overflow-hidden">
        {page.blocks.map(renderBlock)}
      </div>

      {/* 3. Footer */}
      <ProposalPageFooter
        pageNumber={page.pageNumber}
        isCover={isCover}
        presentedTo={metadata.presentedTo}
        presentedBy={metadata.presentedBy}
        primaryColor={branding.primaryColor}
      />
    </div>
  );
}
