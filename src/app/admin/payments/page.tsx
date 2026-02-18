"use client";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

export default function AdminPaymentsPage() {
    return (
        <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-text-primary dark:text-white tracking-tight">Payments & Revenue</h1>
                    <p className="text-text-secondary dark:text-gray-400 mt-1">Monitor transactions and financial performance.</p>
                </div>
                <Button variant="outline">
                    <span className="material-symbols-outlined mr-2">download</span>
                    Export Report
                </Button>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-3xl border border-gray-100 dark:border-gray-700 p-20 text-center shadow-xl">
                <div className="w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <span className="material-symbols-outlined text-4xl text-primary">account_balance_wallet</span>
                </div>
                <h2 className="text-2xl font-black text-text-primary dark:text-white mb-2">Finance Module Coming Soon</h2>
                <p className="text-text-secondary dark:text-gray-400 mb-8 max-w-sm mx-auto font-medium">
                    We are currently integrating with local payment gateways. Transaction history will be available here shortly.
                </p>
                <div className="flex justify-center gap-4">
                    <Badge variant="neutral">Telebirr Integration Pending</Badge>
                    <Badge variant="neutral">CBE Birr Integration Pending</Badge>
                </div>
            </div>
        </div>
    );
}
