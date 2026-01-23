export default function AdminHeader() {
    return (
      <header className="h-16 border-b flex items-center px-6 bg-white justify-between">
        <h1 className="font-bold text-lg">Canaan Hotel Admin</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Welcome, Admin</span>
          <button className="text-sm text-red-600 hover:underline">Logout</button>
        </div>
      </header>
    );
  }