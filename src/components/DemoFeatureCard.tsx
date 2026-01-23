interface Badge {
  text: string;
  variant: 'green' | 'blue' | 'yellow' | 'purple' | 'orange' | 'red' | 'gray';
}

interface DemoFeatureCardProps {
  icon: string;
  iconColor: string;
  title: string;
  subtitle: string;
  badges: Badge[];
  gradient: string;
}

const variantStyles: Record<Badge['variant'], string> = {
  green: 'bg-green-100 text-green-800',
  blue: 'bg-blue-100 text-blue-800',
  yellow: 'bg-yellow-100 text-yellow-800',
  purple: 'bg-purple-100 text-purple-800',
  orange: 'bg-orange-100 text-orange-800',
  red: 'bg-red-100 text-red-800',
  gray: 'bg-gray-100 text-gray-800',
};

export default function DemoFeatureCard({
  icon,
  iconColor,
  title,
  subtitle,
  badges,
  gradient,
}: DemoFeatureCardProps) {
  return (
    <div className={`p-4 border border-gray-200 rounded-lg ${gradient}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className={`material-symbols-outlined ${iconColor} text-2xl`}>{icon}</span>
        <div>
          <h4 className="font-semibold text-gray-900">{title}</h4>
          <p className="text-sm text-gray-600">{subtitle}</p>
        </div>
      </div>
      <div className="flex gap-2">
        {badges.map((badge, index) => (
          <span
            key={index}
            className={`inline-block px-2 py-1 rounded-full text-xs ${variantStyles[badge.variant]}`}
          >
            {badge.text}
          </span>
        ))}
      </div>
    </div>
  );
}
