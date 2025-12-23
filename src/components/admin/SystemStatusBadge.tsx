interface SystemStatusBadgeProps {
  label: string;
  enabled: boolean;
}

export default function SystemStatusBadge({ label, enabled }: SystemStatusBadgeProps) {
  return (
    <div className="inline-flex items-center space-x-2">
      <span className="text-sm text-gray-600">{label}</span>
      <span
        className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          enabled
            ? 'bg-green-100 text-green-800'
            : 'bg-gray-100 text-gray-800'
        }`}
      >
        {enabled ? 'Enabled' : 'Disabled'}
      </span>
    </div>
  );
}
