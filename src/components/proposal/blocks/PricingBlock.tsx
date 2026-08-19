'use client';

import React from 'react';
import { BlockItem } from '@/types/proposal';

interface PricingBlockProps {
  block: BlockItem;
  isEditable?: boolean;
  onUpdate?: (data: Record<string, any>) => void;
}

export function PricingBlock({
  block,
  isEditable,
  onUpdate
}: PricingBlockProps) {
  const data = block.data || {};
  const pageTitle = data.pageTitle || 'Pricing';
  const billingType = data.billingType || 'MONTHLY SUBSCRIPTION';
  const price = data.price || '$ 600';
  const period = data.period || 'per month';
  const includedTitle = data.includedTitle || 'Everything Included:';
  const includedItems: string[] = data.includedItems || [];
  const infraTitle = data.infraTitle || 'Infrastructure Included:';
  const infraDescription =
    data.infraDescription ||
    'Your subscription covers all operational infrastructure and third-party API costs:';
  const infraItems: string[] = data.infraItems || [];
  const infraNotice =
    data.infraNotice ||
    'Platform maintenance and updates are included at no additional cost for the duration of your active subscription.';

  const handleIncludedChange = (idx: number, text: string) => {
    const updated = [...includedItems];
    updated[idx] = text;
    onUpdate?.({ includedItems: updated });
  };

  const handleInfraChange = (idx: number, text: string) => {
    const updated = [...infraItems];
    updated[idx] = text;
    onUpdate?.({ infraItems: updated });
  };

  return (
    <div className="flex-1 flex flex-col px-12 py-7 text-neutral-900 leading-relaxed">
      {/* Title */}
      {isEditable ? (
        <input
          type="text"
          value={pageTitle}
          onChange={(e) => onUpdate?.({ pageTitle: e.target.value })}
          className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-4 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none focus:border-lime-500"
        />
      ) : (
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-4">
          {pageTitle}
        </h2>
      )}

      {/* 1. Hero Pricing Box */}
      <div
        className="w-full py-4 px-6 rounded-2xl text-center flex flex-col items-center justify-center shadow-xs mb-4 select-none"
        style={{ background: 'linear-gradient(135deg, #B8FF5C 0%, #A3FF38 100%)' }}
      >
        {isEditable ? (
          <input
            type="text"
            value={billingType}
            onChange={(e) => onUpdate?.({ billingType: e.target.value })}
            className="text-center font-black text-sm tracking-wider uppercase text-neutral-950 bg-transparent border-b border-dashed border-neutral-700 focus:outline-none mb-1"
          />
        ) : (
          <span className="font-black text-sm tracking-wider uppercase text-neutral-950 mb-1">
            {billingType}
          </span>
        )}

        <div className="flex items-baseline justify-center gap-1.5 my-0.5">
          {isEditable ? (
            <input
              type="text"
              value={price}
              onChange={(e) => onUpdate?.({ price: e.target.value })}
              className="text-center text-4xl font-black tracking-tight text-neutral-950 bg-transparent border-b border-dashed border-neutral-700 focus:outline-none w-36"
            />
          ) : (
            <span className="text-4xl font-black tracking-tight text-neutral-950">
              {price}
            </span>
          )}
        </div>

        {isEditable ? (
          <input
            type="text"
            value={period}
            onChange={(e) => onUpdate?.({ period: e.target.value })}
            className="text-center text-sm font-semibold text-neutral-900 bg-transparent border-b border-dashed border-neutral-600 focus:outline-none"
          />
        ) : (
          <span className="text-sm font-semibold text-neutral-900">{period}</span>
        )}
      </div>

      {/* 2. Everything Included Box */}
      <div
        className="w-full p-4 rounded-2xl shadow-xs mb-4"
        style={{ background: 'linear-gradient(135deg, #B8FF5C 0%, #A3FF38 100%)' }}
      >
        <h3 className="font-extrabold text-base text-neutral-950 mb-2">
          {includedTitle}
        </h3>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] text-neutral-950 font-medium">
          {includedItems.map((item, idx) => (
            <div key={idx} className="flex items-start gap-1.5">
              <span className="text-neutral-950 font-bold leading-none mt-1">•</span>
              {isEditable ? (
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleIncludedChange(idx, e.target.value)}
                  className="flex-1 text-[12px] text-neutral-950 bg-transparent border-b border-dashed border-neutral-500 focus:outline-none"
                />
              ) : (
                <span className="leading-snug">{item}</span>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 3. Infrastructure Included Box */}
      <div
        className="w-full p-4 rounded-2xl shadow-xs"
        style={{ background: 'linear-gradient(135deg, #B8FF5C 0%, #A3FF38 100%)' }}
      >
        <h3 className="font-extrabold text-base text-neutral-950 mb-1">
          {infraTitle}
        </h3>
        <p className="text-[11.5px] text-neutral-900 font-semibold mb-2">
          {infraDescription}
        </p>

        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-[12px] text-neutral-950 font-medium mb-3">
          {infraItems.map((item, idx) => (
            <div key={idx} className="flex items-start gap-1.5">
              <span className="text-neutral-950 font-bold leading-none mt-1">•</span>
              {isEditable ? (
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleInfraChange(idx, e.target.value)}
                  className="flex-1 text-[12px] text-neutral-950 bg-transparent border-b border-dashed border-neutral-500 focus:outline-none"
                />
              ) : (
                <span className="leading-snug">{item}</span>
              )}
            </div>
          ))}
        </div>

        <p className="text-[11px] text-neutral-800 font-medium leading-snug pt-1 border-t border-black/10">
          {infraNotice}
        </p>
      </div>
    </div>
  );
}
