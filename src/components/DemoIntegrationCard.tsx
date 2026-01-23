interface DemoStat {
  label: string;
  value: string;
  variant: 'green' | 'blue' | 'yellow' | 'purple' | 'orange' | 'red' | 'gray';
}

interface DemoIntegrationCardProps {
  icon: string;
  iconBgColor: string;
  iconColor: string;
  title: string;
  stats: DemoStat[];
  buttonText: string;
}

const variantStyles: Record<DemoStat['variant'], string> = {
  green: 'bg-green-100 text-green-800',
  blue: 'bg-blue-100 text-blue-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  purple: 'bg-purple-100 text-purple-800',
  orange: 'bg-orange-100 text-orange-800',
  red: 'bg-red-100 text-red-800',
  gray: 'bg-gray-100 text-gray-800',
};

export default function DemoIntegrationCard({
  icon,
  iconBgColor,
  iconColor,
  title,
  stats,
  buttonText,
}: DemoIntegrationCardProps) {
  return (
    <div className="p-6 border border-gray-300 rounded-lg shadow-sm" data-demo="true">
      <div className="flex items-center gap-3 mb-4">
        <div className={`w-10 h-10 ${iconBgColor} rounded-lg flex items-center justify-center`}>
          <span className={`material-symbols-outlined ${iconColor}`}>{icon}</span>
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-background-light">{title}</h3>
      </div>
      <div className="space-y-2">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-text-secondary">{stat.label}</span>
            <span className={`inline-block px-2 py-1 rounded-full text-xs ${variantStyles[stat.variant]}`}>
              {stat.value}
            </span>
          </div>
        ))}
        <button
          className="w-full mt-3 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm"
          data-demo="true"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
