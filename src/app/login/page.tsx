'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';
import { QevnLogo } from '@/components/brand/QevnLogo';
import { Lock, Mail, ArrowRight, ShieldCheck, UserCheck, KeyRound, AlertCircle } from 'lucide-react';

const AUTHORIZED_PROFILES = [
  {
    name: 'Dhruv Pathak',
    email: 'dhruv@qevn.in',
    roleTitle: 'Founder & Admin',
    initials: 'DP'
  },
  {
    name: 'QEVN Growth Lead',
    email: 'growth@qevn.in',
    roleTitle: 'Senior Growth Consultant',
    initials: 'GL'
  },
  {
    name: 'AI Solutions Architect',
    email: 'engineer@qevn.in',
    roleTitle: 'Lead AI Engineer',
    initials: 'AE'
  },
  {
    name: 'QEVN Master Admin',
    email: 'admin@qevn.in',
    roleTitle: 'Executive Access',
    initials: 'MA'
  }
];

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams?.get('redirect') || '/dashboard';

  const { login } = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please enter both your work email and password.');
      return;
    }

    setIsLoading(true);
    setError('');

    const res = await login(email, password);

    if (res.success) {
      router.push(redirectPath);
    } else {
      setError(res.error || 'Invalid credentials. Access restricted to authorized team members.');
      setIsLoading(false);
    }
  };

  const handleSelectProfile = (presetEmail: string) => {
    setEmail(presetEmail);
    setError('');
  };

  return (
    <div className="bg-neutral-900/90 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-2xl space-y-6">
      <div className="text-center space-y-1.5">
        <h1 className="text-2xl font-black tracking-tight text-white">
          QEVN Proposal Studio
        </h1>
        <p className="text-xs font-medium text-neutral-400">
          Internal access restricted to 4 authorized accounts.
        </p>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 text-xs font-semibold text-red-400 flex items-center gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
          <span>{error}</span>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-400 mb-1.5">
            Authorized Work Email
          </label>
          <div className="relative">
            <Mail className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. dhruv@qevn.in"
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-950/80 border border-white/10 rounded-xl text-xs font-medium text-white placeholder-neutral-600 focus:outline-none focus:border-[#A3FF38] focus:ring-1 focus:ring-[#A3FF38] transition-all"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-[11px] font-black uppercase tracking-wider text-neutral-400 mb-1.5">
            Password
          </label>
          <div className="relative">
            <Lock className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter secure password"
              className="w-full pl-10 pr-4 py-2.5 bg-neutral-950/80 border border-white/10 rounded-xl text-xs font-medium text-white placeholder-neutral-600 focus:outline-none focus:border-[#A3FF38] focus:ring-1 focus:ring-[#A3FF38] transition-all"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 rounded-xl bg-[#A3FF38] hover:bg-[#90e82c] text-black text-xs font-black tracking-wide uppercase transition-all shadow-md flex items-center justify-center gap-2 hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
          ) : (
            <>
              <span>Verify & Access Studio</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Select Authorized Profile */}
      <div className="pt-4 border-t border-white/10 space-y-2.5">
        <span className="block text-[10px] font-black uppercase tracking-wider text-neutral-500 text-center">
          Authorized Team Profiles
        </span>

        <div className="grid grid-cols-2 gap-2">
          {AUTHORIZED_PROFILES.map((profile) => (
            <button
              key={profile.email}
              type="button"
              onClick={() => handleSelectProfile(profile.email)}
              className={`p-2.5 rounded-xl border transition-all text-left group cursor-pointer ${
                email === profile.email
                  ? 'bg-[#A3FF38]/10 border-[#A3FF38] text-white'
                  : 'bg-white/5 hover:bg-white/10 border-white/5 hover:border-white/20 text-neutral-300'
              }`}
            >
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-md bg-[#A3FF38] text-black font-black text-[10px] flex items-center justify-center shrink-0">
                  {profile.initials}
                </div>
                <div className="min-w-0">
                  <p className="text-[11px] font-bold truncate text-white">
                    {profile.name}
                  </p>
                  <p className="text-[9.5px] text-neutral-400 truncate">
                    {profile.email}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col justify-between p-6 sm:p-12 relative overflow-hidden font-sans select-none">
      {/* Ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A3FF38]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <QevnLogo size="lg" variant="badge" />
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-semibold text-neutral-400">
          <ShieldCheck className="w-3.5 h-3.5 text-[#A3FF38]" />
          <span>Cryptographically Secured (4 Users Only)</span>
        </div>
      </div>

      {/* Center Auth Card with Suspense */}
      <div className="max-w-md w-full mx-auto my-auto py-8 z-10">
        <Suspense
          fallback={
            <div className="bg-neutral-900 p-8 rounded-3xl border border-white/10 flex justify-center">
              <div className="w-6 h-6 border-2 border-[#A3FF38] border-t-transparent rounded-full animate-spin" />
            </div>
          }
        >
          <LoginForm />
        </Suspense>
      </div>

      {/* Bottom Footer */}
      <div className="flex items-center justify-between text-[11px] text-neutral-600 z-10">
        <span>© 2026 QEVN AI. All rights reserved.</span>
        <span>HMAC-SHA256 Signed HttpOnly Session Security</span>
      </div>
    </div>
  );
}
