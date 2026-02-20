
import React from 'react';

type BadgeVariant =
    | 'cactus' | 'forest' | 'sandstone'
    // Legacy variants mapped to new system
    | 'primary' | 'success' | 'warning' | 'error' | 'neutral' | 'info';

type BadgeSize = 'xs' | 'sm' | 'md' | 'lg';

interface BadgeProps {
    children: React.ReactNode;
    variant?: BadgeVariant;
    size?: BadgeSize;
    className?: string; // Allow additional styling
}

export default function Badge({ children, variant = 'cactus', size = 'sm', className = '' }: BadgeProps) {
    const styles: Record<BadgeVariant, string> = {
        // New System
        cactus: "bg-cactus/10 text-cactus border-cactus/20",
        forest: "bg-forest text-sandstone border-forest",
        sandstone: "bg-sandstone text-forest border-cactus/20",

        // Legacy Mapping -> Forest/Cactus Theme
        primary: "bg-cactus text-sandstone border-cactus",
        success: "bg-cactus/20 text-cactus border-cactus/20", // Green-ish
        warning: "bg-bronze/20 text-bronze border-bronze/20", // Bronze as warning
        error: "bg-red-900/10 text-red-900 border-red-900/20", // Keep error red but muted? Or map to Forest? Let's keep red for admin clarity
        neutral: "bg-gray-100 text-gray-600 border-gray-200",
        info: "bg-blue-900/10 text-blue-900 border-blue-900/20",
    };

    const sizes: Record<BadgeSize, string> = {
        xs: "px-1.5 py-0.5 text-[9px]",
        sm: "px-2 py-0.5 text-[10px]",
        md: "px-4 py-1.5 text-[11px]",
        lg: "px-6 py-2 text-xs",
    };

    // If new design system badge style (uppercase tracking) is desired for all, keep it.
    // Legacy badges might expect different styling, but let's unify them.
    const baseStyle = "uppercase font-bold tracking-[0.1em] border rounded-full inline-block";

    return (
        <span className={`${baseStyle} ${styles[variant]} ${sizes[size]} ${className}`}>
            {children}
        </span>
    );
}
