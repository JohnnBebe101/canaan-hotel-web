"use client";

import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import { Download, Wallet, CreditCard, TrendingUp, Clock } from "lucide-react";

export default function AdminPaymentsPage() {
    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-forest tracking-tight">Payments & Revenue</h1>
                    <p className="text-sm text-slate-500 mt-1">Monitor transactions and financial performance.</p>
                </div>
                <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                </Button>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                    <div className="flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-cactus" />
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Total Revenue</p>
                    </div>
                    <p className="text-2xl font-bold text-forest mt-2">ETB 0</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                    <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-amber-500" />
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Pending</p>
                    </div>
                    <p className="text-2xl font-bold text-amber-600 mt-2">ETB 0</p>
                </div>
                <div className="bg-white rounded-xl border border-slate-100 shadow-sm p-4">
                    <div className="flex items-center gap-2">
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                        <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Completed</p>
                    </div>
                    <p className="text-2xl font-bold text-emerald-600 mt-2">ETB 0</p>
                </div>
            </div>

            {/* Coming Soon / Empty State */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-20 text-center">
                <div className="w-20 h-20 bg-cactus/5 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Wallet className="w-10 h-10 text-cactus" />
                </div>
                <h2 className="text-lg font-semibold text-forest mb-2">Finance Module Coming Soon</h2>
                <p className="text-sm text-slate-500 mb-8 max-w-sm mx-auto">
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
