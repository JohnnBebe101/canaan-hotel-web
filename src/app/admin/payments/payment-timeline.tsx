/**
 * V5.3.3 Payment History Timeline - READ-ONLY COMPONENT
 *
 * Displays payment status history in a vertical timeline layout.
 * Feature-gated by isPaymentsEnabled() for safety.
 *
 * STRICT RULES:
 * - READ-ONLY UI ONLY
 * - No mutations or API calls
 * - No Stripe SDK dependencies
 * - Feature flag gated
 * - No side effects
 */

import React from 'react';
import { PaymentRecord, PaymentStatus, PaymentProvider, isPaymentsFeatureActive } from '@/lib/payments/payment-types';

interface PaymentTimelineProps {
  /** Payment records to display in timeline */
  paymentRecords: PaymentRecord[];
}

/**
 * Payment History Timeline Component
 *
 * Displays payment records in a chronological vertical timeline.
 * Shows status, amount, provider, and timestamps.
 */
export function PaymentTimeline({ paymentRecords }: PaymentTimelineProps) {
  // Feature gate: Show placeholder if payments disabled
  if (!isPaymentsFeatureActive()) {
    return (
      <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
        <div className="text-center text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-sm font-medium">Payment History</p>
          <p className="text-xs text-gray-400 mt-1">Feature disabled</p>
        </div>
      </div>
    );
  }

  // Sort records chronologically (newest first for timeline)
  const sortedRecords = [...paymentRecords].sort((a, b) =>
    new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
  );

  const formatAmount = (amountCents: number, currency: string) => {
    const amount = amountCents / 100;
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PAID:
        return 'bg-green-100 text-green-800 border-green-200';
      case PaymentStatus.FAILED:
        return 'bg-red-100 text-red-800 border-red-200';
      case PaymentStatus.CANCELLED:
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case PaymentStatus.AWAITING_CONFIRMATION:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case PaymentStatus.LINK_CREATED:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case PaymentStatus.DRAFT:
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status: PaymentStatus) => {
    switch (status) {
      case PaymentStatus.PAID:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case PaymentStatus.FAILED:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case PaymentStatus.AWAITING_CONFIRMATION:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        );
      case PaymentStatus.LINK_CREATED:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
    }
  };

  const getProviderDisplayName = (provider: PaymentProvider) => {
    switch (provider) {
      case PaymentProvider.STRIPE:
        return 'Stripe';
      default:
        return provider;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6">
      <div className="flex items-center mb-6">
        <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        <h3 className="text-lg font-medium text-gray-900">Payment History</h3>
      </div>

      {sortedRecords.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <svg className="w-12 h-12 mx-auto mb-3 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <p className="text-sm">No payment records found</p>
        </div>
      ) : (
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

          <div className="space-y-6">
            {sortedRecords.map((record) => (
              <div key={record.id} className="relative flex items-start">
                {/* Timeline dot */}
                <div className="relative z-10 flex items-center justify-center w-12 h-12 bg-white border-2 border-gray-200 rounded-full">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${getStatusColor(record.status).split(' ')[0].replace('bg-', 'bg-')}`}>
                    {getStatusIcon(record.status)}
                  </div>
                </div>

                {/* Content */}
                <div className="ml-6 flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(record.status)}`}>
                        {record.status.replace('_', ' ')}
                      </span>
                      <span className="text-sm text-gray-500">
                        {getProviderDisplayName(record.provider)}
                      </span>
                    </div>
                    <span className="text-lg font-semibold text-gray-900">
                      {formatAmount(record.amountCents, record.currency)}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">Created:</span> {formatDate(record.createdAt)}
                    </p>
                    {record.updatedAt !== record.createdAt && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Updated:</span> {formatDate(record.updatedAt)}
                      </p>
                    )}
                    {record.paymentLink && (
                      <p className="text-sm text-gray-600">
                        <span className="font-medium">Link:</span> Available
                      </p>
                    )}
                  </div>

                  {/* Payment ID for reference */}
                  <p className="text-xs text-gray-400 mt-2">
                    ID: {record.id}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
