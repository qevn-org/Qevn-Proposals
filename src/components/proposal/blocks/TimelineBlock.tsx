'use client';

import React from 'react';
import { BlockItem } from '@/types/proposal';
import { Plus, Trash2 } from 'lucide-react';

interface TimelineBlockProps {
  block: BlockItem;
  isEditable?: boolean;
  onUpdate?: (data: Record<string, any>) => void;
}

export function TimelineBlock({
  block,
  isEditable,
  onUpdate
}: TimelineBlockProps) {
  const data = block.data || {};
  const title = data.title || 'Project Timeline';
  const columns = data.columns || ['Week', 'Milestone', 'Deliverables'];
  const rows: { week: string; milestone: string; deliverables: string }[] =
    data.rows || [];

  const handleRowChange = (
    idx: number,
    field: 'week' | 'milestone' | 'deliverables',
    text: string
  ) => {
    const updated = [...rows];
    updated[idx] = { ...updated[idx], [field]: text };
    onUpdate?.({ rows: updated });
  };

  const handleAddRow = () => {
    const updated = [
      ...rows,
      {
        week: `Week ${rows.length + 1}`,
        milestone: 'New Phase',
        deliverables: 'Key deliverables delivered and verified.'
      }
    ];
    onUpdate?.({ rows: updated });
  };

  const handleRemoveRow = (idx: number) => {
    const updated = rows.filter((_, i) => i !== idx);
    onUpdate?.({ rows: updated });
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

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-2.5 mb-2.5 select-none">
        <div
          className="col-span-2 py-2.5 px-3 rounded-lg text-center font-extrabold text-xs uppercase tracking-wider text-neutral-950 shadow-xs flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #B8FF5C 0%, #A3FF38 100%)' }}
        >
          {columns[0]}
        </div>
        <div
          className="col-span-4 py-2.5 px-3 rounded-lg text-center font-extrabold text-xs uppercase tracking-wider text-neutral-950 shadow-xs flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #B8FF5C 0%, #A3FF38 100%)' }}
        >
          {columns[1]}
        </div>
        <div
          className="col-span-6 py-2.5 px-3 rounded-lg text-center font-extrabold text-xs uppercase tracking-wider text-neutral-950 shadow-xs flex items-center justify-center"
          style={{ background: 'linear-gradient(135deg, #B8FF5C 0%, #A3FF38 100%)' }}
        >
          {columns[2]}
        </div>
      </div>

      {/* Table Rows */}
      <div className="space-y-2">
        {rows.map((row, idx) => (
          <div key={idx} className="grid grid-cols-12 gap-2.5 items-stretch relative group">
            {/* Week Badge */}
            <div
              className="col-span-2 p-2 rounded-lg text-center font-bold text-xs text-neutral-950 flex items-center justify-center shadow-xs"
              style={{ background: 'linear-gradient(135deg, #B8FF5C 0%, #A3FF38 100%)' }}
            >
              {isEditable ? (
                <input
                  type="text"
                  value={row.week}
                  onChange={(e) => handleRowChange(idx, 'week', e.target.value)}
                  className="text-center font-bold text-xs text-neutral-950 bg-transparent border-b border-dashed border-neutral-600 focus:outline-none w-full"
                />
              ) : (
                row.week
              )}
            </div>

            {/* Milestone Card */}
            <div
              className="col-span-4 p-2.5 rounded-lg text-center font-bold text-xs text-neutral-950 flex items-center justify-center shadow-xs"
              style={{ background: 'linear-gradient(135deg, #B8FF5C 0%, #A3FF38 100%)' }}
            >
              {isEditable ? (
                <textarea
                  value={row.milestone}
                  onChange={(e) =>
                    handleRowChange(idx, 'milestone', e.target.value)
                  }
                  className="text-center font-bold text-xs text-neutral-950 bg-transparent border-b border-dashed border-neutral-600 focus:outline-none w-full resize-none leading-snug"
                  rows={2}
                />
              ) : (
                <span className="leading-snug">{row.milestone}</span>
              )}
            </div>

            {/* Deliverables Card */}
            <div
              className="col-span-6 p-2.5 rounded-lg text-left font-medium text-[11.5px] text-neutral-950 flex items-center justify-between shadow-xs"
              style={{ background: 'linear-gradient(135deg, #B8FF5C 0%, #A3FF38 100%)' }}
            >
              {isEditable ? (
                <textarea
                  value={row.deliverables}
                  onChange={(e) =>
                    handleRowChange(idx, 'deliverables', e.target.value)
                  }
                  className="text-left font-medium text-[11.5px] text-neutral-950 bg-transparent border-b border-dashed border-neutral-600 focus:outline-none w-full resize-none leading-snug"
                  rows={2}
                />
              ) : (
                <span className="leading-snug">{row.deliverables}</span>
              )}

              {isEditable && rows.length > 1 && (
                <button
                  onClick={() => handleRemoveRow(idx)}
                  className="ml-2 text-neutral-500 hover:text-red-600 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove row"
                >
                  <Trash2 className="w-3 h-3" />
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
          <Plus className="w-3.5 h-3.5" /> Add Milestone
        </button>
      )}
    </div>
  );
}
