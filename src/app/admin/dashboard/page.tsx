/**
 * Admin Dashboard - Control Center (Intent Blocks)
 * Route: /admin/dashboard
 *
 * Future-proof intent blocks defining system architecture:
 * - Bookings Management (CRM Core)
 * - Rooms CMS
 * - Attractions CMS
 * - System Health (Future)
 */
export default function AdminDashboardPage() {

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Control Center</h1>
        <p className="text-gray-600">Central hub for hotel management operations</p>
      </div>

      {/* Core System Capabilities */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 p-6 rounded-xl border border-blue-200 shadow-sm">
          <div className="flex items-center space-x-4 mb-5">
            <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-blue-900">CRM Analytics</h3>
              <p className="text-blue-700 font-medium">Customer Insights & Metrics</p>
            </div>
          </div>
          <p className="text-blue-800 mb-4 leading-relaxed">
            Real-time booking analytics, customer behavior insights, and inquiry management metrics
            will be displayed here. This becomes the command center for guest relationship management.
          </p>
          <div className="bg-blue-200 rounded-lg p-3 border border-blue-300">
            <p className="text-sm text-blue-900 font-semibold">🎯 Mission Critical: Revenue optimization through data-driven decisions</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 via-green-100 to-green-50 p-6 rounded-xl border border-green-200 shadow-sm">
          <div className="flex items-center space-x-4 mb-5">
            <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center shadow-lg">
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-900">Revenue Operations</h3>
              <p className="text-green-700 font-medium">Inventory & Pricing Intelligence</p>
            </div>
          </div>
          <p className="text-green-800 mb-4 leading-relaxed">
            Live room availability tracking, dynamic pricing insights, and inventory optimization
            metrics will power revenue management decisions and operational efficiency.
          </p>
          <div className="bg-green-200 rounded-lg p-3 border border-green-300">
            <p className="text-sm text-green-900 font-semibold">💰 Business Engine: Maximize revenue through smart inventory management</p>
          </div>
        </div>
      </div>

      {/* CRM Operational Hub */}
      <div className="bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50 rounded-xl border border-purple-200 p-8 mb-8 shadow-sm">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-purple-900 mb-2">CRM Operational Hub</h2>
          <p className="text-purple-700 text-xl font-medium">Where Guest Relationships Are Managed</p>
          <p className="text-purple-600 mt-2">Complete booking lifecycle from inquiry to completion</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-5 border border-purple-300 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600 text-lg">📥</span>
              </div>
              <h4 className="font-bold text-purple-900">New Inquiries</h4>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">Fresh booking requests from potential guests arrive here first for immediate attention and response.</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-purple-300 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600 text-lg">⚡</span>
              </div>
              <h4 className="font-bold text-purple-900">Workflow Actions</h4>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">Respond, quote prices, confirm bookings, or follow up with guests through guided status transitions.</p>
          </div>

          <div className="bg-white rounded-lg p-5 border border-purple-300 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                <span className="text-amber-600 text-lg">📊</span>
              </div>
              <h4 className="font-bold text-purple-900">Conversion Tracking</h4>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">Monitor inquiry-to-booking conversion rates and optimize your guest acquisition process.</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-200 to-purple-300 rounded-xl p-6 border border-purple-300">
          <div className="flex items-center justify-center space-x-3">
            <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <p className="text-purple-900 font-bold text-lg text-center">
              This is where CRM happens. Every guest journey begins and completes here.
            </p>
            <svg className="w-6 h-6 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
        </div>
      </div>

      {/* System Architecture Definition */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">System Architecture</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* CRM Core */}
          <a
            href="/admin/bookings"
            className="block p-4 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">💼</span>
              </div>
              <h3 className="font-medium text-blue-900">CRM System</h3>
            </div>
            <p className="text-sm text-blue-700 mb-3">Guest relationship management, booking inquiries, customer data</p>
            <div className="bg-blue-200 rounded px-2 py-1">
              <span className="text-xs font-medium text-blue-900">PRIMARY BUSINESS SYSTEM</span>
            </div>
          </a>

          {/* Property CMS */}
          <a
            href="/admin/rooms"
            className="block p-4 bg-green-50 border border-green-200 rounded-lg hover:bg-green-100 transition-colors"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">🏨</span>
              </div>
              <h3 className="font-medium text-green-900">Property CMS</h3>
            </div>
            <p className="text-sm text-green-700 mb-3">Room inventory, pricing, amenities, availability management</p>
            <div className="bg-green-200 rounded px-2 py-1">
              <span className="text-xs font-medium text-green-900">INVENTORY MANAGEMENT</span>
            </div>
          </a>

          {/* Content CMS */}
          <a
            href="/admin/attractions"
            className="block p-4 bg-purple-50 border border-purple-200 rounded-lg hover:bg-purple-100 transition-colors"
          >
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">📍</span>
              </div>
              <h3 className="font-medium text-purple-900">Content CMS</h3>
            </div>
            <p className="text-sm text-purple-700 mb-3">Local attractions, hotel content, marketing materials</p>
            <div className="bg-purple-200 rounded px-2 py-1">
              <span className="text-xs font-medium text-purple-900">CONTENT MANAGEMENT</span>
            </div>
          </a>

          {/* System Health */}
          <div className="block p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <div className="flex items-center space-x-3 mb-2">
              <div className="w-8 h-8 bg-gray-400 rounded-lg flex items-center justify-center">
                <span className="text-white text-sm font-bold">⚡</span>
              </div>
              <h3 className="font-medium text-gray-500">System Health</h3>
            </div>
            <p className="text-sm text-gray-600 mb-3">Performance monitoring, error tracking, system diagnostics</p>
            <div className="bg-gray-200 rounded px-2 py-1">
              <span className="text-xs font-medium text-gray-600">FUTURE EXPANSION</span>
            </div>
          </div>
        </div>
      </div>

      {/* Development & Testing Tools */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Development Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/contact"
            className="block p-4 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition-colors"
          >
            <h3 className="font-medium text-amber-900">Test CRM Pipeline</h3>
            <p className="text-sm text-amber-700 mt-1">Simulate guest booking inquiries to test the CRM system</p>
            <div className="mt-2 text-xs text-amber-600">→ Leads to /admin/bookings</div>
          </a>

          <a
            href="/rooms"
            className="block p-4 bg-indigo-50 border border-indigo-200 rounded-lg hover:bg-indigo-100 transition-colors"
          >
            <h3 className="font-medium text-indigo-900">Public Experience Audit</h3>
            <p className="text-sm text-indigo-700 mt-1">Review how the Property CMS content appears to guests</p>
            <div className="mt-2 text-xs text-indigo-600">→ Content from /admin/rooms</div>
          </a>

          <div className="block p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h3 className="font-medium text-gray-500">System Architecture</h3>
            <p className="text-sm text-gray-600 mt-1">This dashboard defines the entire hotel management system</p>
            <div className="mt-2 text-xs text-gray-500">
              CRM → Property → Content → Health
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
