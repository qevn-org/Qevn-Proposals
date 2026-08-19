'use client';

import React from 'react';
import { BlockItem } from '@/types/proposal';

interface ExecutiveSummaryBlockProps {
  block: BlockItem;
  isEditable?: boolean;
  onUpdate?: (data: Record<string, any>) => void;
}

export function ExecutiveSummaryBlock({ block, isEditable, onUpdate }: ExecutiveSummaryBlockProps) {
  const data = block.data || {};
  const heading = data.heading || 'Executive Summary:';
  const paragraphs: string[] = data.paragraphs || [];
  const sections: { title: string; body: string }[] = data.sections || [];

  const handleParagraphChange = (idx: number, text: string) => {
    const updated = [...paragraphs];
    updated[idx] = text;
    onUpdate?.({ paragraphs: updated });
  };

  const handleSectionChange = (idx: number, field: 'title' | 'body', text: string) => {
    const updated = [...sections];
    updated[idx] = { ...updated[idx], [field]: text };
    onUpdate?.({ sections: updated });
  };

  return (
    <div className="flex-1 flex flex-col px-12 py-8 text-neutral-900 leading-relaxed">
      {/* Main Heading */}
      {isEditable ? (
        <input
          type="text"
          value={heading}
          onChange={(e) => onUpdate?.({ heading: e.target.value })}
          className="text-3xl font-extrabold text-neutral-950 tracking-tight mb-6 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none focus:border-lime-500"
        />
      ) : (
        <h2 className="text-3xl font-extrabold text-neutral-950 tracking-tight mb-6">
          {heading}
        </h2>
      )}

      {/* Intro Paragraphs */}
      <div className="space-y-4 text-[13.5px] text-neutral-800 leading-[1.6]">
        {paragraphs.map((p, idx) => (
          <div key={idx}>
            {isEditable ? (
              <textarea
                value={p}
                onChange={(e) => handleParagraphChange(idx, e.target.value)}
                className="w-full text-[13.5px] text-neutral-800 leading-[1.6] bg-transparent border border-dashed border-neutral-200 hover:border-lime-400 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-lime-400 resize-none"
                rows={4}
              />
            ) : (
              <p>{p}</p>
            )}
          </div>
        ))}
      </div>

      {/* Structured Sections (Why Outbound Matters Now, Why QEVN) */}
      <div className="mt-6 space-y-5">
        {sections.map((sec, idx) => (
          <div key={idx} className="space-y-2">
            {isEditable ? (
              <input
                type="text"
                value={sec.title}
                onChange={(e) => handleSectionChange(idx, 'title', e.target.value)}
                className="font-bold text-[15px] text-neutral-950 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none focus:border-lime-500"
              />
            ) : (
              <h3 className="font-bold text-[15px] text-neutral-950 tracking-tight">
                {sec.title}
              </h3>
            )}

            {isEditable ? (
              <textarea
                value={sec.body}
                onChange={(e) => handleSectionChange(idx, 'body', e.target.value)}
                className="w-full text-[13.5px] text-neutral-800 leading-[1.6] whitespace-pre-line bg-transparent border border-dashed border-neutral-200 hover:border-lime-400 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-lime-400 resize-none"
                rows={4}
              />
            ) : (
              <p className="text-[13.5px] text-neutral-800 leading-[1.6] whitespace-pre-line">
                {sec.body}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
