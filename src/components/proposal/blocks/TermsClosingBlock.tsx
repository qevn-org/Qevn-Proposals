'use client';

import React from 'react';
import { BlockItem } from '@/types/proposal';

interface TermsClosingBlockProps {
  block: BlockItem;
  isEditable?: boolean;
  onUpdate?: (data: Record<string, any>) => void;
}

export function TermsClosingBlock({
  block,
  isEditable,
  onUpdate
}: TermsClosingBlockProps) {
  const data = block.data || {};
  const termsTitle = data.termsTitle || 'Terms & Assumptions:';
  const terms: string[] = data.terms || [];
  const closingCard = data.closingCard || {};

  const handleTermChange = (idx: number, text: string) => {
    const updated = [...terms];
    updated[idx] = text;
    onUpdate?.({ terms: updated });
  };

  const handleClosingChange = (field: string, text: string) => {
    onUpdate?.({
      closingCard: {
        ...closingCard,
        [field]: text
      }
    });
  };

  return (
    <div className="flex-1 flex flex-col px-12 py-6 text-neutral-900 leading-relaxed justify-between">
      {/* 1. Terms & Assumptions */}
      <div>
        {isEditable ? (
          <input
            type="text"
            value={termsTitle}
            onChange={(e) => onUpdate?.({ termsTitle: e.target.value })}
            className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-3 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none focus:border-lime-500"
          />
        ) : (
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-3">
            {termsTitle}
          </h2>
        )}

        <ul className="space-y-1.5 text-[12px] text-neutral-800 pl-1">
          {terms.map((term, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-neutral-900 font-bold leading-none mt-1">•</span>
              {isEditable ? (
                <textarea
                  value={term}
                  onChange={(e) => handleTermChange(idx, e.target.value)}
                  className="flex-1 text-[12px] text-neutral-800 bg-transparent border border-dashed border-neutral-200 rounded p-1 focus:outline-none focus:ring-1 focus:ring-lime-400 resize-none leading-snug"
                  rows={2}
                />
              ) : (
                <span className="leading-snug">{term}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* 2. Ready to Scale? Hero CTA Card */}
      <div
        className="w-full mt-4 p-6 rounded-2xl text-center flex flex-col items-center justify-center shadow-xs select-none"
        style={{ background: 'linear-gradient(135deg, #B8FF5C 0%, #A3FF38 100%)' }}
      >
        {isEditable ? (
          <input
            type="text"
            value={closingCard.badge || 'Ready to Scale?'}
            onChange={(e) => handleClosingChange('badge', e.target.value)}
            className="text-2xl font-black text-white tracking-tight bg-transparent border-b border-dashed border-white/60 focus:outline-none mb-3 text-center"
          />
        ) : (
          <h3 className="text-2xl font-black text-white tracking-tight mb-3">
            {closingCard.badge || 'Ready to Scale?'}
          </h3>
        )}

        {isEditable ? (
          <textarea
            value={closingCard.leadText || ''}
            onChange={(e) => handleClosingChange('leadText', e.target.value)}
            className="w-full text-center text-[11.5px] text-neutral-900 leading-snug font-medium bg-transparent border border-dashed border-black/20 rounded p-1 mb-2 focus:outline-none resize-none"
            rows={2}
          />
        ) : (
          <p className="text-[11.5px] text-neutral-900 leading-snug font-medium mb-2 max-w-xl">
            {closingCard.leadText}
          </p>
        )}

        {isEditable ? (
          <textarea
            value={closingCard.subText || ''}
            onChange={(e) => handleClosingChange('subText', e.target.value)}
            className="w-full text-center text-[11.5px] text-neutral-900 leading-snug font-medium bg-transparent border border-dashed border-black/20 rounded p-1 mb-4 focus:outline-none resize-none"
            rows={2}
          />
        ) : (
          <p className="text-[11.5px] text-neutral-900 leading-snug font-medium mb-4 max-w-xl">
            {closingCard.subText}
          </p>
        )}

        {isEditable ? (
          <input
            type="text"
            value={closingCard.quote || ''}
            onChange={(e) => handleClosingChange('quote', e.target.value)}
            className="text-center font-extrabold text-white text-[15px] italic bg-transparent border-b border-dashed border-white/60 focus:outline-none mb-4 w-full"
          />
        ) : (
          <p className="font-extrabold text-white text-[15px] italic mb-4">
            {closingCard.quote}
          </p>
        )}

        <div className="text-xs font-bold text-neutral-900 tracking-wide mb-1">
          {closingCard.companyInfo || 'QEVN · www.qevn.in'}
        </div>

        <div className="text-[10px] font-semibold text-neutral-800 tracking-widest uppercase">
          {closingCard.footerLine}
        </div>
      </div>
    </div>
  );
}
