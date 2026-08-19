'use client';

import React from 'react';
import { BlockItem } from '@/types/proposal';

interface DevelopmentApproachBlockProps {
  block: BlockItem;
  isEditable?: boolean;
  onUpdate?: (data: Record<string, any>) => void;
}

export function DevelopmentApproachBlock({
  block,
  isEditable,
  onUpdate
}: DevelopmentApproachBlockProps) {
  const data = block.data || {};
  const title = data.title || 'Future Product Development';
  const intro =
    data.intro ||
    "Following the successful launch and stabilization of the AI lead generation and mailing infrastructure, QEVN will proceed with building Raochra's requested MVP or prototype product.";
  const approachColumn = data.approachColumn || { header: 'Development Approach', bullets: [] };
  const whatYouGetColumn = data.whatYouGetColumn || { header: 'What you Get', bullets: [] };
  const footerSummary =
    data.footerSummary ||
    'QEVN prioritizes fast execution without compromising quality. Every product we build is designed for future expansion and real-world performance.';

  const handleApproachBulletChange = (idx: number, text: string) => {
    const updated = [...approachColumn.bullets];
    updated[idx] = text;
    onUpdate?.({ approachColumn: { ...approachColumn, bullets: updated } });
  };

  const handleWhatYouGetBulletChange = (idx: number, text: string) => {
    const updated = [...whatYouGetColumn.bullets];
    updated[idx] = text;
    onUpdate?.({ whatYouGetColumn: { ...whatYouGetColumn, bullets: updated } });
  };

  return (
    <div className="flex-1 flex flex-col px-12 py-8 text-neutral-900 leading-relaxed">
      {/* Title */}
      {isEditable ? (
        <input
          type="text"
          value={title}
          onChange={(e) => onUpdate?.({ title: e.target.value })}
          className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-2 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none focus:border-lime-500"
        />
      ) : (
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-2">
          {title}
        </h2>
      )}

      {/* Intro */}
      {isEditable ? (
        <textarea
          value={intro}
          onChange={(e) => onUpdate?.({ intro: e.target.value })}
          className="w-full text-[13px] text-neutral-700 leading-[1.6] mb-8 bg-transparent border border-dashed border-neutral-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-lime-400 resize-none"
          rows={2}
        />
      ) : (
        <p className="text-[13px] text-neutral-700 leading-[1.6] mb-8">{intro}</p>
      )}

      {/* 2-Column Cards */}
      <div className="grid grid-cols-2 gap-6 my-auto">
        {/* Left Column: Development Approach */}
        <div className="flex flex-col rounded-xl overflow-hidden shadow-xs">
          <div
            className="py-3 px-4 text-center font-extrabold text-sm uppercase tracking-wider text-neutral-950"
            style={{ background: 'linear-gradient(135deg, #A3FF38 0%, #88E714 100%)' }}
          >
            {approachColumn.header}
          </div>
          <div
            className="p-5 flex-1 space-y-2.5"
            style={{ background: 'rgba(163, 255, 56, 0.22)' }}
          >
            <ul className="space-y-2 text-[12.5px] text-neutral-900">
              {approachColumn.bullets?.map((b: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-neutral-950 font-bold leading-none mt-1">•</span>
                  {isEditable ? (
                    <input
                      type="text"
                      value={b}
                      onChange={(e) => handleApproachBulletChange(idx, e.target.value)}
                      className="flex-1 text-[12.5px] text-neutral-900 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none"
                    />
                  ) : (
                    <span className="leading-snug">{b}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: What you Get */}
        <div className="flex flex-col rounded-xl overflow-hidden shadow-xs">
          <div
            className="py-3 px-4 text-center font-extrabold text-sm uppercase tracking-wider text-neutral-950"
            style={{ background: 'linear-gradient(135deg, #A3FF38 0%, #88E714 100%)' }}
          >
            {whatYouGetColumn.header}
          </div>
          <div
            className="p-5 flex-1 space-y-2.5"
            style={{ background: 'rgba(163, 255, 56, 0.22)' }}
          >
            <ul className="space-y-2 text-[12.5px] text-neutral-900">
              {whatYouGetColumn.bullets?.map((b: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-neutral-950 font-bold leading-none mt-1">•</span>
                  {isEditable ? (
                    <input
                      type="text"
                      value={b}
                      onChange={(e) => handleWhatYouGetBulletChange(idx, e.target.value)}
                      className="flex-1 text-[12.5px] text-neutral-900 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none"
                    />
                  ) : (
                    <span className="leading-snug">{b}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Summary */}
      <div className="mt-8 pt-4">
        {isEditable ? (
          <textarea
            value={footerSummary}
            onChange={(e) => onUpdate?.({ footerSummary: e.target.value })}
            className="w-full text-[13px] text-neutral-800 leading-[1.6] bg-transparent border border-dashed border-neutral-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-lime-400 resize-none"
            rows={2}
          />
        ) : (
          <p className="text-[13px] text-neutral-800 leading-[1.6]">
            {footerSummary}
          </p>
        )}
      </div>
    </div>
  );
}
