'use client';

import React from 'react';
import { BlockItem } from '@/types/proposal';

interface DeliverablesBlockProps {
  block: BlockItem;
  isEditable?: boolean;
  onUpdate?: (data: Record<string, any>) => void;
}

export function DeliverablesBlock({
  block,
  isEditable,
  onUpdate
}: DeliverablesBlockProps) {
  const data = block.data || {};
  const title = data.title || 'Deliverables:';
  const intro =
    data.intro ||
    'A complete checklist of everything Raochra receives as part of this engagement:';
  const groups: { groupName: string; items: string[] }[] = data.groups || [];

  const handleGroupTitleChange = (groupIdx: number, text: string) => {
    const updated = [...groups];
    updated[groupIdx] = { ...updated[groupIdx], groupName: text };
    onUpdate?.({ groups: updated });
  };

  const handleItemChange = (groupIdx: number, itemIdx: number, text: string) => {
    const updated = [...groups];
    const items = [...updated[groupIdx].items];
    items[itemIdx] = text;
    updated[groupIdx].items = items;
    onUpdate?.({ groups: updated });
  };

  return (
    <div className="flex-1 flex flex-col px-12 py-7 text-neutral-900 leading-relaxed">
      {/* Title & Intro */}
      {isEditable ? (
        <input
          type="text"
          value={title}
          onChange={(e) => onUpdate?.({ title: e.target.value })}
          className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-1 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none focus:border-lime-500"
        />
      ) : (
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-1">
          {title}
        </h2>
      )}

      {isEditable ? (
        <input
          type="text"
          value={intro}
          onChange={(e) => onUpdate?.({ intro: e.target.value })}
          className="w-full text-[13px] text-neutral-700 mb-5 bg-transparent border-b border-dashed border-neutral-200 focus:outline-none"
        />
      ) : (
        <p className="text-[13px] text-neutral-700 mb-5">{intro}</p>
      )}

      {/* 4 Categorized Groups */}
      <div className="space-y-4">
        {groups.map((grp, gIdx) => (
          <div key={gIdx} className="space-y-1">
            {isEditable ? (
              <input
                type="text"
                value={grp.groupName}
                onChange={(e) => handleGroupTitleChange(gIdx, e.target.value)}
                className="font-extrabold text-[14.5px] text-neutral-950 tracking-tight bg-transparent border-b border-dashed border-neutral-300 focus:outline-none focus:border-lime-500"
              />
            ) : (
              <h3 className="font-extrabold text-[14.5px] text-neutral-950 tracking-tight">
                {grp.groupName}
              </h3>
            )}

            <ul className="space-y-1 text-[12px] text-neutral-800 pl-1">
              {grp.items?.map((item, iIdx) => (
                <li key={iIdx} className="flex items-start gap-2">
                  <span className="text-neutral-900 font-bold leading-none mt-1">•</span>
                  {isEditable ? (
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => handleItemChange(gIdx, iIdx, e.target.value)}
                      className="flex-1 text-[12px] text-neutral-800 bg-transparent border-b border-dashed border-neutral-200 focus:outline-none focus:border-lime-500"
                    />
                  ) : (
                    <span className="leading-snug">{item}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
