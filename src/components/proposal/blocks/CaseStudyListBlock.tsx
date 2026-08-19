'use client';

import React from 'react';
import { BlockItem } from '@/types/proposal';
import { Plus, Trash2 } from 'lucide-react';

interface CaseStudyListBlockProps {
  block: BlockItem;
  isEditable?: boolean;
  onUpdate?: (data: Record<string, any>) => void;
}

export function CaseStudyListBlock({
  block,
  isEditable,
  onUpdate
}: CaseStudyListBlockProps) {
  const data = block.data || {};
  const title = data.title || 'Case Studies';
  const studies: { name: string; client: string; bullets: string[] }[] =
    data.studies || [];

  const handleStudyChange = (idx: number, field: 'name' | 'client', text: string) => {
    const updated = [...studies];
    updated[idx] = { ...updated[idx], [field]: text };
    onUpdate?.({ studies: updated });
  };

  const handleBulletChange = (studyIdx: number, bulletIdx: number, text: string) => {
    const updated = [...studies];
    const bullets = [...updated[studyIdx].bullets];
    bullets[bulletIdx] = text;
    updated[studyIdx].bullets = bullets;
    onUpdate?.({ studies: updated });
  };

  const handleAddStudy = () => {
    const updated = [
      ...studies,
      {
        name: 'New Case Study',
        client: 'Client Name',
        bullets: [
          'High-impact enterprise solution delivered',
          'Measurable performance improvements'
        ]
      }
    ];
    onUpdate?.({ studies: updated });
  };

  const handleRemoveStudy = (idx: number) => {
    const updated = studies.filter((_, i) => i !== idx);
    onUpdate?.({ studies: updated });
  };

  return (
    <div className="flex-1 flex flex-col px-12 py-7 text-neutral-900 leading-relaxed">
      {/* Title */}
      {isEditable ? (
        <input
          type="text"
          value={title}
          onChange={(e) => onUpdate?.({ title: e.target.value })}
          className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-4 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none focus:border-lime-500"
        />
      ) : (
        <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-4">
          {title}
        </h2>
      )}

      {/* Case Studies List */}
      <div className="space-y-6">
        {studies.map((study, sIdx) => (
          <div key={sIdx} className="space-y-1.5 relative group">
            {/* Project Name */}
            <div className="flex items-center justify-between">
              {isEditable ? (
                <input
                  type="text"
                  value={study.name}
                  onChange={(e) => handleStudyChange(sIdx, 'name', e.target.value)}
                  className="text-lg font-extrabold text-neutral-950 tracking-tight bg-transparent border-b border-dashed border-neutral-300 focus:outline-none focus:border-lime-500"
                />
              ) : (
                <h3 className="text-lg font-extrabold text-neutral-950 tracking-tight">
                  {study.name}
                </h3>
              )}

              {isEditable && studies.length > 1 && (
                <button
                  onClick={() => handleRemoveStudy(sIdx)}
                  className="text-neutral-400 hover:text-red-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove case study"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Client line */}
            <div className="text-[13px]">
              <span className="font-semibold text-neutral-900">Client: </span>
              {isEditable ? (
                <input
                  type="text"
                  value={study.client}
                  onChange={(e) => handleStudyChange(sIdx, 'client', e.target.value)}
                  className="text-[13px] text-neutral-800 bg-transparent border-b border-dashed border-neutral-200 focus:outline-none focus:border-lime-500"
                />
              ) : (
                <span className="text-neutral-800">{study.client}</span>
              )}
            </div>

            {/* Bullets */}
            <ul className="space-y-1 text-[12.5px] text-neutral-800 pl-1 pt-1">
              {study.bullets?.map((b, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2">
                  <span className="text-neutral-900 font-bold leading-none mt-1">•</span>
                  {isEditable ? (
                    <input
                      type="text"
                      value={b}
                      onChange={(e) => handleBulletChange(sIdx, bIdx, e.target.value)}
                      className="flex-1 text-[12.5px] text-neutral-800 bg-transparent border-b border-dashed border-neutral-200 focus:outline-none focus:border-lime-500"
                    />
                  ) : (
                    <span className="leading-snug">{b}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {isEditable && (
        <button
          onClick={handleAddStudy}
          className="mt-6 self-start inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-neutral-800 bg-lime-100 hover:bg-lime-200 border border-lime-300 rounded-lg transition-colors"
        >
          <Plus className="w-3.5 h-3.5" /> Add Case Study
        </button>
      )}
    </div>
  );
}
