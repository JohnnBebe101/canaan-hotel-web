import React from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    isLoading?: boolean;
    children: React.ReactNode;
}

export default function Button({
    className = '',
    variant = 'primary',
    size = 'md',
    isLoading = false,
    children,
    disabled,
    ...props
}: ButtonProps) {
    const baseStyles =
        "uppercase tracking-[0.3em] font-bold transition-all duration-500 shadow-sm flex items-center justify-center gap-3 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-cactus text-sandstone hover:bg-forest hover:text-white shadow-xl",
        outline: "border border-forest/10 text-forest hover:bg-forest hover:text-sandstone",
        ghost: "text-cactus hover:text-forest tracking-[0.4em] bg-transparent p-0 shadow-none",
    };

    const sizes = {
        sm: "px-6 py-3 text-[9px]",
        md: "px-12 py-5 text-[10px]",
        lg: "px-16 py-6 text-xs",
    };

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
            disabled={isLoading || disabled}
            {...props}
        >
            {isLoading && <span className="material-symbols-outlined animate-spin text-sm">progress_activity</span>}
            {children}
        </button>
    );
}
