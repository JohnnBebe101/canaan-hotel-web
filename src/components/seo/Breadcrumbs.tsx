import Link from "next/link";
import { SITE_URL } from "@/lib/site";
import { Icon } from "@/components/ui/Icons";

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const crumbs = [{ name: "Home", href: "/" }, ...items];
  const lastIndex = crumbs.length - 1;

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.href ? `${SITE_URL}${crumb.href === "/" ? "/" : crumb.href}` : undefined,
    })),
  };

  return (
    <>
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-stone-500">
          {crumbs.map((crumb, index) => {
            const isLast = index === lastIndex;
            return (
              <li key={index} className="flex items-center gap-1.5">
                {index > 0 && (
                  <Icon name="chevron_right" className="text-sm text-stone-400" aria-hidden="true" />
                )}
                {isLast || !crumb.href ? (
                  <span aria-current={isLast ? "page" : undefined} className="text-stone-800 font-medium">
                    {crumb.name}
                  </span>
                ) : (
                  <Link
                    href={crumb.href}
                    className="hover:text-forest transition-colors"
                  >
                    {crumb.name}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
