'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Button from '@/components/ui/Button';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function AdminErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error('Admin panel error:', error);
  }, [error]);

  return (
    <div className="min-h-[60vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700 p-10 text-center">
        <div className="mb-8">
          <div className="mx-auto w-20 h-20 bg-red-50 dark:bg-red-900/10 rounded-3xl flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-4xl text-red-600 font-black">warning</span>
          </div>
          <h1 className="text-2xl font-black text-text-primary dark:text-white mb-2 uppercase tracking-tight">
            System Fault
          </h1>
          <p className="text-text-secondary dark:text-gray-400 text-sm font-medium">
            The admin panel encountered an unexpected state. This has been logged for the technical team.
          </p>
        </div>

        <div className="space-y-3">
          <Button
            onClick={reset}
            className="w-full"
            variant="primary"
          >
            Attempt Reconciliation
          </Button>
          <Link href="/admin/dashboard" className="w-full block">
            <Button
              className="w-full"
              variant="ghost"
            >
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
