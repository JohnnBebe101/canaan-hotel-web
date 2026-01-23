interface ServiceCardProps {
  icon: string;
  title: string;
  description: string;
}

export default function ServiceCard({ icon, title, description }: ServiceCardProps) {
  return (
    <article className="flex flex-col items-center gap-4 rounded-lg bg-white p-6 text-center dark:bg-background-light/5">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/20 text-primary" aria-hidden="true">
        <span className="material-symbols-outlined text-3xl">{icon}</span>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="text-lg font-bold text-text-primary dark:text-background-light">{title}</h3>
        <p className="text-sm text-text-secondary dark:text-text-secondary/90">{description}</p>
      </div>
    </article>
  );
}
