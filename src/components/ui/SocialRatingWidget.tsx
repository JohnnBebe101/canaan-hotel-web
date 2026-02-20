
import React from 'react';

type Platform = 'tripadvisor' | 'google' | 'booking' | 'expedia';

interface SocialRatingWidgetProps {
    platform: Platform;
    rating: string;
    reviews: string;
}

const Star = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="w-3 h-3 fill-current"
    >
        <path
            fillRule="evenodd"
            d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
            clipRule="evenodd"
        />
    </svg>
);

const PlatformIcon: React.FC<{ platform: string }> = ({ platform }) => {
    switch (platform) {
        case 'google':
            return (
                <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.92 3.32-1.92 4.48-1.28 1.32-3.32 2.76-7.12 2.76-6.12 0-10.88-4.96-10.88-11.08s4.76-11.08 10.88-11.08c3.28 0 5.64 1.2 7.36 2.84l2.32-2.32c-2.44-2.08-5.6-3.32-9.68-3.32-7.56 0-13.8 6.24-13.8 13.8s6.24 13.8 13.8 13.8c4.08 0 7.36-1.32 9.76-3.84 2.48-2.48 3.12-5.96 3.12-8.52 0-.64-.04-1.12-.12-1.64h-12.76z" />
                </svg>
            );
        case 'booking':
            return <span className="font-black text-xs">B.</span>;
        case 'tripadvisor':
            return (
                <svg
                    className="w-5 h-5"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                >
                    <path d="M1.5 12c0 5.799 4.701 10.5 10.5 10.5s10.5-4.701 10.5-10.5-4.701-10.5-10.5-10.5-10.5 4.701-10.5 10.5zm3.75 0c0-1.242 1.008-2.25 2.25-2.25s2.25 1.008 2.25 2.25-1.008 2.25-2.25 2.25-2.25-1.008-2.25-2.25zm13.5 0c0 1.242-1.008 2.25-2.25 2.25s-2.25-1.008-2.25-2.25 1.008-2.25 2.25-2.25 2.25 1.008 2.25 2.25z" />
                </svg>
            );
        default:
            return null;
    }
};

export default function SocialRatingWidget({
    platform,
    rating,
    reviews,
}: SocialRatingWidgetProps) {
    const configs = {
        tripadvisor: { color: '#00AF87', label: 'TripAdvisor' },
        google: { color: '#4285F4', label: 'Google Maps' },
        booking: { color: '#003580', label: 'Booking.com' },
        expedia: { color: '#FFCC00', label: 'Expedia' },
    };

    const config = configs[platform];

    return (
        <div className="flex flex-col items-center justify-center p-8 bg-white hover:bg-sandstone/50 transition-colors duration-500 border-r border-forest/5 last:border-r-0">
            <div className="flex items-center space-x-2 mb-4" style={{ color: config.color }}>
                <PlatformIcon platform={platform} />
                <span className="text-[10px] uppercase tracking-widest font-bold">
                    {config.label}
                </span>
            </div>
            <div className="text-3xl font-serif font-bold text-forest mb-2">
                {rating}
            </div>
            <div className="flex text-cactus space-x-0.5 mb-3">
                {[...Array(5)].map((_, i) => (
                    <Star key={i} />
                ))}
            </div>
            <div className="text-[9px] uppercase tracking-tighter text-gray-400 font-bold">
                {reviews} Verified Reviews
            </div>
        </div>
    );
}
