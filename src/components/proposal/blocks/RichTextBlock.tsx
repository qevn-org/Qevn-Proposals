'use client';

import React from 'react';
import { BlockItem } from '@/types/proposal';

interface RichTextBlockProps {
  block: BlockItem;
  isEditable?: boolean;
  onUpdate?: (data: Record<string, any>) => void;
}

export function RichTextBlock({
  block,
  isEditable,
  onUpdate
}: RichTextBlockProps) {
  const data = block.data || {};
  const title = block.title || data.title || '';
  const content = data.content || '';

  return (
    <div className="flex-1 flex flex-col px-12 py-7 text-neutral-900 leading-relaxed">
      {title && (
        <div>
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
        </div>
      )}

      {isEditable ? (
        <textarea
          value={content}
          onChange={(e) => onUpdate?.({ content: e.target.value })}
          className="w-full flex-1 min-h-[300px] text-[13.5px] text-neutral-800 leading-[1.6] bg-transparent border border-dashed border-neutral-200 rounded p-2 focus:outline-none focus:ring-1 focus:ring-lime-400 resize-none"
          placeholder="Write rich content here..."
        />
      ) : (
        <div
          className="prose prose-neutral max-w-none text-[13.5px] text-neutral-800 leading-[1.6]"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      )}
    </div>
  );
}
