'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, AuthState } from '@/types/auth';

interface EnhancedAuthState {
  user: User | null;
  isAuthenticated: boolean;
  isCheckingSession: boolean;
  login: (email: string, password?: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkSession: () => Promise<boolean>;
}

export const useAuthStore = create<EnhancedAuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isCheckingSession: true,

      login: async (email: string, password = '') => {
        try {
          const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
          });

          const data = await res.json();

          if (res.ok && data.success && data.user) {
            set({ user: data.user, isAuthenticated: true, isCheckingSession: false });
            return { success: true };
          } else {
            return { success: false, error: data.error || 'Authentication failed' };
          }
        } catch {
          return { success: false, error: 'Network error. Please try again.' };
        }
      },

      logout: async () => {
        try {
          await fetch('/api/auth/logout', { method: 'POST' });
        } catch {
          // ignore
        }
        set({ user: null, isAuthenticated: false, isCheckingSession: false });
      },

      checkSession: async () => {
        try {
          const res = await fetch('/api/auth/me');
          if (res.ok) {
            const data = await res.json();
            if (data.authenticated && data.user) {
              set({ user: data.user, isAuthenticated: true, isCheckingSession: false });
              return true;
            }
          }
        } catch {
          // ignore
        }
        set({ user: null, isAuthenticated: false, isCheckingSession: false });
        return false;
      }
    }),
    {
      name: 'qevn_auth_state',
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
