'use client';

import React from 'react';
import { BlockItem } from '@/types/proposal';

interface AboutScopeBlockProps {
  block: BlockItem;
  isEditable?: boolean;
  onUpdate?: (data: Record<string, any>) => void;
}

export function AboutScopeBlock({ block, isEditable, onUpdate }: AboutScopeBlockProps) {
  const data = block.data || {};
  const scopeTitle = data.scopeTitle || 'Scope of This Proposal:';
  const scopeItems: string[] = data.scopeItems || [];
  const aboutTitle = data.aboutTitle || 'About Us:';
  const aboutText = data.aboutText || '';
  const whatWeBuildTitle = data.whatWeBuildTitle || 'What We Build:';
  const cards: { title: string; desc: string }[] = data.cards || [];

  const handleScopeItemChange = (idx: number, text: string) => {
    const updated = [...scopeItems];
    updated[idx] = text;
    onUpdate?.({ scopeItems: updated });
  };

  const handleCardChange = (idx: number, field: 'title' | 'desc', text: string) => {
    const updated = [...cards];
    updated[idx] = { ...updated[idx], [field]: text };
    onUpdate?.({ cards: updated });
  };

  return (
    <div className="flex-1 flex flex-col px-12 py-7 text-neutral-900 leading-relaxed">
      {/* 1. Scope Section */}
      <div className="mb-6">
        {isEditable ? (
          <input
            type="text"
            value={scopeTitle}
            onChange={(e) => onUpdate?.({ scopeTitle: e.target.value })}
            className="text-2xl font-extrabold text-neutral-950 tracking-tight mb-3 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none focus:border-lime-500"
          />
        ) : (
          <h2 className="text-2xl font-extrabold text-neutral-950 tracking-tight mb-3">
            {scopeTitle}
          </h2>
        )}

        <ul className="space-y-2 text-[13px] text-neutral-800">
          {scopeItems.map((item, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-neutral-900 font-bold text-base leading-none mt-1">•</span>
              {isEditable ? (
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleScopeItemChange(idx, e.target.value)}
                  className="flex-1 text-[13px] text-neutral-800 bg-transparent border-b border-dashed border-neutral-200 hover:border-lime-400 focus:outline-none focus:border-lime-500"
                />
              ) : (
                <span className="leading-snug">{item}</span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* 2. About Us Section */}
      <div className="mb-6">
        {isEditable ? (
          <input
            type="text"
            value={aboutTitle}
            onChange={(e) => onUpdate?.({ aboutTitle: e.target.value })}
            className="text-xl font-extrabold text-neutral-950 tracking-tight mb-2 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none focus:border-lime-500"
          />
        ) : (
          <h3 className="text-xl font-extrabold text-neutral-950 tracking-tight mb-2">
            {aboutTitle}
          </h3>
        )}

        {isEditable ? (
          <textarea
            value={aboutText}
            onChange={(e) => onUpdate?.({ aboutText: e.target.value })}
            className="w-full text-[13px] text-neutral-800 leading-[1.6] bg-transparent border border-dashed border-neutral-200 hover:border-lime-400 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-lime-400 resize-none"
            rows={3}
          />
        ) : (
          <p className="text-[13px] text-neutral-800 leading-[1.6]">
            {aboutText}
          </p>
        )}
      </div>

      {/* 3. What We Build Section (Grid of 6 cards) */}
      <div>
        {isEditable ? (
          <input
            type="text"
            value={whatWeBuildTitle}
            onChange={(e) => onUpdate?.({ whatWeBuildTitle: e.target.value })}
            className="text-2xl font-extrabold text-neutral-950 tracking-tight mb-3 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none focus:border-lime-500"
          />
        ) : (
          <h3 className="text-2xl font-extrabold text-neutral-950 tracking-tight mb-3">
            {whatWeBuildTitle}
          </h3>
        )}

        <div className="grid grid-cols-2 gap-3">
          {cards.map((card, idx) => (
            <div
              key={idx}
              className="border border-neutral-950 rounded-lg p-3 flex flex-col justify-center bg-white shadow-xs"
            >
              {isEditable ? (
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => handleCardChange(idx, 'title', e.target.value)}
                  className="font-bold text-[13.5px] text-neutral-950 mb-1 bg-transparent border-b border-dashed border-neutral-200 focus:outline-none focus:border-lime-500"
                />
              ) : (
                <h4 className="font-bold text-[13.5px] text-neutral-950 mb-1 leading-snug">
                  {card.title}
                </h4>
              )}

              {isEditable ? (
                <textarea
                  value={card.desc}
                  onChange={(e) => handleCardChange(idx, 'desc', e.target.value)}
                  className="text-[11.5px] text-neutral-700 leading-snug bg-transparent border border-dashed border-neutral-200 focus:outline-none focus:ring-1 focus:ring-lime-400 resize-none"
                  rows={2}
                />
              ) : (
                <p className="text-[11.5px] text-neutral-700 leading-snug">
                  {card.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
