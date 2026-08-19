'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  BookmarkPlus,
  Building2,
  BookOpen,
  Briefcase,
  Settings,
  Plus,
  Sparkles,
  ExternalLink,
  LogOut,
  ChevronDown,
  User as UserIcon
} from 'lucide-react';
import { QevnLogo } from '../brand/QevnLogo';
import { useAuthStore } from '@/store/auth-store';
import { AuthGuard } from '../auth/AuthGuard';

const NAV_ITEMS = [
  { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/proposals', label: 'Proposals', icon: FileText },
  { href: '/templates', label: 'Templates', icon: BookmarkPlus },
  { href: '/clients', label: 'Clients', icon: Building2 },
  { href: '/content-library', label: 'Content Library', icon: BookOpen },
  { href: '/case-studies', label: 'Case Studies', icon: Briefcase },
  { href: '/settings', label: 'Brand & Settings', icon: Settings }
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, logout } = useAuthStore();
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <AuthGuard>
      <div className="min-h-screen flex bg-[#FAFAFA] text-neutral-900 antialiased font-sans">
        {/* Left Sidebar */}
        <aside className="w-64 border-r border-neutral-200/80 bg-white flex flex-col justify-between p-4 shrink-0 select-none">
          <div className="space-y-6">
            {/* Brand Header */}
            <div className="flex items-center justify-between px-2 pt-2">
              <Link href="/dashboard" className="flex items-center gap-2.5 group">
                <QevnLogo size="md" variant="badge" showWordmark={true} />
                <span className="text-[10px] font-black text-neutral-400 uppercase tracking-widest bg-neutral-100 px-1.5 py-0.5 rounded border border-neutral-200/60">
                  Studio
                </span>
              </Link>
            </div>

            {/* Quick Create CTA */}
            <div className="px-1">
              <Link
                href="/proposals/new"
                className="w-full py-2.5 px-4 rounded-xl bg-neutral-950 hover:bg-black text-[#A3FF38] font-extrabold text-xs flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Plus className="w-4 h-4 text-[#A3FF38]" />
                <span>New Proposal</span>
              </Link>
            </div>

            {/* Navigation Links */}
            <nav className="space-y-1">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/dashboard' && pathname?.startsWith(item.href));

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-bold transition-all ${
                      isActive
                        ? 'bg-neutral-950 text-white shadow-xs'
                        : 'text-neutral-600 hover:text-neutral-950 hover:bg-neutral-100/80'
                    }`}
                  >
                    <Icon
                      className={`w-4 h-4 ${
                        isActive ? 'text-[#A3FF38]' : 'text-neutral-500'
                      }`}
                    />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Org & User Info with Logout Option */}
          <div className="pt-4 border-t border-neutral-200/80 px-2 space-y-3">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="w-full flex items-center justify-between p-1.5 rounded-xl hover:bg-neutral-100 transition-colors text-left"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-full bg-[#A3FF38] text-black font-extrabold text-xs flex items-center justify-center border border-black/10 shrink-0">
                    {user?.initials || 'QP'}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-extrabold text-neutral-950 leading-tight truncate">
                      {user?.name || 'Dhruv Pathak'}
                    </span>
                    <span className="text-[10px] font-semibold text-neutral-500 truncate">
                      {user?.roleTitle || 'QEVN Admin'}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              </button>

              {userMenuOpen && (
                <div className="absolute bottom-full left-0 mb-2 w-full bg-white rounded-2xl border border-neutral-200 shadow-xl p-2 z-50 animate-in fade-in zoom-in-95 space-y-1">
                  <div className="px-2 py-1.5 border-b border-neutral-100">
                    <p className="text-[11px] font-bold text-neutral-950 truncate">
                      {user?.name}
                    </p>
                    <p className="text-[10px] text-neutral-500 truncate font-mono">
                      {user?.email}
                    </p>
                  </div>

                  <Link
                    href="/settings"
                    onClick={() => setUserMenuOpen(false)}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-semibold text-neutral-700 hover:bg-neutral-100"
                  >
                    <Settings className="w-3.5 h-3.5 text-neutral-500" />
                    <span>Settings</span>
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              )}
            </div>

            <div className="p-2.5 rounded-xl bg-lime-50/60 border border-lime-200 flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-lime-600" />
                <span className="text-[10.5px] font-bold text-lime-900">
                  QEVN OS v2.4
                </span>
              </div>
              <a
                href="https://qevn.in"
                target="_blank"
                rel="noreferrer"
                className="text-[10px] font-bold text-lime-800 hover:underline flex items-center gap-0.5"
              >
                <span>qevn.in</span>
                <ExternalLink className="w-2.5 h-2.5" />
              </a>
            </div>
          </div>
        </aside>

        {/* Main Content Viewport */}
        <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </AuthGuard>
  );
}
