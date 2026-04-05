
import React from 'react';

interface CanaanLogoProps {
    className?: string;
}

export default function CanaanLogo({ className }: CanaanLogoProps) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            aria-hidden="true"
        >
            <path d="M8 9V7a4 4 0 0 1 8 0v2" />
            <path d="M3 10a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2-2H5a2 2 0 0 1-2-2V10z" />
            <path d="M17 10a2 2 0 0 1 2-2h1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2V10z" />
            <path d="M12 9v13" />
        </svg>
    );
}
