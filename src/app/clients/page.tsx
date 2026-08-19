'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useProposalStore } from '@/store/proposal-store';
import { AppShell } from '@/components/layout/AppShell';
import { Building2, Plus, Mail, Globe, MapPin, FileText, ArrowRight } from 'lucide-react';

export default function ClientsPage() {
  const { proposals, initDefaultData } = useProposalStore();

  React.useEffect(() => {
    initDefaultData();
  }, [initDefaultData]);

  // Extract unique clients
  const clientMap = new Map();
  proposals.forEach((p) => {
    if (!clientMap.has(p.client.name)) {
      clientMap.set(p.client.name, {
        ...p.client,
        proposalCount: 1,
        latestProposalId: p.id,
        latestDate: p.metadata.proposalDate
      });
    } else {
      const existing = clientMap.get(p.client.name);
      existing.proposalCount += 1;
    }
  });

  const clients = Array.from(clientMap.values());

  return (
    <AppShell>
      <div className="p-8 max-w-7xl mx-auto w-full space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-[10px] font-black uppercase tracking-wider bg-lime-100 text-lime-900 px-2 py-0.5 rounded border border-lime-300">
                CLIENT DIRECTORY
              </span>
              <span className="text-xs font-semibold text-neutral-400">·</span>
              <span className="text-xs font-semibold text-neutral-500">
                {clients.length} Active Clients
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
              Clients Portfolio
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-0.5">
              Client profiles, logos, key contacts, and proposal history.
            </p>
          </div>

          <Link
            href="/proposals/new"
            className="py-2.5 px-5 rounded-xl bg-neutral-950 hover:bg-black text-[#A3FF38] font-extrabold text-xs shadow-sm transition-all flex items-center gap-2"
          >
            <Plus className="w-4 h-4 text-[#A3FF38]" />
            <span>New Client Proposal</span>
          </Link>
        </div>

        {/* Clients Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clients.map((c) => (
            <div
              key={c.name}
              className="bg-white rounded-2xl border border-neutral-200/90 hover:border-lime-400 p-6 flex flex-col justify-between shadow-2xs hover:shadow-md transition-all group"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    {c.logo ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={c.logo}
                        alt={c.name}
                        className="w-12 h-12 object-contain rounded-xl border border-neutral-100 p-1 bg-neutral-50"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-xl bg-neutral-950 text-[#A3FF38] font-black text-base flex items-center justify-center border border-black/10">
                        {c.name.substring(0, 2).toUpperCase()}
                      </div>
                    )}
                    <div>
                      <h3 className="font-extrabold text-sm text-neutral-950 tracking-tight">
                        {c.name}
                      </h3>
                      <span className="text-[11px] font-semibold text-neutral-500">
                        {c.industry || 'Technology'}
                      </span>
                    </div>
                  </div>

                  <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded bg-neutral-100 text-neutral-700">
                    {c.proposalCount} Proposal{c.proposalCount > 1 ? 's' : ''}
                  </span>
                </div>

                <div className="space-y-2 text-xs text-neutral-600 pt-2 border-t border-neutral-100">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-neutral-900">Contact:</span>
                    <span>{c.contactPerson}</span>
                  </div>
                  {c.email && (
                    <div className="flex items-center gap-2 truncate">
                      <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">{c.email}</span>
                    </div>
                  )}
                  {c.website && (
                    <div className="flex items-center gap-2 truncate">
                      <Globe className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span className="truncate">{c.website}</span>
                    </div>
                  )}
                  {c.location && (
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                      <span>{c.location}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-5 pt-3 border-t border-neutral-100 flex items-center justify-between">
                <Link
                  href={`/proposals/${c.latestProposalId}`}
                  className="text-xs font-bold text-neutral-950 hover:text-lime-700 flex items-center gap-1.5"
                >
                  <span>Open Active Proposal</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
