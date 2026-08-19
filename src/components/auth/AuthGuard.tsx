'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/auth-store';

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated, isCheckingSession, checkSession } = useAuthStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    checkSession();
  }, [checkSession]);

  useEffect(() => {
    if (
      mounted &&
      !isCheckingSession &&
      !isAuthenticated &&
      pathname !== '/login' &&
      !pathname?.startsWith('/view/')
    ) {
      router.push(`/login?redirect=${encodeURIComponent(pathname || '/dashboard')}`);
    }
  }, [mounted, isCheckingSession, isAuthenticated, pathname, router]);

  if (!mounted || isCheckingSession) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white select-none">
        <div className="w-8 h-8 border-3 border-[#A3FF38] border-t-transparent rounded-full animate-spin mb-3" />
        <span className="text-[11px] font-black tracking-widest uppercase text-neutral-400">
          Verifying Security Credentials...
        </span>
      </div>
    );
  }

  if (!isAuthenticated && pathname !== '/login' && !pathname?.startsWith('/view/')) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-950 text-white select-none">
        <div className="w-8 h-8 border-3 border-[#A3FF38] border-t-transparent rounded-full animate-spin mb-3" />
        <span className="text-[11px] font-black tracking-widest uppercase text-neutral-400">
          Redirecting to Internal Login...
        </span>
      </div>
    );
  }

  return <>{children}</>;
}
