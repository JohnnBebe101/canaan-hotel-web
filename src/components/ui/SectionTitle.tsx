
import React from 'react';


type SectionTitleProps = {
    label?: string;
    title: string;
    description?: string;
    centered?: boolean;
    dark?: boolean;
    className?: string;
};

export default function SectionTitle({
    label,
    title,
    description,
    centered = false,
    dark = false,
    className = '',
}: SectionTitleProps) {
    return (
        <div className={`mb-16 ${centered ? 'text-center max-w-4xl mx-auto' : 'max-w-2xl'} ${className}`}>
            {label && (
                <span className="block uppercase tracking-[0.5em] text-[10px] font-bold mb-6 text-cactus">
                    {label}
                </span>
            )}
            <h2 className={`text-4xl md:text-6xl font-serif mb-8 leading-[1.1] ${dark ? 'text-sandstone' : 'text-forest'}`}>
                {title}
            </h2>
            {description && (
                <p className={`text-xl leading-relaxed font-light ${dark ? 'text-gray-400' : 'text-gray-600'}`}>
                    {description}
                </p>
            )}
            <div
                className={`w-16 h-1 mt-10 bg-cactus opacity-40 ${centered ? 'mx-auto' : ''}`}
                aria-hidden="true"
            />
        </div>
    );
}
