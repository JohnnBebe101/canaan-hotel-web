import React from "react";

interface BadgeProps {
    children: React.ReactNode;
    variant?: "primary" | "success" | "warning" | "error" | "info" | "neutral";
    size?: "xs" | "sm";
    className?: string;
}

export default function Badge({
    children,
    variant = "neutral",
    size = "xs",
    className = "",
}: BadgeProps) {
    const baseStyles = "inline-flex items-center rounded-full font-medium uppercase tracking-wider";

    const variants = {
        primary: "bg-primary/10 text-primary",
        success: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        warning: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        error: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        info: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
        neutral: "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300",
    };

    const sizes = {
        xs: "px-2 py-0.5 text-[10px]",
        sm: "px-2.5 py-1 text-xs",
    };

    return (
        <span className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}>
            {children}
        </span>
    );
}
