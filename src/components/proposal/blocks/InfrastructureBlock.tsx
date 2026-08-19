'use client';

import React from 'react';
import { BlockItem } from '@/types/proposal';

interface InfrastructureBlockProps {
  block: BlockItem;
  isEditable?: boolean;
  onUpdate?: (data: Record<string, any>) => void;
}

export function InfrastructureBlock({
  block,
  isEditable,
  onUpdate
}: InfrastructureBlockProps) {
  const data = block.data || {};
  const title = data.title || 'Intelligent Bulk Mailing System';
  const subtitle =
    data.subtitle ||
    'A premium email infrastructure designed for high-volume, high-deliverability outbound campaigns. This is not a standard email tool it is an enterprise-grade sending ecosystem managed entirely by AI.';
  const phases = data.phases || [];
  const operationalNotice = data.operationalNotice || {};

  const handlePhaseChange = (phaseIdx: number, field: string, value: any) => {
    const updated = [...phases];
    updated[phaseIdx] = { ...updated[phaseIdx], [field]: value };
    onUpdate?.({ phases: updated });
  };

  const handlePhaseBulletChange = (
    phaseIdx: number,
    bulletIdx: number,
    text: string
  ) => {
    const updated = [...phases];
    const bullets = [...(updated[phaseIdx].bullets || [])];
    bullets[bulletIdx] = text;
    updated[phaseIdx].bullets = bullets;
    onUpdate?.({ phases: updated });
  };

  return (
    <div className="flex-1 flex flex-col px-12 py-7 text-neutral-900 leading-relaxed">
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

      {isEditable ? (
        <textarea
          value={subtitle}
          onChange={(e) => onUpdate?.({ subtitle: e.target.value })}
          className="w-full text-[13px] text-neutral-700 leading-[1.6] mb-5 bg-transparent border border-dashed border-neutral-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-lime-400 resize-none"
          rows={2}
        />
      ) : (
        <p className="text-[13px] text-neutral-700 leading-[1.6] mb-5">{subtitle}</p>
      )}

      {/* Phases */}
      <div className="space-y-4">
        {/* Phase 1 */}
        {phases[0] && (
          <div>
            <h3 className="text-[15px] font-bold text-neutral-950 tracking-tight mb-1">
              {phases[0].phaseNumber}
            </h3>
            {isEditable ? (
              <textarea
                value={phases[0].description}
                onChange={(e) =>
                  handlePhaseChange(0, 'description', e.target.value)
                }
                className="w-full text-[12.5px] text-neutral-800 leading-snug bg-transparent border border-dashed border-neutral-200 rounded p-1 focus:outline-none focus:ring-1 focus:ring-lime-400 resize-none"
                rows={2}
              />
            ) : (
              <p className="text-[12.5px] text-neutral-800 leading-snug">
                {phases[0].description}
              </p>
            )}
          </div>
        )}

        {/* Phase 2 */}
        {phases[1] && (
          <div className="space-y-1.5">
            <h3 className="text-[15px] font-bold text-neutral-950 tracking-tight">
              {phases[1].phaseNumber}
            </h3>
            <p className="text-[12.5px] font-semibold text-neutral-800">
              {phases[1].scheduleTitle}
            </p>
            <ul className="space-y-1 text-[12px] text-neutral-800 pl-1">
              {phases[1].bullets?.map((b: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-neutral-900 font-bold leading-none mt-1">•</span>
                  {isEditable ? (
                    <input
                      type="text"
                      value={b}
                      onChange={(e) => handlePhaseBulletChange(1, idx, e.target.value)}
                      className="flex-1 text-[12px] text-neutral-800 bg-transparent border-b border-dashed border-neutral-200 focus:outline-none focus:border-lime-500"
                    />
                  ) : (
                    <span>{b}</span>
                  )}
                </li>
              ))}
            </ul>
            {phases[1].notice && (
              <p className="text-[11.5px] text-neutral-700 leading-snug pt-1">
                {phases[1].notice}
              </p>
            )}
          </div>
        )}

        {/* Phase 3 */}
        {phases[2] && (
          <div className="space-y-1.5">
            <h3 className="text-[15px] font-bold text-neutral-950 tracking-tight">
              {phases[2].phaseNumber}
            </h3>
            {phases[2].intro && (
              <p className="text-[12px] text-neutral-800">{phases[2].intro}</p>
            )}
            <ul className="space-y-1 text-[12px] text-neutral-800 pl-1">
              {phases[2].bullets?.map((b: string, idx: number) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-neutral-900 font-bold leading-none mt-1">•</span>
                  {isEditable ? (
                    <input
                      type="text"
                      value={b}
                      onChange={(e) => handlePhaseBulletChange(2, idx, e.target.value)}
                      className="flex-1 text-[12px] text-neutral-800 bg-transparent border-b border-dashed border-neutral-200 focus:outline-none focus:border-lime-500"
                    />
                  ) : (
                    <span>{b}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Operational Notice Box */}
      {operationalNotice?.title && (
        <div className="mt-4 pt-3 border-t border-neutral-200">
          <p className="text-[11px] font-bold text-neutral-900 uppercase tracking-wider mb-0.5">
            {operationalNotice.title}
          </p>
          {isEditable ? (
            <textarea
              value={operationalNotice.text}
              onChange={(e) =>
                onUpdate?.({
                  operationalNotice: {
                    ...operationalNotice,
                    text: e.target.value
                  }
                })
              }
              className="w-full text-[10.5px] text-neutral-600 leading-tight bg-transparent border border-dashed border-neutral-200 rounded p-1 focus:outline-none focus:ring-1 focus:ring-lime-400 resize-none"
              rows={3}
            />
          ) : (
            <p className="text-[10.5px] text-neutral-600 leading-tight">
              {operationalNotice.text}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
