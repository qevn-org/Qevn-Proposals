'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useProposalStore } from '@/store/proposal-store';
import { AppShell } from '@/components/layout/AppShell';
import {
  Building2,
  FileSpreadsheet,
  BookmarkPlus,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  UploadCloud,
  Check
} from 'lucide-react';

export default function NewProposalWizardPage() {
  const router = useRouter();
  const { templates, createProposalFromTemplate } = useProposalStore();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3>(1);

  // Step 1: Client Info
  const [clientName, setClientName] = useState('INFINIUM GLOBAL RESEARCH');
  const [contactPerson, setContactPerson] = useState('SHRIKANT');
  const [email, setEmail] = useState('shrikant@infiniumglobalresearch.com');
  const [website, setWebsite] = useState('https://infiniumglobalresearch.com');
  const [industry, setIndustry] = useState('Market Research & Intelligence');
  const [location, setLocation] = useState('Pune / Global');
  const [logo, setLogo] = useState('');

  // Step 2: Proposal Info
  const [title, setTitle] = useState(
    'AI-Powered Outbound\nGrowth Engine\nProposal'
  );
  const [subtitle, setSubtitle] = useState(
    'Scalable multi-agent pipeline for intelligent prospect research, verification, and personalized client acquisition.'
  );
  const [proposalDate, setProposalDate] = useState('AUGUST 2026');
  const [validUntil, setValidUntil] = useState('SEPTEMBER 2026');
  const [representative, setRepresentative] = useState('Dhruv Pathak');

  // Step 3: Template
  const [selectedTemplateId, setSelectedTemplateId] = useState(
    templates[0]?.id || 'template-qevn-standard'
  );

  const handleCreate = () => {
    const newId = createProposalFromTemplate(
      selectedTemplateId,
      {
        name: clientName,
        contactPerson: contactPerson,
        email: email,
        website: website,
        industry: industry,
        location: location,
        logo: logo
      },
      title
    );

    router.push(`/proposals/${newId}`);
  };

  return (
    <AppShell>
      <div className="p-8 max-w-4xl mx-auto w-full space-y-8">
        {/* Wizard Header */}
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-black uppercase tracking-wider bg-lime-100 text-lime-900 px-2 py-0.5 rounded border border-lime-300">
              PROPOSAL WIZARD
            </span>
            <span className="text-xs font-semibold text-neutral-400">·</span>
            <span className="text-xs font-semibold text-neutral-500">
              Step {currentStep} of 3
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-neutral-950 tracking-tight">
            Create Client Proposal
          </h1>
          <p className="text-xs sm:text-sm text-neutral-600 font-medium mt-0.5">
            Configure client details and select a modular proposal template.
          </p>
        </div>

        {/* Step Progression Bar */}
        <div className="grid grid-cols-3 gap-3">
          <div
            onClick={() => setCurrentStep(1)}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
              currentStep === 1
                ? 'bg-white border-lime-400 ring-2 ring-lime-400/40 shadow-xs'
                : 'bg-white/60 border-neutral-200 hover:bg-white'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                currentStep >= 1 ? 'bg-neutral-950 text-[#A3FF38]' : 'bg-neutral-200 text-neutral-600'
              }`}
            >
              1
            </div>
            <div>
              <p className="text-xs font-extrabold text-neutral-950">Client</p>
              <p className="text-[10.5px] text-neutral-500 font-medium">Company & Contact</p>
            </div>
          </div>

          <div
            onClick={() => setCurrentStep(2)}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
              currentStep === 2
                ? 'bg-white border-lime-400 ring-2 ring-lime-400/40 shadow-xs'
                : 'bg-white/60 border-neutral-200 hover:bg-white'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                currentStep >= 2 ? 'bg-neutral-950 text-[#A3FF38]' : 'bg-neutral-200 text-neutral-600'
              }`}
            >
              2
            </div>
            <div>
              <p className="text-xs font-extrabold text-neutral-950">Proposal Info</p>
              <p className="text-[10.5px] text-neutral-500 font-medium">Title & Dates</p>
            </div>
          </div>

          <div
            onClick={() => setCurrentStep(3)}
            className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
              currentStep === 3
                ? 'bg-white border-lime-400 ring-2 ring-lime-400/40 shadow-xs'
                : 'bg-white/60 border-neutral-200 hover:bg-white'
            }`}
          >
            <div
              className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs ${
                currentStep === 3 ? 'bg-neutral-950 text-[#A3FF38]' : 'bg-neutral-200 text-neutral-600'
              }`}
            >
              3
            </div>
            <div>
              <p className="text-xs font-extrabold text-neutral-950">Template</p>
              <p className="text-[10.5px] text-neutral-500 font-medium">13-Page QEVN Standard</p>
            </div>
          </div>
        </div>

        {/* STEP 1: CLIENT INFORMATION */}
        {currentStep === 1 && (
          <div className="bg-white p-7 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-6 animate-in fade-in">
            <div className="flex items-center gap-2 pb-4 border-b border-neutral-100">
              <Building2 className="w-5 h-5 text-neutral-900" />
              <h2 className="text-base font-extrabold text-neutral-950">
                Step 1: Client Information
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Client Company Name *
                </label>
                <input
                  type="text"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  placeholder="e.g. INFINIUM GLOBAL RESEARCH"
                  className="w-full px-4 py-2.5 text-xs font-bold bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Primary Contact Person *
                </label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Shrikant"
                  className="w-full px-4 py-2.5 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Contact Email *
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="shrikant@infiniumglobalresearch.com"
                  className="w-full px-4 py-2.5 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Website URL
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  placeholder="https://infiniumglobalresearch.com"
                  className="w-full px-4 py-2.5 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Industry / Domain
                </label>
                <input
                  type="text"
                  value={industry}
                  onChange={(e) => setIndustry(e.target.value)}
                  placeholder="Market Research & Analytics"
                  className="w-full px-4 py-2.5 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Client Logo
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="text"
                    value={logo}
                    onChange={(e) => setLogo(e.target.value)}
                    placeholder="Paste image URL..."
                    className="flex-1 px-4 py-2.5 text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                  <label className="px-4 py-2.5 border border-neutral-200 bg-neutral-100 hover:bg-neutral-200 rounded-xl text-xs font-bold text-neutral-800 cursor-pointer transition-colors flex items-center gap-1.5 shrink-0">
                    <UploadCloud className="w-4 h-4" />
                    <span>Upload File</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onload = (uploadEvent) => {
                            const result = uploadEvent.target?.result as string;
                            if (result) setLogo(result);
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="flex justify-end pt-4 border-t border-neutral-100">
              <button
                onClick={() => setCurrentStep(2)}
                className="py-2.5 px-6 rounded-xl bg-neutral-950 hover:bg-black text-[#A3FF38] font-extrabold text-xs shadow-sm transition-all flex items-center gap-2"
              >
                <span>Continue to Proposal Info</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: PROPOSAL INFORMATION */}
        {currentStep === 2 && (
          <div className="bg-white p-7 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-6 animate-in fade-in">
            <div className="flex items-center gap-2 pb-4 border-b border-neutral-100">
              <FileSpreadsheet className="w-5 h-5 text-neutral-900" />
              <h2 className="text-base font-extrabold text-neutral-950">
                Step 2: Proposal Information
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Proposal Main Title
                </label>
                <textarea
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs font-bold bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400 resize-none leading-normal"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                  Subtitle / Executive One-Liner
                </label>
                <textarea
                  value={subtitle}
                  onChange={(e) => setSubtitle(e.target.value)}
                  className="w-full px-4 py-2.5 text-xs bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400 resize-none"
                  rows={2}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                    Proposal Date
                  </label>
                  <input
                    type="text"
                    value={proposalDate}
                    onChange={(e) => setProposalDate(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                    Valid Until
                  </label>
                  <input
                    type="text"
                    value={validUntil}
                    onChange={(e) => setValidUntil(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider mb-1.5">
                    QEVN Representative
                  </label>
                  <input
                    type="text"
                    value={representative}
                    onChange={(e) => setRepresentative(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs font-semibold bg-neutral-50 border border-neutral-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-lime-400"
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-4 border-t border-neutral-100">
              <button
                onClick={() => setCurrentStep(1)}
                className="py-2.5 px-5 rounded-xl border border-neutral-200 text-neutral-700 font-bold text-xs hover:bg-neutral-100 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={() => setCurrentStep(3)}
                className="py-2.5 px-6 rounded-xl bg-neutral-950 hover:bg-black text-[#A3FF38] font-extrabold text-xs shadow-sm transition-all flex items-center gap-2"
              >
                <span>Select Template</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: TEMPLATE SELECTION */}
        {currentStep === 3 && (
          <div className="bg-white p-7 rounded-2xl border border-neutral-200/90 shadow-2xs space-y-6 animate-in fade-in">
            <div className="flex items-center gap-2 pb-4 border-b border-neutral-100">
              <BookmarkPlus className="w-5 h-5 text-neutral-900" />
              <h2 className="text-base font-extrabold text-neutral-950">
                Step 3: Select Proposal Template
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {templates.map((tmpl) => {
                const isSelected = selectedTemplateId === tmpl.id;

                return (
                  <div
                    key={tmpl.id}
                    onClick={() => setSelectedTemplateId(tmpl.id)}
                    className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'border-neutral-950 bg-lime-50/20 ring-2 ring-lime-400/50 shadow-sm'
                        : 'border-neutral-200 hover:border-neutral-300 bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded bg-lime-100 text-lime-900 border border-lime-200">
                          {tmpl.category}
                        </span>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-neutral-400">
                            {tmpl.pagesCount} Pages
                          </span>
                          {isSelected && (
                            <div className="w-5 h-5 rounded-full bg-neutral-950 text-[#A3FF38] flex items-center justify-center">
                              <Check className="w-3.5 h-3.5" />
                            </div>
                          )}
                        </div>
                      </div>

                      <h3 className="font-extrabold text-sm text-neutral-950 mb-1.5">
                        {tmpl.name}
                      </h3>
                      <p className="text-xs text-neutral-600 leading-relaxed">
                        {tmpl.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between text-[11px] font-bold text-neutral-500">
                      <span>Full 13-Page Pipeline Included</span>
                      <span className="text-neutral-900">Standard QEVN Theme</span>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-between pt-4 border-t border-neutral-100">
              <button
                onClick={() => setCurrentStep(2)}
                className="py-2.5 px-5 rounded-xl border border-neutral-200 text-neutral-700 font-bold text-xs hover:bg-neutral-100 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>

              <button
                onClick={handleCreate}
                className="py-3 px-8 rounded-xl bg-neutral-950 hover:bg-black text-[#A3FF38] font-extrabold text-xs shadow-md transition-all flex items-center gap-2 hover:scale-[1.02] active:scale-[0.98]"
              >
                <Sparkles className="w-4 h-4 text-[#A3FF38]" />
                <span>Create & Open Proposal Studio</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
