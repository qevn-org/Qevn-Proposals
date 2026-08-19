'use client';

import React from 'react';
import { QevnCoBrandHeader } from '../brand/QevnLogo';

interface ProposalPageHeaderProps {
  clientName?: string;
  clientLogo?: string;
  date?: string;
  primaryColor?: string;
  isCover?: boolean;
}

export function ProposalPageHeader({
  clientName,
  clientLogo,
  date = 'AUGUST 2026',
  primaryColor = '#A3FF38',
  isCover = false
}: ProposalPageHeaderProps) {
  if (isCover) {
    return (
      <div className="relative w-full h-[180px] overflow-hidden select-none">
        {/* Curved gradient background */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, #88E714 65%, #60B800 100%)`
          }}
        />
        {/* Soft bottom curve cutout */}
        <svg
          viewBox="0 0 1000 100"
          className="absolute -bottom-1 left-0 w-full h-14 text-white fill-current preserve-3d"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C300,90 700,90 1000,0 L1000,100 L0,100 Z" />
        </svg>

        <div className="relative z-10 px-12 pt-8">
          <QevnCoBrandHeader
            clientName={clientName}
            clientLogo={clientLogo}
            date={date}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[100px] overflow-hidden select-none">
      {/* Curved gradient header bar */}
      <div
        className="absolute inset-0 w-full h-full"
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, #88E714 70%, #60B800 100%)`
        }}
      />
      {/* Bottom curve */}
      <svg
        viewBox="0 0 1000 100"
        className="absolute -bottom-1 left-0 w-full h-10 text-white fill-current"
        preserveAspectRatio="none"
      >
        <path d="M0,0 C300,75 700,75 1000,0 L1000,100 L0,100 Z" />
      </svg>

      <div className="relative z-10 px-12 pt-6">
        <QevnCoBrandHeader
          clientName={clientName}
          clientLogo={clientLogo}
          date={date}
        />
      </div>
    </div>
  );
}

interface ProposalPageFooterProps {
  pageNumber: number;
  isCover?: boolean;
  presentedTo?: string;
  presentedBy?: string;
  primaryColor?: string;
}

export function ProposalPageFooter({
  pageNumber,
  isCover = false,
  presentedTo,
  presentedBy = 'Qevn',
  primaryColor = '#A3FF38'
}: ProposalPageFooterProps) {
  if (isCover) {
    return (
      <div className="relative w-full h-[190px] overflow-hidden mt-auto select-none">
        {/* Top curve */}
        <svg
          viewBox="0 0 1000 100"
          className="absolute -top-1 left-0 w-full h-12 text-white fill-current rotate-180"
          preserveAspectRatio="none"
        >
          <path d="M0,0 C300,75 700,75 1000,0 L1000,100 L0,100 Z" />
        </svg>

        <div
          className="w-full h-full pt-10 px-12 pb-6 flex items-end justify-between"
          style={{
            background: `linear-gradient(135deg, ${primaryColor} 0%, #88E714 70%, #60B800 100%)`
          }}
        >
          <div className="text-black">
            <p className="text-xs font-semibold uppercase tracking-wider text-black/80">Presented to</p>
            <p className="text-sm font-black whitespace-pre-line tracking-tight text-black leading-snug">
              {presentedTo || 'CLIENT NAME'}
            </p>
          </div>

          <div className="flex items-end gap-10">
            <div className="text-black">
              <p className="text-xs font-semibold uppercase tracking-wider text-black/80">Presented by</p>
              <p className="text-sm font-black tracking-tight text-black leading-snug">
                {presentedBy}
              </p>
            </div>
            <div className="text-sm font-black text-black select-none">
              {pageNumber}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[38px] overflow-hidden mt-auto select-none">
      {/* Top curve */}
      <svg
        viewBox="0 0 1000 100"
        className="absolute -top-0.5 left-0 w-full h-6 text-white fill-current rotate-180"
        preserveAspectRatio="none"
      >
        <path d="M0,0 C300,70 700,70 1000,0 L1000,100 L0,100 Z" />
      </svg>

      <div
        className="w-full h-full px-12 flex items-center justify-end"
        style={{
          background: `linear-gradient(135deg, ${primaryColor} 0%, #88E714 80%, #60B800 100%)`
        }}
      >
        <span className="text-xs font-bold text-black select-none">{pageNumber}</span>
      </div>
    </div>
  );
}
