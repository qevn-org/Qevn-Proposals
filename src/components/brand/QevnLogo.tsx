'use client';

import React from 'react';

interface QevnLogoProps {
  className?: string;
  variant?: 'dark' | 'lime' | 'white' | 'badge';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
}

export function QevnIcon({
  className = 'w-7 h-7',
  variant = 'dark'
}: {
  className?: string;
  variant?: 'dark' | 'lime' | 'white';
}) {
  const src =
    variant === 'white'
      ? '/images/qevn-icon-white.png'
      : variant === 'lime'
      ? '/images/qevn-icon-lime.png'
      : '/images/qevn-icon-black.png';

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="QEVN Icon"
      className={`object-contain select-none shrink-0 ${className}`}
    />
  );
}

export function QevnLogo({
  className = '',
  variant = 'dark',
  size = 'md',
  showWordmark = true
}: QevnLogoProps) {
  const sizeMap = {
    sm: { height: 'h-6', iconSize: 'w-6 h-6', badgePad: 'px-2.5 py-1 rounded-lg' },
    md: { height: 'h-8', iconSize: 'w-8 h-8', badgePad: 'px-3.5 py-1.5 rounded-xl' },
    lg: { height: 'h-10', iconSize: 'w-10 h-10', badgePad: 'px-4 py-2 rounded-2xl' },
    xl: { height: 'h-14', iconSize: 'w-14 h-14', badgePad: 'px-5 py-2.5 rounded-2xl' }
  };

  const currentSize = sizeMap[size];

  if (!showWordmark) {
    return (
      <QevnIcon
        className={`${currentSize.iconSize} ${className}`}
        variant={variant === 'white' ? 'white' : variant === 'lime' ? 'lime' : 'dark'}
      />
    );
  }

  if (variant === 'badge') {
    return (
      <div
        className={`inline-flex items-center justify-center bg-[#A3FF38] shadow-sm select-none ${currentSize.badgePad} ${className}`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/qevn-logo-black.png"
          alt="Qevn"
          className={`${currentSize.height} w-auto object-contain`}
        />
      </div>
    );
  }

  const logoSrc =
    variant === 'white'
      ? '/images/qevn-logo-white.png'
      : variant === 'lime'
      ? '/images/qevn-logo-lime.png'
      : '/images/qevn-logo-black.png';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={logoSrc}
        alt="Qevn"
        className={`${currentSize.height} w-auto object-contain`}
      />
    </div>
  );
}

export function QevnCoBrandHeader({
  clientName,
  clientLogo,
  date = 'AUGUST 2026',
  className = ''
}: {
  clientName?: string;
  clientLogo?: string;
  date?: string;
  className?: string;
}) {
  return (
    <div className={`flex items-center justify-between w-full select-none ${className}`}>
      <div className="flex items-center gap-3.5">
        <QevnLogo size="md" variant="dark" />
        <span className="text-black/50 font-bold text-xl leading-none">×</span>
        {clientLogo ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={clientLogo}
            alt={clientName || 'Client'}
            className="h-8 max-w-[150px] object-contain"
          />
        ) : (
          <div className="flex flex-col">
            <span className="font-extrabold text-sky-500 tracking-tight text-xl leading-none">
              {clientName?.split(' ')[0]?.toLowerCase() || 'infinium'}
            </span>
            <span className="text-[10px] font-semibold text-sky-600 tracking-wider uppercase leading-none mt-0.5">
              {clientName?.split(' ').slice(1).join(' ') || 'global research'}
            </span>
          </div>
        )}
      </div>
      <div className="text-right">
        <span className="text-xs font-black text-black tracking-wider uppercase">
          {date}
        </span>
      </div>
    </div>
  );
}
