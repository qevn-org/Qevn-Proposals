'use client';

import React from 'react';
import { BlockItem } from '@/types/proposal';

interface BenefitsGridBlockProps {
  block: BlockItem;
  isEditable?: boolean;
  onUpdate?: (data: Record<string, any>) => void;
}

export function BenefitsGridBlock({
  block,
  isEditable,
  onUpdate
}: BenefitsGridBlockProps) {
  const data = block.data || {};
  const headerTitle = data.headerTitle || 'Key Benefits';
  const benefits: { title: string }[] = data.benefits || [];

  const handleBenefitChange = (idx: number, text: string) => {
    const updated = [...benefits];
    updated[idx] = { title: text };
    onUpdate?.({ benefits: updated });
  };

  return (
    <div className="w-full mt-4">
      {/* Header Banner */}
      <div
        className="w-full py-2.5 px-6 rounded-t-xl text-center font-extrabold text-lg text-neutral-950 shadow-xs select-none"
        style={{ background: 'linear-gradient(135deg, #A3FF38 0%, #88E714 100%)' }}
      >
        {isEditable ? (
          <input
            type="text"
            value={headerTitle}
            onChange={(e) => onUpdate?.({ headerTitle: e.target.value })}
            className="text-center font-extrabold text-lg text-neutral-950 bg-transparent border-b border-dashed border-neutral-800 focus:outline-none"
          />
        ) : (
          headerTitle
        )}
      </div>

      {/* Grid of 6 Lime Cards (2 cols x 3 rows) */}
      <div className="grid grid-cols-2 gap-2.5 mt-2.5">
        {benefits.map((b, idx) => (
          <div
            key={idx}
            className="p-3 rounded-lg text-center font-bold text-[13.5px] text-neutral-950 flex items-center justify-center min-h-[46px] shadow-xs"
            style={{ background: 'linear-gradient(135deg, #B8FF5C 0%, #A3FF38 100%)' }}
          >
            {isEditable ? (
              <input
                type="text"
                value={b.title}
                onChange={(e) => handleBenefitChange(idx, e.target.value)}
                className="w-full text-center font-bold text-[13.5px] text-neutral-950 bg-transparent border-b border-dashed border-neutral-600 focus:outline-none"
              />
            ) : (
              <span>{b.title}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
