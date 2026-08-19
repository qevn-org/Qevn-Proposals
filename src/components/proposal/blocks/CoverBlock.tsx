'use client';

import React from 'react';
import { BlockItem } from '@/types/proposal';

interface CoverBlockProps {
  block: BlockItem;
  isEditable?: boolean;
  onUpdate?: (data: Record<string, any>) => void;
}

export function CoverBlock({ block, isEditable, onUpdate }: CoverBlockProps) {
  const data = block.data || {};
  const title = data.title || 'AI-Powered Outbound\nGrowth Engine\nProposal';
  const subtitle = data.subtitle || '';
  const preparedFor = data.preparedFor || 'INFINIUM GLOBAL RESEARCH';

  return (
    <div className="flex-1 flex flex-col justify-center items-center text-center px-12 py-16">
      <div className="max-w-xl w-full mx-auto my-auto flex flex-col items-center">
        {/* Main Title */}
        {isEditable ? (
          <textarea
            value={title}
            onChange={(e) => onUpdate?.({ title: e.target.value })}
            className="w-full text-center text-4xl sm:text-[44px] font-bold tracking-tight text-neutral-950 bg-transparent border border-dashed border-neutral-300 hover:border-lime-500 rounded-lg p-2 resize-none focus:outline-none focus:ring-2 focus:ring-lime-400 leading-tight"
            rows={3}
          />
        ) : (
          <h1 className="text-4xl sm:text-[46px] font-bold tracking-tight text-neutral-950 whitespace-pre-line leading-[1.18]">
            {title}
          </h1>
        )}

        {subtitle && (
          <p className="mt-4 text-neutral-600 text-base font-normal max-w-md">
            {subtitle}
          </p>
        )}

        {/* Prepared For Section */}
        <div className="mt-20 flex flex-col items-center">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-neutral-800 uppercase mb-2">
            Prepared for
          </span>
          {isEditable ? (
            <input
              type="text"
              value={preparedFor}
              onChange={(e) => onUpdate?.({ preparedFor: e.target.value })}
              className="text-center text-lg sm:text-xl font-bold tracking-wide text-neutral-950 uppercase bg-transparent border border-dashed border-neutral-300 hover:border-lime-500 rounded px-3 py-1 focus:outline-none focus:ring-2 focus:ring-lime-400"
            />
          ) : (
            <span className="text-lg sm:text-xl font-extrabold tracking-wide text-neutral-950 uppercase">
              {preparedFor}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
