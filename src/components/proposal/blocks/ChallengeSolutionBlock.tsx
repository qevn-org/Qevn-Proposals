'use client';

import React from 'react';
import { BlockItem } from '@/types/proposal';
import { Plus, Trash2 } from 'lucide-react';

interface ChallengeSolutionBlockProps {
  block: BlockItem;
  isEditable?: boolean;
  onUpdate?: (data: Record<string, any>) => void;
}

export function ChallengeSolutionBlock({
  block,
  isEditable,
  onUpdate
}: ChallengeSolutionBlockProps) {
  const data = block.data || {};
  const title = data.title || 'Understanding INFINIUM GLOBAL :';
  const subtitle =
    data.subtitle ||
    "Based on our analysis of Infinium business model and growth objectives, we've identified five core needs that are critical to achieving scalable outbound growth.";
  const rows: { challenge: string; solution: string }[] = data.rows || [];

  const handleRowChange = (idx: number, field: 'challenge' | 'solution', text: string) => {
    const updated = [...rows];
    updated[idx] = { ...updated[idx], [field]: text };
    onUpdate?.({ rows: updated });
  };

  const handleAddRow = () => {
    const updated = [
      ...rows,
      { challenge: 'New Challenge identified', solution: 'QEVN AI-powered automated solution.' }
    ];
    onUpdate?.({ rows: updated });
  };

  const handleRemoveRow = (idx: number) => {
    const updated = rows.filter((_, i) => i !== idx);
    onUpdate?.({ rows: updated });
  };

  return (
    <div className="flex-1 flex flex-col px-12 py-8 text-neutral-900 leading-relaxed">
      {/* Title & Subtitle */}
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

      {isEditable ? (
        <textarea
          value={subtitle}
          onChange={(e) => onUpdate?.({ subtitle: e.target.value })}
          className="w-full text-[13.5px] text-neutral-700 leading-[1.6] mb-8 bg-transparent border border-dashed border-neutral-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-lime-400 resize-none"
          rows={2}
        />
      ) : (
        <p className="text-[13.5px] text-neutral-700 leading-[1.6] mb-8 max-w-2xl">
          {subtitle}
        </p>
      )}

      {/* Table Section */}
      <div className="w-full flex flex-col">
        {/* Table Header */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div
            className="py-3 px-4 rounded-xl text-center font-extrabold text-sm uppercase tracking-wider text-neutral-950 shadow-xs"
            style={{ background: 'linear-gradient(135deg, #A3FF38 0%, #88E714 100%)' }}
          >
            CHALLENGE
          </div>
          <div
            className="py-3 px-4 rounded-xl text-center font-extrabold text-sm uppercase tracking-wider text-neutral-950 shadow-xs"
            style={{ background: 'linear-gradient(135deg, #A3FF38 0%, #88E714 100%)' }}
          >
            QEVN SOLUTION
          </div>
        </div>

        {/* Table Rows */}
        <div className="divide-y divide-neutral-200 border-b border-neutral-200">
          {rows.map((row, idx) => (
            <div key={idx} className="grid grid-cols-2 gap-6 py-4 items-center group relative">
              {/* Challenge Column */}
              <div className="pr-4">
                {isEditable ? (
                  <textarea
                    value={row.challenge}
                    onChange={(e) => handleRowChange(idx, 'challenge', e.target.value)}
                    className="w-full text-[13px] font-semibold text-neutral-900 bg-transparent border border-dashed border-neutral-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-lime-400 resize-none leading-snug"
                    rows={2}
                  />
                ) : (
                  <span className="text-[13px] font-semibold text-neutral-900 leading-snug">
                    {row.challenge}
                  </span>
                )}
              </div>

              {/* Solution Column */}
              <div className="pl-4 flex items-center justify-between">
                {isEditable ? (
                  <textarea
                    value={row.solution}
                    onChange={(e) => handleRowChange(idx, 'solution', e.target.value)}
                    className="w-full text-[13px] text-neutral-800 bg-transparent border border-dashed border-neutral-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-lime-400 resize-none leading-snug"
                    rows={2}
                  />
                ) : (
                  <span className="text-[13px] text-neutral-800 leading-snug">
                    {row.solution}
                  </span>
                )}

                {isEditable && rows.length > 1 && (
                  <button
                    onClick={() => handleRemoveRow(idx)}
                    className="ml-2 text-neutral-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove row"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {isEditable && (
          <button
            onClick={handleAddRow}
            className="mt-4 self-start inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-neutral-800 bg-lime-100 hover:bg-lime-200 border border-lime-300 rounded-lg transition-colors"
          >
            <Plus className="w-3.5 h-3.5" /> Add Challenge & Solution
          </button>
        )}
      </div>
    </div>
  );
}
