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

      {/* Intent Blocks - System Architecture Definition */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-lg border border-blue-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">📊</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-blue-900">CRM Dashboard</h3>
              <p className="text-blue-700 font-medium">Customer Relationship Management</p>
            </div>
          </div>
          <p className="text-blue-800 mb-4">
            Booking metrics, customer insights, and inquiry management will appear here.
            This is the heart of guest relationship management.
          </p>
          <div className="bg-blue-200 rounded-lg p-3">
            <p className="text-sm text-blue-900 font-medium">Intent: Real-time booking analytics and customer data</p>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-lg border border-green-200">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl font-bold">🏨</span>
            </div>
            <div>
              <h3 className="text-lg font-bold text-green-900">Inventory Control</h3>
              <p className="text-green-700 font-medium">Room Management & Availability</p>
            </div>
          </div>
          <p className="text-green-800 mb-4">
            Room availability, pricing, and inventory metrics will be displayed here.
            Critical for revenue management and operations.
          </p>
          <div className="bg-green-200 rounded-lg p-3">
            <p className="text-sm text-green-900 font-medium">Intent: Live inventory tracking and pricing optimization</p>
          </div>
        </div>
      </div>

      {/* CRM Core - Intent Block */}
      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg border border-purple-200 p-8 mb-8">
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">🎯</span>
          </div>
          <h2 className="text-2xl font-bold text-purple-900 mb-2">CRM Command Center</h2>
          <p className="text-purple-700 text-lg">Where Customer Relationships Are Built</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-lg p-4 border border-purple-300">
            <h4 className="font-bold text-purple-900 mb-2">📥 New Inquiries</h4>
            <p className="text-sm text-purple-800">Fresh booking requests from potential guests will appear here first.</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-300">
            <h4 className="font-bold text-purple-900 mb-2">⚡ Quick Actions</h4>
            <p className="text-sm text-purple-800">Respond, quote, confirm, or follow up with guests directly from this dashboard.</p>
          </div>

          <div className="bg-white rounded-lg p-4 border border-purple-300">
            <h4 className="font-bold text-purple-900 mb-2">📊 Conversion Funnel</h4>
            <p className="text-sm text-purple-800">Track inquiry-to-booking conversion rates and optimize your sales process.</p>
          </div>
        </div>

        <div className="bg-purple-200 rounded-lg p-4">
          <p className="text-purple-900 font-medium text-center">
            💡 This is where CRM happens. Every guest interaction starts and ends here.
          </p>
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
