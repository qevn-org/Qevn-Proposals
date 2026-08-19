'use client';

import React from 'react';
import { BlockItem } from '@/types/proposal';

interface SolutionLayersBlockProps {
  block: BlockItem;
  isEditable?: boolean;
  onUpdate?: (data: Record<string, any>) => void;
}

export function SolutionLayersBlock({
  block,
  isEditable,
  onUpdate
}: SolutionLayersBlockProps) {
  const data = block.data || {};
  const mainTitle = data.mainTitle || '';
  const mainSubtitle = data.mainSubtitle || '';
  const layers: {
    layerNumber: string;
    title: string;
    intro: string;
    bullets: string[];
    footerLabel?: string;
    footerValue?: string;
  }[] = data.layers || [];

  const handleLayerChange = (
    layerIdx: number,
    field: string,
    value: any
  ) => {
    const updated = [...layers];
    updated[layerIdx] = { ...updated[layerIdx], [field]: value };
    onUpdate?.({ layers: updated });
  };

  const handleBulletChange = (layerIdx: number, bulletIdx: number, text: string) => {
    const updated = [...layers];
    const updatedBullets = [...updated[layerIdx].bullets];
    updatedBullets[bulletIdx] = text;
    updated[layerIdx].bullets = updatedBullets;
    onUpdate?.({ layers: updated });
  };

  return (
    <div className="flex-1 flex flex-col px-12 py-7 text-neutral-900 leading-relaxed">
      {/* Optional Top Section Title for Layer 1 & 2 */}
      {mainTitle && (
        <div className="mb-6">
          {isEditable ? (
            <input
              type="text"
              value={mainTitle}
              onChange={(e) => onUpdate?.({ mainTitle: e.target.value })}
              className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-2 bg-transparent border-b border-dashed border-neutral-300 focus:outline-none focus:border-lime-500"
            />
          ) : (
            <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-950 tracking-tight mb-2">
              {mainTitle}
            </h2>
          )}

          {mainSubtitle && (
            <div>
              {isEditable ? (
                <textarea
                  value={mainSubtitle}
                  onChange={(e) => onUpdate?.({ mainSubtitle: e.target.value })}
                  className="w-full text-[13px] text-neutral-700 leading-[1.6] bg-transparent border border-dashed border-neutral-200 rounded p-1.5 focus:outline-none focus:ring-1 focus:ring-lime-400 resize-none"
                  rows={2}
                />
              ) : (
                <p className="text-[13px] text-neutral-700 leading-[1.6]">
                  {mainSubtitle}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      {/* Layer Items */}
      <div className="space-y-6">
        {layers.map((layer, layerIdx) => (
          <div key={layerIdx} className="space-y-2">
            {/* Layer Badge & Title */}
            <div>
              <span className="text-xs font-black tracking-widest text-neutral-950 uppercase block mb-0.5">
                {layer.layerNumber}
              </span>
              {isEditable ? (
                <input
                  type="text"
                  value={layer.title}
                  onChange={(e) =>
                    handleLayerChange(layerIdx, 'title', e.target.value)
                  }
                  className="text-lg font-extrabold text-neutral-950 tracking-tight bg-transparent border-b border-dashed border-neutral-300 focus:outline-none focus:border-lime-500"
                />
              ) : (
                <h3 className="text-lg font-extrabold text-neutral-950 tracking-tight">
                  {layer.title}
                </h3>
              )}
            </div>

            {/* Layer Intro */}
            {layer.intro && (
              <div>
                {isEditable ? (
                  <input
                    type="text"
                    value={layer.intro}
                    onChange={(e) =>
                      handleLayerChange(layerIdx, 'intro', e.target.value)
                    }
                    className="w-full text-[13px] text-neutral-700 bg-transparent border-b border-dashed border-neutral-200 focus:outline-none focus:border-lime-500"
                  />
                ) : (
                  <p className="text-[13px] text-neutral-700">{layer.intro}</p>
                )}
              </div>
            )}

            {/* Bullets */}
            <ul className="space-y-1.5 text-[12.5px] text-neutral-800 pl-1">
              {layer.bullets?.map((b, bIdx) => (
                <li key={bIdx} className="flex items-start gap-2">
                  <span className="text-neutral-900 font-bold leading-none mt-1">•</span>
                  {isEditable ? (
                    <input
                      type="text"
                      value={b}
                      onChange={(e) =>
                        handleBulletChange(layerIdx, bIdx, e.target.value)
                      }
                      className="flex-1 text-[12.5px] text-neutral-800 bg-transparent border-b border-dashed border-neutral-200 focus:outline-none focus:border-lime-500"
                    />
                  ) : (
                    <span className="leading-snug">{b}</span>
                  )}
                </li>
              ))}
            </ul>

            {/* Optional Data Sources Footer (e.g. Apollo, Apify, Clay) */}
            {layer.footerLabel && (
              <div className="mt-3 pt-2">
                <p className="text-[12px] font-bold text-neutral-900 mb-0.5">
                  {layer.footerLabel}
                </p>
                {isEditable ? (
                  <textarea
                    value={layer.footerValue}
                    onChange={(e) =>
                      handleLayerChange(layerIdx, 'footerValue', e.target.value)
                    }
                    className="w-full text-[11.5px] text-neutral-600 bg-transparent border border-dashed border-neutral-200 rounded p-1 focus:outline-none focus:ring-1 focus:ring-lime-400 resize-none"
                    rows={2}
                  />
                ) : (
                  <p className="text-[11.5px] text-neutral-600 leading-snug">
                    {layer.footerValue}
                  </p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
