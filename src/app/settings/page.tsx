'use client';

import React, { useState } from 'react';
import { useProposalStore } from '@/store/proposal-store';
import { AppShell } from '@/components/layout/AppShell';
import { QevnLogo } from '@/components/brand/QevnLogo';
import { Palette, Building2, Check, Sparkles, Globe, Shield, RefreshCw } from 'lucide-react';

export default function SettingsPage() {
  const { activeProposal, updateBranding } = useProposalStore();
  const [savedNotice, setSavedNotice] = useState(false);

  const [companyName, setCompanyName] = useState('Qevn');
  const [website, setWebsite] = useState('https://qevn.in');
  const [leadRepresentative, setLeadRepresentative] = useState('Dhruv Pathak');
  const [supportEmail, setSupportEmail] = useState('hello@qevn.in');
  const [primaryColor, setPrimaryColor] = useState(
    activeProposal?.branding?.primaryColor || '#A3FF38'
  );

  const brandPresets = [
    { label: 'QEVN Signature Lime', color: '#A3FF38' },
    { label: 'Electric Mint', color: '#00F5A0' },
    { label: 'Sky Intelligence', color: '#00A3E0' },
    { label: 'Neon Yellow', color: '#FFEB3B' },
    { label: 'Vibrant Orange', color: '#FF6B00' }
  ];

  const handleSave = () => {
    updateBranding({ primaryColor });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2000);
  };

  return (
    <AppShell>
      <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
        {/* Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-lime-100 text-lime-900 px-2 py-0.5 rounded border border-lime-300">
              GLOBAL CONFIGURATION
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
            Brand & Studio Settings
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-0.5">
            Manage global QEVN branding rules, default representatives, and visual presets.
          </p>
        </div>

        {/* 1. Brand Identity Card */}
        <div className="bg-white p-7 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <Palette className="w-5 h-5 text-neutral-900" />
              <div>
                <h2 className="text-base font-extrabold text-neutral-950">
                  QEVN Visual Identity
                </h2>
                <p className="text-xs text-neutral-500">
                  The primary color used for curved header/footer banners and highlight cards.
                </p>
              </div>
            </div>

            <QevnLogo size="md" variant="badge" />
          </div>

          <div className="space-y-4">
            <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider">
              Primary Accent Color
            </label>
            <div className="flex items-center gap-4 flex-wrap">
              {brandPresets.map((preset) => (
                <button
                  key={preset.color}
                  onClick={() => setPrimaryColor(preset.color)}
                  className={`flex items-center gap-2 px-3.5 py-2 rounded-xl border text-xs font-bold transition-all ${
                    primaryColor === preset.color
                      ? 'border-neutral-950 bg-neutral-50 shadow-xs'
                      : 'border-neutral-200 hover:bg-neutral-50'
                  }`}
                >
                  <span
                    className="w-4 h-4 rounded-full border border-black/20"
                    style={{ backgroundColor: preset.color }}
                  />
                  <span>{preset.label}</span>
                  {primaryColor === preset.color && (
                    <Check className="w-3.5 h-3.5 text-black ml-1 stroke-[3]" />
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2. Organization Details */}
        <div className="bg-white p-7 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-5">
          <div className="flex items-center gap-3 pb-4 border-b border-neutral-100">
            <Building2 className="w-5 h-5 text-neutral-900" />
            <div>
              <h2 className="text-base font-extrabold text-neutral-950">
                Organization Information
              </h2>
              <p className="text-xs text-neutral-500">
                Default details populated in new proposals.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
                Company Name
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-bold bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
                Website
              </label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
                Default Representative
              </label>
              <input
                type="text"
                value={leadRepresentative}
                onChange={(e) => setLeadRepresentative(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1">
                Support / Contact Email
              </label>
              <input
                type="email"
                value={supportEmail}
                onChange={(e) => setSupportEmail(e.target.value)}
                className="w-full px-3.5 py-2 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-neutral-100 flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-600">
              {savedNotice ? '✓ Settings saved successfully!' : ''}
            </span>

            <button
              onClick={handleSave}
              className="py-2.5 px-6 rounded-xl bg-neutral-950 hover:bg-black text-[#A3FF38] text-xs font-extrabold shadow-sm transition-all flex items-center gap-2"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#A3FF38]" />
              <span>Save Settings</span>
            </button>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
