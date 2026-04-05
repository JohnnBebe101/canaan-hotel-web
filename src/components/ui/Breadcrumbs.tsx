"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icons";

export default function Breadcrumbs() {
    const pathname = usePathname();
    const paths = pathname.split("/").filter((path) => path);

    // If we're just on /admin, don't show breadcrumbs or show home
    if (paths.length <= 1) return null;

    return (
        <nav className="flex mb-4" aria-label="Breadcrumb">
            <ol className="flex items-center space-x-2">
                <li>
                    <Link
                        href="/admin/dashboard"
                        className="text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-primary transition-colors"
                    >
                        Admin
                    </Link>
                </li>
                {paths.map((path, index) => {
                    // Skip 'admin' as we already added it
                    if (path === "admin") return null;

                    const href = `/${paths.slice(0, index + 1).join("/")}`;
                    const isLast = index === paths.length - 1;
                    const label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ");

                    return (
                        <li key={path} className="flex items-center space-x-2">
                            <Icon name="chevron_right" className="text-sm text-gray-400" />
                            {isLast ? (
                                <span className="text-xs font-bold uppercase tracking-wider text-primary">
                                    {label}
                                </span>
                            ) : (
                                <Link
                                    href={href}
                                    className="text-xs font-bold uppercase tracking-wider text-text-secondary hover:text-primary transition-colors"
                                >
                                    {label}
                                </Link>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    );
}
